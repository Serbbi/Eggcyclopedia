export function compressImage(file) {
    return new Promise((resolve, reject) => {
        const blobURL = URL.createObjectURL(file);
        const img = new Image();
        img.src = blobURL;

        img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.toBlob(
                (blob) => {
                    const compressed = new File([blob], file.name, { type: 'image/jpeg' });
                    resolve(compressed);
                },
                'image/jpeg',
                0.7
            );
        };

        img.onerror = function (error) {
            reject(error);
        };
    });
}
let ascending = true;

export function sortEggsByParam(param, currentEggs) {
    param = param.toLowerCase();
    const sortedEggs = currentEggs.sort((a, b) => {
        if(param === "egg name") {
            if (ascending) {
                return a.name.localeCompare(b.name);
            }
            return b.name.localeCompare(a.name);
        }
        if(param === "desire") {
            if (ascending) {
                return a.desire.length - b.desire.length;
            }
            return b.desire.length - a.desire.length;
        }
        if(param === "discovered date") {
            if (ascending) {
                return new Date(a.date) - new Date(b.date);
            }
            return new Date(b.date) - new Date(a.date);
        }
    });
    ascending = !ascending;
    return sortedEggs;
}
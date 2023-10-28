const modal = document.querySelector('.modal');
const editCategoryForm = document.querySelector('.edit_category_form');
const editCategoryFormInput = document.querySelector('.edit_category_form input');
const addEggForm = document.querySelector('.add_egg_form');
const addEggFormInputs = document.querySelectorAll('.add_egg_form input');
const table = document.querySelector('.table');

function showFormEditCategory() {
    editCategoryForm.style.display = 'inline-block';
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function editCategory(categoryName) {
    fetch(`/${currentCategory.name}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: categoryName})
    })
        .then(response => response.json())
        .then(data => {
            console.log('Category edited:', data);
            //move to new category page
            window.location.href = `/${categoryName}`;
        })
        .catch(err => console.log(err));
}

function deleteCategory() {
    fetch(`/${currentCategory.name}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log('Category deleted:', data);
            //move to main page
            window.location.href = '/';
        })
        .catch(err => console.log(err));
}

async function createEggDetailsObject() {
    const eggDetails = {};
    for (const input of addEggFormInputs) {
        if(input.name === 'image') {
            eggDetails[input.name] = await toBase64(input.files[0]);
            continue;
        }
        eggDetails[input.name] = input.value;
    }
    eggDetails["date"] = new Date();
    eggDetails["categoryId"] = currentCategory._id;
    console.log(eggDetails);
    return eggDetails;
}

function showFormAddEgg() {
    modal.style.display = "block";
}

function updateTable(eggs) {
    table.innerHTML = '';

    eggs.forEach(egg => {
        if(egg.categoryId !== currentCategory._id) return;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${egg.name}</td>
            <td><img src="${egg.image}" alt="No Image"></td>
            <td>${egg.desire}</td>
            <td>${new Date(egg.date).toLocaleDateString()}</td>
        `;
        table.appendChild(row);
    });
}

function addEgg(eggDetails) {
    fetch(`/${currentCategory.name}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eggDetails)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Egg added:', data);
            currentEggs.push(data);
            updateTable(currentEggs);
        })
        .catch(err => console.log(err));
}

addEggForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    addEgg(await createEggDetailsObject());
    modal.style.display = "none";
});

editCategoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    editCategory(editCategoryFormInput.value);
});

table.addEventListener("click", (e) => {
    if (e.target.tagName === "TD") {
        const eggName = e.target.parentElement.children[0].innerText;
        window.location.href = `/${currentCategory.name}/${eggName}`;
    }
});

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
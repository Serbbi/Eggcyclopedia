import { validateCategoryForm } from "./utils/categoryFormValidator.js";
import { compressImage } from "./utils/imageCompresser.js";
import { validateEggForm } from "./utils/eggFormValidator.js";
import { sortEggsByParam } from "./utils/sortEggs.js";
import { toBase64 } from "./utils/imageToBase64.js";

const modal = document.querySelector('.modal');
const editCategoryForm = document.querySelector('.edit_category_form');
const editCategoryButton = document.querySelector('.edit_category_button');
const editCategoryFormInput = document.querySelector('.edit_category_form input');
const addEggForm = document.querySelector('.add_egg_form');
const addEggFormInputs = document.querySelectorAll('.add_egg_form input');
const addEggButton = document.querySelector('.add_egg_button');
const cancelButton = document.querySelector('.cancel_button');
const deleteCategoryButton = document.querySelector('.delete_category_button');
const table = document.querySelector('.table');
const changeThemeButton = document.querySelector('.fas');

function resetAddEggForm() {
    for (const input of addEggFormInputs) {
        input.value = '';
    }
}

function showFormEditCategory() {
    editCategoryForm.style.display = 'inline-block';
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

function deleteEggs() {
    for (let i = 0; i < currentEggs.length; i++) {
        fetch(`/${currentCategory.name}/${currentEggs[i].name}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Egg deleted:', data);
            })
            .catch(err => console.log(err));
    }
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
            if(!input.files[0]) continue;
            eggDetails[input.name] = await toBase64(await compressImage(input.files[0]));
            continue;
        }
        eggDetails[input.name] = input.value;
    }
    if (!eggDetails["date"]) {
        eggDetails["date"] = new Date();
    } else {
        eggDetails["date"] = new Date(eggDetails["date"]);
    }
    eggDetails["categoryId"] = currentCategory._id;
    return eggDetails;
}

function showFormAddEgg() {
    modal.style.display = "block";
}

function updateTable(eggs) {
    table.children[1].innerHTML = '';

    eggs.forEach(egg => {
        if(egg.categoryId !== currentCategory._id) return;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="td-image"><img src="${egg.image}" alt="No Image"></td>
            <td class="td-name">${egg.name}</td>
            <td class="td-desire">${egg.desire}</td>
            <td class="td-discovered">${new Date(egg.date).toLocaleDateString()}</td>
        `;
        table.children[1].appendChild(row);
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

addEggButton.addEventListener("click", showFormAddEgg);

addEggForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const eggDetails = await createEggDetailsObject();
    if(!validateEggForm(eggDetails, currentEggs)) return;
    addEgg(eggDetails);
    modal.style.display = "none";
    resetAddEggForm();
});

editCategoryButton.addEventListener("click", showFormEditCategory);

editCategoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if(!validateCategoryForm(editCategoryFormInput.value, currentCategories)) return;
    editCategory(editCategoryFormInput.value);
});

table.addEventListener("click", (e) => {
    if (e.target.tagName === "TD") {
        const eggName = e.target.parentElement.children[1].innerText;
        window.location.href = `/${currentCategory.name}/${eggName}`;
    }
    if(e.target.tagName === "TH") {
        currentEggs = sortEggsByParam(e.target.innerText, currentEggs);
        updateTable(currentEggs);
    }
});

deleteCategoryButton.addEventListener("click", () => {
    if(confirm('Are you sure you want to delete this category? \nThis will also delete all the eggs under this category.')) {
        deleteEggs();
        deleteCategory();
    }
});

cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
    resetAddEggForm();
});

changeThemeButton.addEventListener("click", () => {
    alert('You found an easter egg :P')
});

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        resetAddEggForm();
    }
    if (!editCategoryForm.contains(event.target) && event.target !== editCategoryButton) {
        editCategoryForm.style.display = "none";
    }
}
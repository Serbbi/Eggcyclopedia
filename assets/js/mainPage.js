import { validateCategoryForm } from "./utils/categoryFormValidator.js";
import { calculateRoute } from "./utils/calculateRoute.js";

const form = document.querySelector(".form");
const formInput = document.querySelector(".form input");
const table = document.querySelector(".table");
const showFormButton = document.querySelector(".show_form_button");
const list = document.querySelector(".list");

function updateTable(categories) {
    table.innerHTML = '';

    for (let i = 0; i < categories.length; i += 2) {
        const category1 = categories[i];
        const category2 = categories[i + 1];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${category1.name} | ${category1.eggs.length} eggs</td>
            ${category2 ? `<td>${category2.name} | ${category2.eggs.length} eggs</td>` : `<td></td>`}
        `;

        table.appendChild(row);
    }
}

function resetForm() {
    form.style.display = "none";
    formInput.value = "";
}

function createCategory(categoryName) {
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: categoryName, eggs: [] })
    })
        .then(response => response.json())
        .then(data => {
            if(data === 'category already exists') {
                return;
            }
            console.log('Category created:', data);
            currentCategories.push(data);
            updateTable(currentCategories);
            resetForm();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function showForm() {
    form.style.display = "inline-block";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateCategoryForm(formInput.value, currentCategories)) return;
    createCategory(formInput.value);
});

table.addEventListener("click", (e) => {
    if (e.target.tagName === "TD") {
        const category = e.target.innerText.split(" | ")[0];
        window.location.href = `/${category}`;
    }
});

document.addEventListener("click", (e) => {
    if (!form.contains(e.target) && !showFormButton.contains(e.target)) {
        resetForm();
    }
});

showFormButton.addEventListener("click", showForm);

list.addEventListener("click", (e) => {
    let eggName = '';
    if (e.target.tagName === "IMG") {
        eggName = e.target.parentElement.children[1].innerHTML;
    }
    if (e.target.tagName === "LI") {
        eggName = e.target.children[1].innerHTML;
    }
    if (eggName === '') return;
    window.location.href = calculateRoute(eggName, currentEggs, currentCategories);
})

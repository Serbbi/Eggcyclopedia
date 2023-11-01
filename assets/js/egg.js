import { validateEggForm } from "./utils/eggFormValidator.js";

const modal = document.querySelector('.modal');
const editEggForm = document.querySelector('.edit_egg_form');
const editEggFormInputs = document.querySelectorAll('.edit_egg_form input');
const editEggButton = document.querySelector('.edit_egg_button');
const deleteEggButton = document.querySelector('.delete_egg_button');

function showFormEditEgg() {
    modal.style.display = 'block';
}

function createEggDetailsObject() {
    const eggDetails = {};
    editEggFormInputs.forEach(input => {
        eggDetails[input.name] = input.value;
    });
    return eggDetails;
}

function editEgg(eggDetails) {
    fetch(window.location.href, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eggDetails)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Egg edited:', data);
            //move to new egg page
            window.location.href = `/${window.location.pathname.split('/')[1]}/${data.name}`;

        })
        .catch(err => console.log(err));
}

function deleteEgg() {
    fetch(window.location.href, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log('Egg deleted:', data);
            //move to main page
            window.location.href = `/${window.location.pathname.split('/')[1]}`;

        })
        .catch(err => console.log(err));
}

editEggButton.addEventListener('click', showFormEditEgg);

deleteEggButton.addEventListener('click', deleteEgg);

editEggForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const eggDetails = createEggDetailsObject();
    if(!validateEggForm(eggDetails, currentEggs)) return;
    editEgg(eggDetails);
});

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
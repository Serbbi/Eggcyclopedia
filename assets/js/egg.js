import { validateEggForm } from "./utils/eggFormValidator.js";
import { toBase64 } from "./utils/imageToBase64.js";
import { compressImage } from "./utils/imageCompresser.js";

const modal = document.querySelector('.modal');
const editEggForm = document.querySelector('.edit_egg_form');
const editEggFormInputs = document.querySelectorAll('.edit_egg_form input');
const editEggButton = document.querySelector('.edit_egg_button');
const deleteEggButton = document.querySelector('.delete_egg_button');
const cancelButton = document.querySelector('.cancel_button');
const changeThemeButton = document.querySelector('.fas');

function showFormEditEgg() {
    modal.style.display = 'block';
}

async function createEggDetailsObject() {
    const eggDetails = {};
    for (const input of editEggFormInputs) {
        if(input.name === 'image') {
            if(!input.files[0]) continue;
            eggDetails[input.name] = await toBase64(await compressImage(input.files[0]));
            continue;
        }
        eggDetails[input.name] = input.value;
    }
    if(!eggDetails.image) delete eggDetails.image;
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

deleteEggButton.addEventListener('click', () => {
    if(!confirm('Are you sure you want to delete this egg?')) return;
    deleteEgg();
});

cancelButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

editEggForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const eggDetails = await createEggDetailsObject();
    if (!validateEggForm(eggDetails, currentEggs, currentEgg.name)) return;
    editEgg(eggDetails);
});

changeThemeButton.addEventListener('click', () => {
    alert('You like clicking on eggs I see ;)');
});

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
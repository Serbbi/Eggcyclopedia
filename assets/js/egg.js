const modal = document.querySelector('.modal');
const editEggForm = document.querySelector('.edit_egg_form');
const editEggFormInputs = document.querySelectorAll('.edit_egg_form input');

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

function editEgg() {
    fetch(window.location.href, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createEggDetailsObject())
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

editEggForm.addEventListener('submit', (e) => {
    e.preventDefault();
    editEgg();
});

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
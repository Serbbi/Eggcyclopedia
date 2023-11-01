export function validateEggForm(eggDetails, currentEggs) {
    if (eggDetails.name === "") {
        alert("Egg name cannot be empty");
        return false;
    }
    if (currentEggs.some(egg => egg.name === eggDetails.name)) {
        alert("Egg already exists");
        return false;
    }


    return true;

}
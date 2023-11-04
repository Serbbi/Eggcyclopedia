export function validateEggForm(eggDetails, currentEggs, currentEggName = null) {
    if (eggDetails.name === "") {
        alert("Egg name cannot be empty");
        return false;
    }
    if (currentEggName === null || eggDetails.name !== currentEggName) {
        if (currentEggs.some(egg => egg.name === eggDetails.name)) {
            alert("Egg already exists");
            return false;
        }
    }


    return true;

}
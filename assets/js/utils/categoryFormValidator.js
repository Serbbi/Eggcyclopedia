export function validateCategoryForm(categoryName, currentCategories) {
    if (categoryName === "") {
        alert("Category name cannot be empty");
        return false;
    }
    if (currentCategories.some(category => category.name === categoryName)) {
        alert("Category already exists");
        return false;
    }

    return true;
}
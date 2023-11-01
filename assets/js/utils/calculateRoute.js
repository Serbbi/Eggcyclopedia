export function calculateRoute(eggName, eggs, categories) {
    const egg = eggs.find(egg => egg.name === eggName);
    const category = categories.find(category => category._id === egg.categoryId);
    return `/${category.name}/${eggName}`;
}
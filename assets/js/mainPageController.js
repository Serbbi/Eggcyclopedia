function get3NewestEggs(eggs) {
    eggs.sort((a, b) => {
        return new Date(b.published) - new Date(a.published);
    });
    if(eggs.length < 3) return eggs;

    return eggs.slice(0, 3);
}

module.exports = { get3NewestEggs };

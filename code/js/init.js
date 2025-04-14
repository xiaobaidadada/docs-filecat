

document.addEventListener('DOMContentLoaded', async () => {
    const menu = document.getElementById('menu-change-button');
    menu.addEventListener('click', function () {
        const menu = document.getElementById('menu');
        if(menu.classList.contains('menu-mobile-hidden')) {
            menu.classList.remove('menu-mobile-hidden');
        } else {
            menu.classList.add('menu-mobile-hidden');
        }
    });
});

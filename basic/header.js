const header = document.querySelector('.header');

if (header) {
    const cookies = document.querySelector('.wr-cookie-cookie-bar');
    const cookieBtn = document.querySelector('.wr-cookie-close-cb');
    const cookieBtn2 = document.querySelector('.wr-agree-close-cb');
    const dropDownMenuBtn = document.querySelector('.header__link--dropdown');
    const dropDownMenu = document.querySelector('.header__dropdown-menu');
    const arrow = document.querySelector('#cat-arrow');
    const menu = document.querySelector('#desktop-cat-menu');

    const burgerBtn = document.querySelector('.header__burger');
    const overlayMenu = document.getElementById('mobileMenuOverlay');
    const closeBtn = document.getElementById('mobileMenuClose');

    if (cookieBtn && cookieBtn2) {
        cookieBtn.addEventListener('click', (e) => {cookies.classList.add('close')})
        cookieBtn2.addEventListener('click', (e) => {cookies.classList.add('close')})
    }

    if (dropDownMenuBtn && dropDownMenu) {
        dropDownMenu.addEventListener('mouseenter', (e) => {
            e.stopPropagation();
            dropDownMenu.classList.add('open');
            if (arrow) arrow.classList.add('arrow-rotate');
        });

        dropDownMenu.addEventListener('mouseleave', (e) => {
            e.stopPropagation();
            dropDownMenu.classList.remove('open');
            if (arrow) arrow.classList.remove('arrow-rotate');
        });

        dropDownMenuBtn.addEventListener('mouseenter', (e) => {
            e.stopPropagation();
            dropDownMenu.classList.add('open');
            if (arrow) arrow.classList.add('arrow-rotate');
        });

        dropDownMenuBtn.addEventListener('mouseleave', (e) => {
            e.stopPropagation();
            dropDownMenu.classList.remove('open');
            if (arrow) arrow.classList.remove('arrow-rotate');
        });

        dropDownMenuBtn.addEventListener('click', e => {
            e.stopPropagation();
            if (e.target.closest('.header__dropdown-menu')) {
                return;
            }
        });
    }

    if (burgerBtn && overlayMenu && closeBtn) {
        burgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            overlayMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', () => {
            overlayMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });

    const mobileCatalogToggle = document.getElementById('mobileCatalogToggle');
    const mobileCatalogSubmenu = document.getElementById('mobileCatalogSubmenu');

    if (mobileCatalogToggle && mobileCatalogSubmenu) {
        mobileCatalogToggle.addEventListener('click', () => {
            const isOpen = mobileCatalogSubmenu.classList.contains('open');
            if (isOpen) {
                mobileCatalogSubmenu.classList.remove('open');
                mobileCatalogToggle.classList.remove('active');
            } else {
                mobileCatalogSubmenu.classList.add('open');
                mobileCatalogToggle.classList.add('active');
            }
        });
    }
}

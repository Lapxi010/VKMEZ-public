const header = document.querySelector('.header');

if (header) {
    const dropDownMenuBtn = document.querySelector('.header__link--dropdown');
    const dropDownMenu = document.querySelector('.header__dropdown-menu');
    const arrow = document.querySelector('#cat-arrow');
    const menu = document.querySelector('#desktop-cat-menu');
    const menuMobile = document.querySelector('#mobile-cat-menu');
    const menuMobileBtn = document.querySelector('.header__mobile-catalog');
    const arrowMobile = document.querySelector('.cat-arrow--mobile');

    const burgerBtn = document.querySelector('.header__burger');
    const overlayMenu = document.getElementById('mobileMenuOverlay');
    const closeBtn = document.getElementById('mobileMenuClose');

    if (dropDownMenuBtn && dropDownMenu) {
        dropDownMenuBtn.addEventListener('mouseenter', (e) => {
            e.stopPropagation();
            dropDownMenu.classList.add('open');
        });

        dropDownMenuBtn.addEventListener('mouseleave', (e) => {
            e.stopPropagation();
            dropDownMenu.classList.remove('open');
        });

        dropDownMenuBtn.addEventListener('click', e => {
            e.stopPropagation();
            if (!dropDownMenu.classList.contains('open')) {
                dropDownMenu.classList.add('open');
                if (arrow) arrow.classList.add('arrow-rotate');
            } else {
                dropDownMenu.classList.remove('open');
                if (arrow) arrow.classList.remove('arrow-rotate');
            }

            document.addEventListener('click', (e) => {
                const clickInsideMenu = arrow && arrow.classList.contains('arrow-rotate');
                if (clickInsideMenu) {
                    dropDownMenu.classList.remove('open');
                    arrow.classList.remove('arrow-rotate');
                }
            });
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

    if (menuMobile) {
        menuMobile.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
        });
    }

    if (menuMobileBtn && menuMobile && arrowMobile) {
        menuMobileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!menuMobile.classList.contains('open')) {
                menuMobile.classList.add('open');
                arrowMobile.classList.add('arrow-rotate');
            } else {
                menuMobile.classList.remove('open');
                arrowMobile.classList.remove('arrow-rotate');
            }

            document.addEventListener('click', (e) => {
                const clickInsideMenu = arrowMobile.classList.contains('arrow-rotate');
                if (clickInsideMenu) {
                    menuMobile.classList.remove('open');
                    arrowMobile.classList.remove('arrow-rotate');
                }
            });
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

    const mobileSubMenuTrigger = document.querySelector('.mobile-nav-sublink--has-submenu');
    const mobileSubMenuPanel = document.getElementById('mobileSubMenuPanel');
    const mobileSubMenuBack = document.getElementById('mobileSubMenuBack');

    if (mobileSubMenuTrigger && mobileSubMenuPanel && mobileSubMenuBack) {
        mobileSubMenuTrigger.addEventListener('click', () => {
            mobileSubMenuPanel.classList.add('active');
        });

        mobileSubMenuBack.addEventListener('click', () => {
            mobileSubMenuPanel.classList.remove('active');
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                mobileSubMenuPanel.classList.remove('active');
            });
        }
    }
}

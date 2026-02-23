document.addEventListener('DOMContentLoaded', () => {

    initHeader();
    initMobileMenu();
    initGeneralModals();

    function getPageNumbers(current, total) {
        const pages = [];
        if (total <= 7) {
            for (let i = 1; i <= total; i++) pages.push(i);
            return pages;
        }
        pages.push(1);
        if (current > 3) pages.push('...');
        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);
        for (let i = start; i <= end; i++) pages.push(i);
        if (current < total - 2) pages.push('...');
        pages.push(total);
        return pages;
    }

    function renderPaginationUI(wrapper, page, totalPages) {
        const pages = getPageNumbers(page, totalPages);
        const prevDisabled = page === 1;
        const nextDisabled = page === totalPages;

        wrapper.innerHTML = `
            <button class="pg-arrow pg-arrow--prev" ${prevDisabled ? 'disabled' : ''}>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L1 7L7 1" stroke="${prevDisabled ? '#D9D9D9' : '#535353'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="pg-list">
                ${pages.map(p =>
            p === '...'
                ? '<span class="pg-dots">...</span>'
                : `<a href="#" class="pg-link ${p === page ? 'pg-link--active' : ''}" data-page="${p}">${p}</a>`
        ).join('')}
            </div>
            <button class="pg-arrow pg-arrow--next" ${nextDisabled ? 'disabled' : ''}>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 13L7 7L1 1" stroke="${nextDisabled ? '#D9D9D9' : '#535353'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        `;
    }

    function setupPagination(wrapper, grid, { totalPages, currentPage, onPageChange }) {
        if (!wrapper) return;
        let page = currentPage;

        function goToPage(newPage) {
            if (newPage < 1 || newPage > totalPages || newPage === page) return;
            page = newPage;
            onPageChange(page);
            renderPaginationUI(wrapper, page, totalPages);
            if(grid) {
                window.scrollTo({ top: grid.offsetTop - 100, behavior: 'smooth' });
            }
        }

        wrapper.addEventListener('click', (e) => {
            const link = e.target.closest('.pg-link');
            if (link) {
                e.preventDefault();
                goToPage(Number(link.dataset.page));
                return;
            }
            const prev = e.target.closest('.pg-arrow--prev');
            if (prev && !prev.disabled) {
                goToPage(page - 1);
                return;
            }
            const next = e.target.closest('.pg-arrow--next');
            if (next && !next.disabled) {
                goToPage(page + 1);
            }
        });

        renderPaginationUI(wrapper, page, totalPages);
    }


    initAboutSlider();
    initProductPage();
    initCatalogPage();
    initProjectsPage();
    initProjectDetailPage();


    function initHeader() {
        const header = document.querySelector('.header');
        const dropDownMenuBtn = document.querySelector('.header__link--dropdown');
        const dropDownMenu = document.querySelector('.header__dropdown-menu');
        const arrow = document.querySelector('#cat-arrow');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header?.classList.add('header--scrolled');
            } else {
                header?.classList.remove('header--scrolled');
            }
        });

        if (dropDownMenuBtn && dropDownMenu) {
            const toggleMenu = (open) => {
                if (open) {
                    dropDownMenu.classList.add('open');
                    arrow?.classList.add('arrow-rotate');
                } else {
                    dropDownMenu.classList.remove('open');
                    arrow?.classList.remove('arrow-rotate');
                }
            };

            dropDownMenuBtn.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
                toggleMenu(true);
            });

            dropDownMenuBtn.addEventListener('mouseleave', (e) => {
                e.stopPropagation();
                toggleMenu(false);
            });

            dropDownMenuBtn.addEventListener('click', e => {
                e.stopPropagation();
                const isOpen = dropDownMenu.classList.contains('open');
                toggleMenu(!isOpen);
                const outsideClickListener = () => {
                    toggleMenu(false);
                    document.removeEventListener('click', outsideClickListener);
                };

                if (!isOpen) {
                    document.addEventListener('click', outsideClickListener);
                }
            });
        }
    }

    function initMobileMenu() {
        const burgerBtn = document.querySelector('.header__burger');
        const overlayMenu = document.getElementById('mobileMenuOverlay');
        const closeBtn = document.getElementById('mobileMenuClose');
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

        const mobileCatalogToggle = document.getElementById('mobileCatalogToggle');
        const mobileCatalogSubmenu = document.getElementById('mobileCatalogSubmenu');
        if (mobileCatalogToggle && mobileCatalogSubmenu) {
            mobileCatalogToggle.addEventListener('click', () => {
                mobileCatalogSubmenu.classList.toggle('open');
                mobileCatalogToggle.classList.toggle('active');
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
            closeBtn?.addEventListener('click', () => {
                mobileSubMenuPanel.classList.remove('active');
            });
        }
    }

    function initGeneralModals() {
        document.querySelectorAll('[data-open-modal]').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.dataset.openModal;
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('modal--open');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        document.querySelectorAll('.pd-form-modal').forEach(modal => {
            const overlay = modal.querySelector('.pd-form-modal__overlay');
            const closeBtn = modal.querySelector('.pd-form-modal__close');

            function closeModal() {
                modal.classList.remove('modal--open');
                document.body.style.overflow = '';
            }

            if (overlay) overlay.addEventListener('click', closeModal);
            if (closeBtn) closeBtn.addEventListener('click', closeModal);

            const form = modal.querySelector('.pd-form-modal__form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    closeModal();
                });
            }
        });
    }

    function initPhotoLightbox() {
        const lb = document.getElementById('photoLightbox');
        if (!lb) return null;
        const lbImg = document.getElementById('photoLightboxImg');
        const lbClose = document.getElementById('photoLightboxClose');
        const lbOverlay = document.getElementById('photoLightboxOverlay');
        const close = () => { lb.classList.remove('modal--open'); document.body.style.overflow = ''; };
        if (lbClose) lbClose.addEventListener('click', close);
        if (lbOverlay) lbOverlay.addEventListener('click', close);
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
        return (src) => { lbImg.src = src; lb.classList.add('modal--open'); document.body.style.overflow = 'hidden'; };
    }

    function initAboutSlider() {
        const mainImg = document.getElementById('mainImage');
        if (!mainImg) return;

        let images = [
            '/imgs/main-about.jpg',
            '/imgs/about-1.jpg',
            '/imgs/about-2.jpg',
            '/imgs/about-3.jpg'
        ];

        const thumbImgs = document.querySelectorAll('.about__thumb');
        const thumbWrappers = document.querySelectorAll('.about__thumb-wrapper');
        const btnPrev = document.getElementById('btnPrev');
        const btnNext = document.getElementById('btnNext');

        function render() {
            mainImg.style.opacity = '0.5';
            setTimeout(() => {
                mainImg.src = images[0];
                mainImg.style.opacity = '1';
            }, 150);

            thumbImgs.forEach((img, index) => {
                if (images[index + 1]) {
                    img.src = images[index + 1];
                }
            });
        }

        if (btnNext) btnNext.addEventListener('click', () => {
            images.push(images.shift());
            render();
        });

        if (btnPrev) btnPrev.addEventListener('click', () => {
            images.unshift(images.pop());
            render();
        });

        thumbWrappers.forEach((wrapper, index) => {
            wrapper.addEventListener('click', () => {
                const arrIndex = index + 1;
                [images[0], images[arrIndex]] = [images[arrIndex], images[0]];
                render();
            });
        });

        const mainWrapper = document.querySelector('.about__main-wrapper');
        let touchStartX = 0;
        if (mainWrapper) {
            mainWrapper.addEventListener('touchstart', (e) => touchStartX = e.changedTouches[0].screenX, { passive: true });
            mainWrapper.addEventListener('touchend', (e) => {
                const diff = touchStartX - e.changedTouches[0].screenX;
                if (Math.abs(diff) > 40) {
                    diff > 0 ? images.push(images.shift()) : images.unshift(images.pop());
                    render();
                }
            });
        }
        render();

        const openPhoto = initPhotoLightbox();
        if (openPhoto) {
            mainImg.addEventListener('click', () => openPhoto(mainImg.src));
        }
    }

    function initProductPage() {
        const mainImage = document.getElementById('pdMainImage');
        if (!mainImage) return;

        const sectionHeaders = document.querySelectorAll('.pd-sidebar__section-header');
        sectionHeaders.forEach(header => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                const btn = header.querySelector('.pd-sidebar__toggle');
                const targetId = btn.dataset.target;
                const body = document.getElementById(targetId);

                if(!body) return;

                btn.classList.toggle('pd-sidebar__toggle--collapsed');
                if (body.classList.contains('pd-sidebar__section-body--hidden')) {
                    body.classList.remove('pd-sidebar__section-body--hidden');
                    body.style.maxHeight = body.scrollHeight + 'px';
                } else {
                    body.style.maxHeight = body.scrollHeight + 'px';
                    requestAnimationFrame(() => {
                        body.classList.add('pd-sidebar__section-body--hidden');
                        body.style.maxHeight = '0px';
                    });
                }
            });
        });

        const images = [
            '../public/imgs/cart-cat.png',
            '../public/imgs/cart-cat.png',
            '../public/imgs/cart-cat.png',
        ];
        let currentImageIndex = 0;
        const thumbs = document.querySelectorAll('.pd-gallery__thumb');
        const dots = document.querySelectorAll('.pd-gallery__dots .carousel-dots__item');

        function setActiveImage(index) {
            currentImageIndex = index;
            mainImage.src = images[index];
            thumbs.forEach(t => t.classList.remove('pd-gallery__thumb--active'));
            if (thumbs[index]) thumbs[index].classList.add('pd-gallery__thumb--active');
            dots.forEach(d => d.classList.remove('carousel-dots__item--active'));
            if (dots[index]) dots[index].classList.add('carousel-dots__item--active');
        }

        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => setActiveImage(parseInt(thumb.dataset.index)));
        });
        dots.forEach(dot => {
            dot.addEventListener('click', () => setActiveImage(parseInt(dot.dataset.index)));
        });

        const prevBtn = document.getElementById('galleryPrev');
        const nextBtn = document.getElementById('galleryNext');
        if (prevBtn) prevBtn.addEventListener('click', () => setActiveImage((currentImageIndex - 1 + images.length) % images.length));
        if (nextBtn) nextBtn.addEventListener('click', () => setActiveImage((currentImageIndex + 1) % images.length));

        const galleryMain = document.querySelector('.pd-gallery__main');
        let pdTouchStartX = 0;
        if(galleryMain) {
            galleryMain.addEventListener('touchstart', (e) => pdTouchStartX = e.changedTouches[0].screenX, { passive: true });
            galleryMain.addEventListener('touchend', (e) => {
                const diff = pdTouchStartX - e.changedTouches[0].screenX;
                if (Math.abs(diff) > 40) {
                    diff > 0 ? setActiveImage((currentImageIndex + 1) % images.length) : setActiveImage((currentImageIndex - 1 + images.length) % images.length);
                }
            });
        }

        const mobileTabBtns = document.querySelectorAll('.pd-mobile-tabs__btn');
        const mobileTabContents = document.querySelectorAll('.pd-mobile-tabs__content');
        mobileTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                mobileTabBtns.forEach(b => b.classList.remove('pd-mobile-tabs__btn--active'));
                mobileTabContents.forEach(c => c.classList.remove('pd-mobile-tabs__content--active'));
                btn.classList.add('pd-mobile-tabs__btn--active');
                const tabId = btn.dataset.mtab;
                document.getElementById(tabId)?.classList.add('pd-mobile-tabs__content--active');
            });
        });

        const specsModal = document.getElementById('specsModal');
        const openSpecsBtn = document.getElementById('openSpecsModal');
        const closeSpecsBtn = document.getElementById('closeSpecsModal');
        const specsOverlay = document.getElementById('specsModalOverlay');

        if(specsModal) {
            const closeSpecs = () => {
                specsModal.classList.remove('pd-specs-modal--open');
                document.body.style.overflow = '';
            };
            if (openSpecsBtn) {
                openSpecsBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    specsModal.classList.add('pd-specs-modal--open');
                    document.body.style.overflow = 'hidden';
                });
            }
            if (closeSpecsBtn) closeSpecsBtn.addEventListener('click', closeSpecs);
            if (specsOverlay) specsOverlay.addEventListener('click', closeSpecs);
        }

        const lightbox = document.getElementById('gabaritsLightbox');
        if (lightbox) {
            const lightboxImg = document.getElementById('gabaritsLightboxImg');
            const lightboxClose = document.getElementById('gabaritsLightboxClose');
            const lightboxOverlay = document.getElementById('gabaritsLightboxOverlay');

            document.querySelectorAll('.pd-sidebar__gabarits-img').forEach(img => {
                img.addEventListener('click', () => {
                    lightboxImg.src = img.src;
                    lightbox.classList.add('modal--open');
                    document.body.style.overflow = 'hidden';
                });
            });
            const closeLb = () => {
                lightbox.classList.remove('modal--open');
                document.body.style.overflow = '';
            };
            if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
            if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLb);
        }

        const openPhoto = initPhotoLightbox();
        if (openPhoto) {
            mainImage.addEventListener('click', () => openPhoto(mainImage.src));
        }
    }

    function initCatalogPage() {
        const grid = document.querySelector('.product-list__grid');
        if (!grid) return;

        const filterDropdown = document.getElementById('powerFilter');
        if (filterDropdown) {
            const filterToggle = document.getElementById('filterToggle');
            const filterLabel = filterDropdown.querySelector('.filter-dropdown__label');
            const filterClear = document.getElementById('filterClear');
            const MAX_VISIBLE = 3;

            function updateFilterLabel() {
                const checked = filterDropdown.querySelectorAll('.filter-dropdown__checkbox:checked');
                if (checked.length === 0) {
                    filterLabel.textContent = 'Мощность, кВт';
                    if (filterClear) filterClear.style.display = 'none';
                } else {
                    const vals = Array.from(checked).map(c => c.value + ' кВт');
                    filterLabel.textContent = vals.length > MAX_VISIBLE ? vals.slice(0, MAX_VISIBLE).join(', ') + '...' : vals.join(', ');
                    if (filterClear) filterClear.style.display = 'flex';
                }
            }

            if (filterToggle) {
                filterToggle.addEventListener('click', (e) => {
                    if (e.target.closest('.filter-dropdown__clear')) return;
                    filterDropdown.classList.toggle('filter-dropdown--open');
                });
                document.addEventListener('click', (e) => {
                    if (!filterDropdown.contains(e.target)) filterDropdown.classList.remove('filter-dropdown--open');
                });
                filterDropdown.querySelectorAll('.filter-dropdown__checkbox').forEach(cb => {
                    cb.addEventListener('change', updateFilterLabel);
                });
            }
            if (filterClear) {
                filterClear.addEventListener('click', (e) => {
                    e.stopPropagation();
                    filterDropdown.querySelectorAll('.filter-dropdown__checkbox:checked').forEach(cb => cb.checked = false);
                    updateFilterLabel();
                    filterDropdown.classList.remove('filter-dropdown--open');
                });
            }
        }

        const ITEMS_PER_PAGE = 5;
        const mockProducts = Array.from({ length: 47 }, (_, i) => ({
            id: i + 1,
            title: `КУНР TTR ${100 + i * 50}`,
            desc: `${120 + i * 30} кВт на базе ${i % 2 === 0 ? 'двух' : 'трех'} котлов Rossen RSA${60 + i * 10}`,
            price: `${(500 + i * 75).toLocaleString('ru-RU')} 000 ₽`,
            img: '../public/imgs/cart-cat.png',
        }));

        const totalPages = Math.ceil(mockProducts.length / ITEMS_PER_PAGE);
        const paginationWrapper = document.querySelector('.pagination-wrapper');

        function renderProducts(page) {
            const start = (page - 1) * ITEMS_PER_PAGE;
            const items = mockProducts.slice(start, start + ITEMS_PER_PAGE);

            grid.innerHTML = items.map(p => `
                <a href="/product" class="prod-card">
                    <div class="prod-card__img-wrap">
                        <img src="${p.img}" alt="${p.title}" class="prod-card__img">
                    </div>
                    <div class="prod-card__content">
                        <h3 class="prod-card__title">${p.title}</h3>
                        <div class="prod-card__desc t2">${p.desc}</div>
                        <div class="t1 prod-card__price">${p.price}</div>
                    </div>
                </a>
            `).join('');
        }

        renderProducts(1);
        if (paginationWrapper) {
            setupPagination(paginationWrapper, grid, {
                totalPages,
                currentPage: 1,
                onPageChange: renderProducts,
            });
        }
    }

    function getMockProjects() {
        const cities = ['г. Астрахань', 'г. Воронеж', 'г. Москва', 'г. Казань', 'г. Самара', 'г. Ростов-на-Дону', 'г. Краснодар', 'г. Нижний Новгород', 'г. Саратов'];
        const titles = [
            'TTR (НА БАЗЕ КОТЛОВ ROSSEN)',
            'TTRI (НА БАЗЕ КОТЛОВ IMMERGAS)',
            'TTRD (НА БАЗЕ КОТЛОВ DE DIETRICH)',
            'БЛОЧНО-МОДУЛЬНАЯ КОТЕЛЬНАЯ',
            'КУНР НА БАЗЕ КОТЛОВ ROSSEN',
            'БЛОЧНАЯ ВАКУУМНАЯ ДЕАЭРАЦИОННАЯ УСТАНОВКА',
        ];
        const images = ['../public/imgs/about-1.jpg', '../public/imgs/about-2.jpg', '../public/imgs/about-3.jpg'];

        return Array.from({ length: 18 }, (_, i) => ({
            id: i + 1,
            title: titles[i % titles.length],
            city: cities[i % cities.length],
            year: `${2020 + (i % 6)} г.`,
            imgs: [images[i % images.length], images[(i + 1) % images.length], images[(i + 2) % images.length]],
            img: images[i % images.length],
            desc: 'С 2008 года команда инженеров ВКЭМЗ является сервисными партнерами...',
        }));
    }

    function initProjectsPage() {
        const grid = document.querySelector('.projects-page__grid');
        if (!grid) return;

        const ITEMS_PER_PAGE = 6;
        const mockProjects = getMockProjects();
        const totalPages = Math.ceil(mockProjects.length / ITEMS_PER_PAGE);
        const paginationWrapper = document.querySelector('.pagination-wrapper');

        function renderProjects(page) {
            const start = (page - 1) * ITEMS_PER_PAGE;
            const items = mockProjects.slice(start, start + ITEMS_PER_PAGE);

            grid.innerHTML = items.map(p => `
                <a href="/projects/project.html?id=${p.id}" class="project-card">
                    <div class="project-card__img-wrapper">
                        <img src="${p.img}" alt="${p.title}" class="project-card__img">
                        <div class="project-card__tags">
                            <span class="t2 project-card__tag project-card__tag--location">${p.city}</span>
                            <span class="t2 project-card__tag project-card__tag--year">${p.year}</span>
                        </div>
                    </div>
                    <div class="project-card__content">
                        <h3 class="project-card__title">${p.title}</h3>
                        <p class="t2 project-card__desc">${p.desc.substring(0, 100)}...</p>
                    </div>
                </a>
            `).join('');
        }

        renderProjects(1);
        if (paginationWrapper) {
            setupPagination(paginationWrapper, grid, {
                totalPages,
                currentPage: 1,
                onPageChange: renderProjects,
            });
        }
    }

    function initProjectDetailPage() {
        const titleEl = document.getElementById('projectTitle');
        if (!titleEl) return;

        const mockProjects = getMockProjects();
        const params = new URLSearchParams(window.location.search);
        const projectId = Number(params.get('id'));
        const project = mockProjects.find(p => p.id === projectId);

        if (!project) {
            console.warn('Project not found');
        } else {
            document.title = `${project.title} - ВКЭМЗ`;
            const breadcrumb = document.getElementById('breadcrumbTitle');
            if(breadcrumb) breadcrumb.textContent = project.title;

            titleEl.textContent = project.title;

            const tagsEl = document.getElementById('projectTags');
            if(tagsEl) {
                tagsEl.innerHTML = `
                    <span class="project-detail__tag">${project.city}</span>
                    <span class="project-detail__tag">${project.year}</span>
                `;
            }

            const galleryEl = document.getElementById('projectGallery');
            if(galleryEl) {
                galleryEl.innerHTML = project.imgs
                    .map(src => `<img src="${src}" alt="${project.title}" class="project-detail__gallery-img">`)
                    .join('');

                const openPhoto = initPhotoLightbox();
                if (openPhoto) {
                    galleryEl.querySelectorAll('.project-detail__gallery-img').forEach(img => {
                        img.addEventListener('click', () => openPhoto(img.src));
                    });
                }
            }

            const descEl = document.getElementById('projectDesc');
            if(descEl) descEl.textContent = project.desc;
        }
    }

});
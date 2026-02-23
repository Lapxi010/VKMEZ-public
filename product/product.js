const sectionHeaders = document.querySelectorAll('.pd-sidebar__section-header');

if (sectionHeaders.length > 0) {
    sectionHeaders.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            const btn = header.querySelector('.pd-sidebar__toggle');
            const targetId = btn.dataset.target;
            const body = document.getElementById(targetId);

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

    const thumbs = document.querySelectorAll('.pd-gallery__thumb');
    const mainImage = document.getElementById('pdMainImage');
    const dots = document.querySelectorAll('.pd-gallery__dots .carousel-dots__item');

    const images = [
        '../public/imgs/cart-cat.png',
        '../public/imgs/cart-cat.png',
        '../public/imgs/cart-cat.png',
        '../public/imgs/cart-cat.png',
    ];

    let currentImageIndex = 0;

    function setActiveImage(index) {
        currentImageIndex = index;
        if (mainImage) mainImage.src = images[index];

        thumbs.forEach(t => t.classList.remove('pd-gallery__thumb--active'));
        if (thumbs[index]) thumbs[index].classList.add('pd-gallery__thumb--active');

        dots.forEach(d => d.classList.remove('carousel-dots__item--active'));
        if (dots[index]) dots[index].classList.add('carousel-dots__item--active');
    }

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            setActiveImage(parseInt(thumb.dataset.index));
        });
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            setActiveImage(parseInt(dot.dataset.index));
        });
    });

    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            setActiveImage((currentImageIndex - 1 + images.length) % images.length);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            setActiveImage((currentImageIndex + 1) % images.length);
        });
    }

    const galleryMain = document.querySelector('.pd-gallery__main');
    let pdTouchStartX = 0;

    if (galleryMain) {
        galleryMain.addEventListener('touchstart', (e) => {
            pdTouchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        galleryMain.addEventListener('touchend', (e) => {
            const diff = pdTouchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) {
                    setActiveImage((currentImageIndex + 1) % images.length);
                } else {
                    setActiveImage((currentImageIndex - 1 + images.length) % images.length);
                }
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
            document.getElementById(tabId).classList.add('pd-mobile-tabs__content--active');
        });
    });

    const specsModal = document.getElementById('specsModal');
    const openSpecsBtn = document.getElementById('openSpecsModal');
    const closeSpecsBtn = document.getElementById('closeSpecsModal');
    const specsOverlay = document.getElementById('specsModalOverlay');

    function openSpecsModal() {
        specsModal.classList.add('pd-specs-modal--open');
        document.body.style.overflow = 'hidden';
    }

    function closeSpecsModal() {
        specsModal.classList.remove('pd-specs-modal--open');
        document.body.style.overflow = '';
    }

    if (openSpecsBtn) {
        openSpecsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openSpecsModal();
        });
    }

    if (closeSpecsBtn) {
        closeSpecsBtn.addEventListener('click', closeSpecsModal);
    }

    if (specsOverlay) {
        specsOverlay.addEventListener('click', closeSpecsModal);
    }

    const lightbox = document.getElementById('gabaritsLightbox');
    const lightboxImg = document.getElementById('gabaritsLightboxImg');
    const lightboxClose = document.getElementById('gabaritsLightboxClose');
    const lightboxOverlay = document.getElementById('gabaritsLightboxOverlay');

    document.querySelectorAll('.pd-sidebar__gabarits-img').forEach(img => {
        img.addEventListener('click', () => {
            if (lightboxImg) lightboxImg.src = img.src;
            if (lightbox) {
                lightbox.classList.add('modal--open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        if (lightbox) lightbox.classList.remove('modal--open');
        document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

    const photoLightbox = document.getElementById('photoLightbox');
    const photoLightboxImg = document.getElementById('photoLightboxImg');
    const photoLightboxClose = document.getElementById('photoLightboxClose');
    const photoLightboxOverlay = document.getElementById('photoLightboxOverlay');

    function closePhotoLightbox() {
        if (photoLightbox) photoLightbox.classList.remove('modal--open');
        document.body.style.overflow = '';
    }

    if (photoLightboxClose) photoLightboxClose.addEventListener('click', closePhotoLightbox);
    if (photoLightboxOverlay) photoLightboxOverlay.addEventListener('click', closePhotoLightbox);

    if (mainImage) {
        mainImage.addEventListener('click', () => {
            if (photoLightboxImg) photoLightboxImg.src = mainImage.src;
            if (photoLightbox) {
                photoLightbox.classList.add('modal--open');
                document.body.style.overflow = 'hidden';
            }
        });
    }

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

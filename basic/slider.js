document.addEventListener('DOMContentLoaded', () => {
    const mainImg = document.getElementById('mainImage');
    if (!mainImg) return;

    let images = [
        '/imgs/main-about.webp',
        '/imgs/about-1.webp',
        '/imgs/about-2.webp',
        '/imgs/about-3.webp'
    ];

    const thumbWrappers = document.querySelectorAll('.about__thumb-wrapper');
    const thumbImgs = document.querySelectorAll('.about__thumb');
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

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            images.push(images.shift());
            render();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            images.unshift(images.pop());
            render();
        });
    }

    thumbWrappers.forEach((wrapper, index) => {
        wrapper.addEventListener('click', () => {
            const arrIndex = index + 1;
            [images[0], images[arrIndex]] = [images[arrIndex], images[0]];
            render();
        });
    });

    const mainWrapper = document.querySelector('.about__main-wrapper');
    let touchStartX = 0;
    let touchEndX = 0;

    if (mainWrapper) {
        mainWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        mainWrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) {
                    images.push(images.shift());
                } else {
                    images.unshift(images.pop());
                }
                render();
            }
        });
    }

    render();
});

document.querySelectorAll('.certificates').forEach(section => {
    const track = section.querySelector('.certificates__track');
    const prevBtn = section.querySelector('.certificates__arrow--prev');
    const nextBtn = section.querySelector('.certificates__arrow--next');

    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    function getVisibleCount() {
        const width = window.innerWidth;
        if (width <= 475) return 2;
        if (width <= 768) return 2;
        if (width <= 1000) return 3;
        return 4;
    }

    function getItemWidth() {
        const item = track.querySelector('.certificates__item');
        if (!item) return 0;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 20;
        return item.offsetWidth + gap;
    }

    function getTotalItems() {
        return track.querySelectorAll('.certificates__item').length;
    }

    function getMaxIndex() {
        const total = getTotalItems();
        const visible = getVisibleCount();
        return Math.max(0, total - visible);
    }

    function updateSlider() {
        const itemWidth = getItemWidth();
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= getMaxIndex();
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < getMaxIndex()) {
            currentIndex++;
            updateSlider();
        }
    });

    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < getMaxIndex()) {
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
            }
            updateSlider();
        }
    });

    window.addEventListener('resize', () => {
        if (currentIndex > getMaxIndex()) {
            currentIndex = getMaxIndex();
        }
        updateSlider();
    });

    updateSlider();
});

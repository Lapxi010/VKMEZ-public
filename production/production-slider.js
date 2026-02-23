document.addEventListener('DOMContentLoaded', function() {
    var track = document.getElementById('productionSliderTrack');
    var prevBtn = document.getElementById('prodSliderPrev');
    var nextBtn = document.getElementById('prodSliderNext');
    if (!track || !prevBtn || !nextBtn) return;

    var scrollAmount = 400;

    function isAtStart() {
        return track.scrollLeft <= 0;
    }

    function isAtEnd() {
        return track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    }

    prevBtn.addEventListener('click', function() {
        if (isAtStart()) {
            track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    });

    nextBtn.addEventListener('click', function() {
        if (isAtEnd()) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });

    prevBtn.disabled = false;
    nextBtn.disabled = false;

    var lightbox = document.getElementById('photoLightbox');
    if (lightbox) {
        var lbImg = document.getElementById('photoLightboxImg');
        var lbClose = document.getElementById('photoLightboxClose');
        var lbOverlay = document.getElementById('photoLightboxOverlay');
        var closeLb = function() { lightbox.classList.remove('modal--open'); document.body.style.overflow = ''; };
        if (lbClose) lbClose.addEventListener('click', closeLb);
        if (lbOverlay) lbOverlay.addEventListener('click', closeLb);
        document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeLb(); });

        document.querySelectorAll('.production-slider__img').forEach(function(img) {
            img.addEventListener('click', function() {
                lbImg.src = img.src;
                lightbox.classList.add('modal--open');
                document.body.style.overflow = 'hidden';
            });
        });
    }
});

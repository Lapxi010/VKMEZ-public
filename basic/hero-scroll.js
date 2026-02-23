document.addEventListener('DOMContentLoaded', function() {
    var heroBtn = document.getElementById('heroScrollBtn');
    if (heroBtn) {
        heroBtn.addEventListener('click', function() {
            var form = document.getElementById('feedback-form');
            if (form) {
                form.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

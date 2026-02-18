export function getPageNumbers(current, total) {
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

export function renderPagination(wrapper, page, totalPages) {
    const pages = getPageNumbers(page, totalPages);

    const prevDisabled = page === 1;
    const nextDisabled = page === totalPages;

    wrapper.innerHTML = `
        <button class="pg-arrow pg-arrow--prev" ${prevDisabled ? 'disabled' : ''}>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http:
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
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http:
                <path d="M1 13L7 7L1 1" stroke="${nextDisabled ? '#D9D9D9' : '#535353'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;
}

export function setupPagination(wrapper, grid, { totalPages, currentPage, onPageChange }) {
    let page = currentPage;

    function goToPage(newPage) {
        if (newPage < 1 || newPage > totalPages || newPage === page) return;
        page = newPage;
        onPageChange(page);
        renderPagination(wrapper, page, totalPages);
        window.scrollTo({ top: grid.offsetTop - 100, behavior: 'smooth' });
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

    renderPagination(wrapper, page, totalPages);
}

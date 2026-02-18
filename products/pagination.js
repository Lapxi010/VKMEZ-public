import { setupPagination } from '../src/shared/pagination.js';

const grid = document.querySelector('.product-list__grid');
const paginationWrapper = grid ? document.querySelector('.pagination-wrapper') : null;

if (grid && paginationWrapper) {

    const filterDropdown = document.getElementById('powerFilter');
    const filterToggle = document.getElementById('filterToggle');
    const filterLabel = filterDropdown ? filterDropdown.querySelector('.filter-dropdown__label') : null;
    const filterClear = document.getElementById('filterClear');
    const MAX_VISIBLE_FILTERS = 3;

    function updateFilterLabel() {
        const checked = filterDropdown.querySelectorAll('.filter-dropdown__checkbox:checked');
        if (checked.length === 0) {
            filterLabel.textContent = 'Мощность, кВт';
            if (filterClear) filterClear.style.display = 'none';
        } else {
            const vals = Array.from(checked).map(c => c.value + ' кВт');
            if (vals.length > MAX_VISIBLE_FILTERS) {
                filterLabel.textContent = vals.slice(0, MAX_VISIBLE_FILTERS).join(', ') + '...';
            } else {
                filterLabel.textContent = vals.join(', ');
            }
            if (filterClear) filterClear.style.display = 'flex';
        }
    }

    if (filterToggle) {
        filterToggle.addEventListener('click', (e) => {
            if (e.target.closest('.filter-dropdown__clear')) return;
            filterDropdown.classList.toggle('filter-dropdown--open');
        });

        document.addEventListener('click', (e) => {
            if (!filterDropdown.contains(e.target)) {
                filterDropdown.classList.remove('filter-dropdown--open');
            }
        });

        filterDropdown.querySelectorAll('.filter-dropdown__checkbox').forEach(cb => {
            cb.addEventListener('change', updateFilterLabel);
        });
    }

    if (filterClear) {
        filterClear.addEventListener('click', (e) => {
            e.stopPropagation();
            filterDropdown.querySelectorAll('.filter-dropdown__checkbox:checked').forEach(cb => {
                cb.checked = false;
            });
            updateFilterLabel();
            filterDropdown.classList.remove('filter-dropdown--open');
        });
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

    function renderProducts(page) {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const items = mockProducts.slice(start, start + ITEMS_PER_PAGE);

        grid.innerHTML = items.map(p => `
            <a href="/product/" class="prod-card">
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

    setupPagination(paginationWrapper, grid, {
        totalPages,
        currentPage: 1,
        onPageChange: renderProducts,
    });
}

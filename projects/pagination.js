import { setupPagination } from '../src/shared/pagination.js';

const grid = document.querySelector('.projects-page__grid');
const paginationWrapper = grid ? document.querySelector('.pagination-wrapper') : null;

if (grid && paginationWrapper) {
    const ITEMS_PER_PAGE = 6;

    const cities = ['г. Астрахань', 'г. Воронеж', 'г. Москва', 'г. Казань', 'г. Самара', 'г. Ростов-на-Дону', 'г. Краснодар', 'г. Нижний Новгород', 'г. Саратов'];
    const titles = [
        'TTR (НА БАЗЕ КОТЛОВ ROSSEN)',
        'TTRI (НА БАЗЕ КОТЛОВ IMMERGAS)',
        'TTRD (НА БАЗЕ КОТЛОВ DE DIETRICH)',
        'БЛОЧНО-МОДУЛЬНАЯ КОТЕЛЬНАЯ',
        'КУНР НА БАЗЕ КОТЛОВ ROSSEN',
        'БЛОЧНАЯ ВАКУУМНАЯ ДЕАЭРАЦИОННАЯ УСТАНОВКА',
    ];
    const images = ['../public/imgs/about-1.webp', '../public/imgs/about-2.webp', '../public/imgs/about-3.webp'];

    const mockProjects = Array.from({ length: 18 }, (_, i) => ({
        id: i + 1,
        title: titles[i % titles.length],
        city: cities[i % cities.length],
        year: `${2020 + (i % 6)} г.`,
        img: images[i % images.length],
        desc: 'С 2008 года команда инженеров ВКЭМЗ является сервисными партнерами более 20 ведущих мировых брендов производителей котельного оборудования, проектирует и создает новые решения на рынке теплоснабжения, простые в монтаже и обслуживании.',
    }));

    const totalPages = Math.ceil(mockProjects.length / ITEMS_PER_PAGE);

    function renderProjects(page) {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const items = mockProjects.slice(start, start + ITEMS_PER_PAGE);

        grid.innerHTML = items.map(p => `
            <a href="/project/index.html" class="project-card">
                <div class="project-card__img-wrapper">
                    <img src="${p.img}" alt="${p.title}" class="project-card__img">
                    <div class="project-card__tags">
                        <span class="t2 project-card__tag project-card__tag--location">${p.city}</span>
                        <span class="t2 project-card__tag project-card__tag--year">${p.year}</span>
                    </div>
                </div>
                <div class="project-card__content">
                    <h3 class="project-card__title">${p.title}</h3>
                    <p class="t2 project-card__desc">${p.desc}</p>
                </div>
            </a>
        `).join('');
    }

    renderProjects(1);

    setupPagination(paginationWrapper, grid, {
        totalPages,
        currentPage: 1,
        onPageChange: renderProjects,
    });
}

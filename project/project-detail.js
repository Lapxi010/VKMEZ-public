const breadcrumbTitle = document.getElementById('breadcrumbTitle');

if (breadcrumbTitle) {
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
        imgs: [images[i % images.length], images[(i + 1) % images.length], images[(i + 2) % images.length]],
        desc: 'С 2008 года команда инженеров ВКЭМЗ является сервисными партнерами более 20 ведущих мировых брендов производителей котельного оборудования, проектирует и создает новые решения на рынке теплоснабжения, простые в монтаже и обслуживании. Наши специалисты осуществляют полный цикл работ: от проектирования и производства до монтажа и сервисного обслуживания котельного оборудования. Каждый проект реализуется с учётом индивидуальных требований заказчика и в строгом соответствии с действующими нормативами.',
    }));

    const params = 1;
    const projectId = 1;
    const project = mockProjects.find(p => p.id === projectId);

    if (!project) {
        window.location.href = '/projects/';
    } else {
        document.title = `${project.title} - ВКЭМЗ`;
        breadcrumbTitle.textContent = project.title;
        document.getElementById('projectTitle').textContent = project.title;

        document.getElementById('projectTags').innerHTML = `
            <span class="project-detail__tag">${project.city}</span>
            <span class="project-detail__tag">${project.year}</span>
        `;

        document.getElementById('projectGallery').innerHTML = project.imgs
            .map(src => `<img src="${src}" alt="${project.title}" class="project-detail__gallery-img">`)
            .join('');

        document.getElementById('projectDesc').textContent = project.desc;
    }
}

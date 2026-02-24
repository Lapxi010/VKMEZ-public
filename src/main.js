import './main.css';

document.querySelectorAll('.footer__copyright').forEach(el => {
    el.textContent = `© ВКЭМЗ, ${new Date().getFullYear()}`;
});

import '../basic/header.js';
import '../basic/hero-scroll.js';
import '../basic/slider.js';

import '../products/pagination.js';

import '../projects/pagination.js';

import '../product/product.js';

import '../project/project-detail.js';

import '../basic/certificates';

import './form-validation.js';
import './dropzone.js';

import '../production/production-slider.js';

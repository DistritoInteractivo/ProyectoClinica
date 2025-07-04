// assets/js/main.js

// Importa las funciones de inicialización de tus componentes
import { initializeActiveNavLink, initializeHeader } from './components/header.js';
// Si tienes otros componentes (como botones generales), impórtalos aquí:
// import { initializeButtons } from './components/Button/Button.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado y parseado. Inicializando aplicación...');

    // Inicializa el componente del header (menú hamburguesa y dropdowns)
    initializeHeader();

    // Inicializa la lógica para marcar el enlace activo
    initializeActiveNavLink();

    // Si tienes otros componentes que necesitan inicialización, llámalos aquí:
    // initializeButtons();
});

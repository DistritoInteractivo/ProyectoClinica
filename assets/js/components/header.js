// assets/js/components/header.js

/**
 * Inicializa la funcionalidad del menú de hamburguesa y los dropdowns.
 */
export function initializeHeader() {
    const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
    const mainNavigation = document.getElementById('main-navigation');
    // Selecciona los enlaces (nav-link) que son parte de un elemento con dropdown
    const dropdownToggles = document.querySelectorAll('.has-dropdown > .nav-link');

    // Lógica para el botón de hamburguesa
    if (mobileMenuTrigger && mainNavigation) {
        mobileMenuTrigger.addEventListener('click', () => {
            // Alternar la clase 'is-active' en el menú principal para mostrar/ocultar
            mainNavigation.classList.toggle('is-active');

            // Actualizar el atributo aria-expanded para accesibilidad
            const isExpanded = mainNavigation.classList.contains('is-active');
            mobileMenuTrigger.setAttribute('aria-expanded', isExpanded);

            // Cambiar el icono de hamburguesa a "X" y viceversa
            const icon = mobileMenuTrigger.querySelector('i');
            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Icono de "X"
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // Icono de hamburguesa
            }

            // Cuando el menú principal se cierra, asegura que todos los submenús también se cierren y las flechas vuelvan a su posición
            if (!isExpanded) {
                document.querySelectorAll('.has-dropdown.active').forEach(openDropdown => {
                    openDropdown.classList.remove('active');
                    const dropdownIcon = openDropdown.querySelector('.fa-chevron-down');
                    if (dropdownIcon) {
                        dropdownIcon.classList.remove('rotated');
                    }
                });
            }
        });
    }

    // Lógica para dropdowns en pantallas pequeñas (clic)
    // El punto de quiebre (992px) debe coincidir con tu @media query en CSS
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            // Solo actuar en pantallas pequeñas
            if (window.innerWidth <= 992) { // Usa 992px para coincidir con tu @media (max-width: 992px)
                event.preventDefault(); // Evita que el enlace de la página se abra inmediatamente

                const parentLi = toggle.closest('.has-dropdown');
                if (parentLi) {
                    // Cierra otros dropdowns abiertos si no son el actual
                    // Esto evita que múltiples submenús estén abiertos a la vez
                    document.querySelectorAll('.has-dropdown.active').forEach(openDropdown => {
                        if (openDropdown !== parentLi) {
                            openDropdown.classList.remove('active');
                            // Asegura que la flecha de los otros dropdowns también vuelva a su posición original
                            const otherIcon = openDropdown.querySelector('.fa-chevron-down');
                            if (otherIcon) {
                                otherIcon.classList.remove('rotated');
                            }
                        }
                    });

                    // Alterna la clase 'active' para abrir/cerrar el dropdown actual
                    parentLi.classList.toggle('active');

                    // Alterna la rotación de la flecha en el enlace de dropdown
                    const icon = toggle.querySelector('.fa-chevron-down');
                    if (icon) {
                        icon.classList.toggle('rotated'); // Agrega la clase 'rotated' para el CSS
                    }
                }
            }
            // En desktop (> 992px), el CSS maneja el hover de los dropdowns, así que no se necesita JS para abrir
        });
    });

    // Opcional: Cerrar el menú móvil y dropdowns si la ventana se redimensiona a desktop
    // o si se hace clic fuera del menú.
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 992 && mainNavigation.classList.contains('is-active')) {
                mainNavigation.classList.remove('is-active');
                mobileMenuTrigger.setAttribute('aria-expanded', 'false');
                mobileMenuTrigger.querySelector('i').classList.remove('fa-times');
                mobileMenuTrigger.querySelector('i').classList.add('fa-bars');
                // Asegurar que los dropdowns estén cerrados y flechas reseteadas al pasar a desktop
                document.querySelectorAll('.has-dropdown.active').forEach(openDropdown => {
                    openDropdown.classList.remove('active');
                    const dropdownIcon = openDropdown.querySelector('.fa-chevron-down');
                    if (dropdownIcon) {
                        dropdownIcon.classList.remove('rotated');
                    }
                });
            }
        }, 200); // Pequeño retraso para evitar ejecuciones excesivas durante el redimensionamiento
    });


    console.log('Header functionality initialized.');
}

/**
 * Lógica para marcar el enlace activo dinámicamente.
 * Se mantiene aquí para modularidad, pero podría ir en un archivo 'utils/navigation.js' si crece.
 */
export function initializeActiveNavLink() {
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        // Primero, removemos la clase 'active' de todos para empezar de cero
        link.classList.remove('active');

        // Si la ruta del enlace coincide con la ruta actual, le añadimos la clase
        // Asegúrate de manejar correctamente las rutas base (ej. '/' para 'HOME')
        const linkHref = link.getAttribute('href');
        // Para HOME, asegura que solo se active si la ruta es exactamente '/'
        if (linkHref === '/' && currentPath === '/') {
            link.classList.add('active');
        } else if (linkHref !== '/' && currentPath.startsWith(linkHref)) {
            // Esto maneja casos como /blog/articulo1 si el link es /blog
            link.classList.add('active');
        }
    });

    console.log('Active navigation link functionality initialized.');
}

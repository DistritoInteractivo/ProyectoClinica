// assets/js/components/doctors-carousel.js

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".doctors-carousel");
    const prevBtn = document.querySelector(".carousel-control.prev");
    const nextBtn = document.querySelector(".carousel-control.next");

    if (!carousel || !prevBtn || !nextBtn) {
        console.warn("Carousel elements not found. Skipping carousel initialization.");
        return;
    }

    const doctorCards = Array.from(carousel.querySelectorAll(".doctor-card")); // Convertir a Array para facilidad de uso
    const cardsPerView = 2; // Número de tarjetas visibles a la vez en desktop

    // Índices para el carrusel infinito
    // totalRealCards: el número de tarjetas originales (sin duplicados)
    // totalVisibleCards: el número de tarjetas que el usuario *percibe*
    // clonedStart: número de tarjetas duplicadas al inicio
    // clonedEnd: número de tarjetas duplicadas al final

    // Asumiendo que tienes 4 tarjetas reales y duplicaste 2 al inicio y 2 al final
    // HTML: [D3, D4, R1, R2, R3, R4, D1, D2]
    const totalRealCards = 4; // Cambia esto al número real de tus tarjetas de doctor
    const clonedStart = 2; // Número de duplicados al inicio (igual a cardsPerView)
    const clonedEnd = 2;   // Número de duplicados al final (igual a cardsPerView)

    let currentIndex = clonedStart; // Empezamos en la primera tarjeta REAL (después de los duplicados iniciales)

    // Función para actualizar la posición del carrusel
    function updateCarouselPosition(smooth = true) {
        // Obtenemos el ancho de una tarjeta incluyendo su margen lateral
        // offsetWidth ya incluye padding y border. Necesitamos añadir el margin horizontal
        const cardStyle = window.getComputedStyle(doctorCards[0]);
        const cardMarginLeft = parseFloat(cardStyle.marginLeft);
        const cardMarginRight = parseFloat(cardStyle.marginRight);
        const cardTotalWidth = doctorCards[0].offsetWidth + cardMarginLeft + cardMarginRight;

        // Si cardsPerView es 2, cada paso mueve el ancho de una tarjeta
        const scrollAmount = cardTotalWidth;

        if (!smooth) {
            carousel.style.scrollBehavior = "auto"; // Deshabilita el scroll suave temporalmente
        } else {
            carousel.style.scrollBehavior = "smooth";
        }

        carousel.scrollLeft = currentIndex * scrollAmount;

        // Lógica para el "salto" infinito después de la transición
        if (smooth) {
            setTimeout(() => {
                // Si llegamos a una de las tarjetas duplicadas al final (R1, R2)
                if (currentIndex >= totalRealCards + clonedStart) {
                    currentIndex = clonedStart + (currentIndex - (totalRealCards + clonedStart));
                    carousel.style.scrollBehavior = "auto";
                    carousel.scrollLeft = currentIndex * scrollAmount;
                }
                // Si llegamos a una de las tarjetas duplicadas al inicio (R3, R4)
                else if (currentIndex < clonedStart) {
                    currentIndex = totalRealCards + currentIndex;
                    carousel.style.scrollBehavior = "auto";
                    carousel.scrollLeft = currentIndex * scrollAmount;
                }
                carousel.style.scrollBehavior = "smooth"; // Restablece el scroll suave
            }, 500); // Pequeño retraso para que la animación de scroll termine (debe coincidir con CSS transition-speed o ser un poco mayor)
        }
    }

    // Navegación
    prevBtn.addEventListener("click", () => {
        currentIndex--;
        updateCarouselPosition();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex++;
        updateCarouselPosition();
    });

    // Manejar el desplazamiento manual (con el mouse o touch)
    carousel.addEventListener("scroll", () => {
        // Determina si el usuario ha scrollado lo suficiente para activar el salto
        const cardTotalWidth = doctorCards[0].offsetWidth + parseFloat(window.getComputedStyle(doctorCards[0]).marginLeft) + parseFloat(window.getComputedStyle(doctorCards[0]).marginRight);
        const scrollIndex = Math.round(carousel.scrollLeft / cardTotalWidth);

        // Si el usuario desplaza a una de las tarjetas duplicadas, ajusta el índice
        if (scrollIndex >= totalRealCards + clonedStart) {
            currentIndex = clonedStart + (scrollIndex - (totalRealCards + clonedStart));
            updateCarouselPosition(false); // Salto sin transición
        } else if (scrollIndex < clonedStart) {
            currentIndex = totalRealCards + scrollIndex;
            updateCarouselPosition(false); // Salto sin transición
        } else {
            currentIndex = scrollIndex; // Actualiza currentIndex si es un scroll normal
        }
    });


    // Inicializar la posición al cargar la página
    // Asegurarse de que la primera vista sea la de las tarjetas reales
    updateCarouselPosition(false); // Inicializar sin transición para evitar ver el "salto" inicial

    // Actualizar la posición si la ventana cambia de tamaño (responsividad)
    window.addEventListener("resize", () => {
        // Al redimensionar, volvemos a la posición inicial real, sin suavizado
        updateCarouselPosition(false);
    });
});

// assets/js/components/testimonials.js

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".testimonial-slide");
    const navDots = document.querySelectorAll(".nav-dot");
    const sliderWrapper = document.querySelector(".testimonial-slider-wrapper");

    if (!slides || !navDots || !sliderWrapper) {
        console.warn("Testimonial slider elements not found.");
        return;
    }

    let currentIndex = 0;
    const slideInterval = 5000; // Tiempo entre cada slide (en milisegundos)
    let intervalId;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        navDots.forEach(dot => dot.classList.remove("active"));

        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add("active");
            }
        });
        navDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add("active");
            }
        });
        currentIndex = index;

        // Optionally adjust the height of the slider wrapper to the active slide
        // sliderWrapper.style.height = slidesIndex].offsetHeight + 'px';
    }

    function nextSlide() {
        let nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }

    function startSlider() {
        intervalId = setInterval(nextSlide, slideInterval);
    }

    function stopSlider() {
        clearInterval(intervalId);
    }

    // Navegación por puntos
    navDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            stopSlider(); // Detener el slider automático al interactuar
            showSlide(index);
            startSlider(); // Volver a iniciar después de la interacción
        });
    });

    // Iniciar el slider automático
    startSlider();

    // Opcional: Detener el slider al hacer hover sobre la sección (y reiniciar al quitar el hover)
    testimonialsSection = document.querySelector('.testimonials-section');
    if (testimonialsSection) {
        testimonialsSection.addEventListener('mouseenter', stopSlider);
        testimonialsSection.addEventListener('mouseleave', startSlider);
    }
});

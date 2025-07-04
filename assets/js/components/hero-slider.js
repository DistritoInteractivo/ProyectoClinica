document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.pagination-dot');
    let currentIndex = 0;
    const interval = 5000;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
      });
      currentIndex = index;
    }

    function nextSlide() {
      let newIndex = (currentIndex + 1) % slides.length;
      showSlide(newIndex);
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-slide'));
        showSlide(index);
      });
    });

    setInterval(nextSlide, interval);
  });

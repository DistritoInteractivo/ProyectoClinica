document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');

            // Cierra otras preguntas abiertas
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.add('hidden');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    otherItem.querySelector('.faq-question i').classList.replace('fa-chevron-down', 'fa-chevron-right');
                }
            });

            // Abre o cierra la pregunta actual
            if (answer.classList.contains('hidden')) {
                answer.classList.remove('hidden');
                answer.style.maxHeight = answer.scrollHeight + "px"; // Ajusta la altura dinámicamente
                icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
            } else {
                answer.classList.add('hidden');
                answer.style.maxHeight = null;
                icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
            }
        });
    });
});

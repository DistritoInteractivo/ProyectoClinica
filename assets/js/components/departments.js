document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".department-item");
    const contents = document.querySelectorAll(".department-content");

    items.forEach(item => {
      item.addEventListener("click", () => {
        const target = item.getAttribute("data-department");

        // Desactiva todos los botones
        items.forEach(i => i.classList.remove("active"));

        // Oculta todos los contenidos
        contents.forEach(c => c.classList.remove("active"));

        // Activa el botón clicado y su contenido
        item.classList.add("active");
        const targetContent = document.querySelector(`[data-department-content='${target}']`);
        if (targetContent) targetContent.classList.add("active");
      });
    });
  });

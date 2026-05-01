document.addEventListener("DOMContentLoaded", () => {
    // 1. Reloj en tiempo real
    const clockElement = document.getElementById("clock");
    
    function updateClock() {
        const now = new Date();
        const options = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: true 
        };
        clockElement.textContent = now.toLocaleTimeString('es-PE', options);
    }
    
    // Actualizar el reloj cada segundo
    setInterval(updateClock, 1000);
    updateClock(); // Llamada inicial para evitar 1 segundo de retraso

    // 2. Animaciones de revelado al hacer scroll (Scroll Reveal)
    // Seleccionamos los elementos que queremos animar (las secciones y las sedes)
    const elementsToReveal = document.querySelectorAll('.card, .sede');
    
    // Les agregamos la clase inicial 'reveal' para que estén ocultos inicialmente
    elementsToReveal.forEach((el, index) => {
        el.classList.add('reveal');
        // Pequeño delay escalonado si los elementos están juntos
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    // Configuramos el Intersection Observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento entra en la pantalla
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // IMPORTANTE PARA RENDIMIENTO: Dejamos de observar el elemento una vez que ya apareció
                // Así evitamos que se recalcule la animación al subir y bajar
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // El elemento debe ser 15% visible para activar la animación
    });

    // Observamos cada uno de los elementos
    elementsToReveal.forEach(el => {
        revealObserver.observe(el);
    });
});

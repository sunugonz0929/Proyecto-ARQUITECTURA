
        const formulario = document.getElementById("formularioContacto");
        const mensajeFormulario = document.getElementById("mensajeFormulario");

        formulario.addEventListener("submit", function(evento) {
            evento.preventDefault();

            const nombre = document.getElementById("nombre").value;

            mensajeFormulario.textContent =
                "Gracias, " + nombre +
                ". La solicitud fue registrada correctamente. Tomaremos en cuenta...";

            mensajeFormulario.classList.add("mensaje-exito");

            formulario.reset();
        });

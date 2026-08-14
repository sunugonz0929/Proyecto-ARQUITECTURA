
        const formulario = document.getElementById("formularioContacto");
        const mensajeFormulario = document.getElementById("mensajeFormulario");

        formulario.addEventListener("submit", function(evento) {
            evento.preventDefault();

            const nombre = document.getElementById("nombre").value;

            mensajeFormulario.textContent =
                "Gracias, " + nombre +
                ". Su solicitud fue registrada correctamente.";

            mensajeFormulario.classList.add("mensaje-exito");

            formulario.reset();
        });

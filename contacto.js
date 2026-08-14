const formulario = document.getElementById("formularioContacto");
const mensajeFormulario = document.getElementById("mensajeFormulario");

formulario.addEventListener("submit", async function (event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servicio = document.getElementById("servicio").value;
    const tipoProyecto = document.getElementById("tipoProyecto").value;
    const mensaje = document.getElementById("mensaje").value.trim();
    const terminos = document.getElementById("terminos").checked;

    // VALIDACIONES

    if (nombre === "") {
        alert("Por favor ingrese su nombre.");
        return;
    }

    if (correo === "") {
        alert("Por favor ingrese su correo electrónico.");
        return;
    }

    if (!correo.includes("@")) {
        alert("Ingrese un correo electrónico válido.");
        return;
    }

    if (telefono === "") {
        alert("Por favor ingrese su número de teléfono.");
        return;
    }

    if (servicio === "") {
        alert("Seleccione un servicio.");
        return;
    }

    if (tipoProyecto === "") {
        alert("Seleccione el tipo de proyecto.");
        return;
    }

    if (mensaje === "") {
        alert("Escriba la descripción de su proyecto.");
        return;
    }

    if (!terminos) {
        alert("Debe aceptar el uso de sus datos.");
        return;
    }


    // CREAR LOS DATOS

    const datos = {
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        servicio: servicio,
        tipoProyecto: tipoProyecto,
        mensaje: mensaje
    };


    // ENVIAR CON FETCH

    try {

        const respuesta = await fetch("http://localhost:3000/enviar", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(datos)

        });


        const resultado = await respuesta.json();


        if (respuesta.ok) {

            mensajeFormulario.textContent =
                "Solicitud enviada correctamente.";

            alert("Mensaje enviado al correo.");

            formulario.reset();

        } else {

            mensajeFormulario.textContent =
                "No fue posible enviar la solicitud.";

        }


    } catch (error) {

        console.error(error);

        mensajeFormulario.textContent =
            "Error al conectar con el servidor.";

    }

});
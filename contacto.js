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

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.post("/enviar", async (req, res) => {

    const {
        nombre,
        correo,
        telefono,
        servicio,
        tipoProyecto,
        mensaje
    } = req.body;


    try {

        const transportador = nodemailer.createTransport({

            service: "gmail",

            auth: {

                user: "sunugonz0929@gmail.com",

                password: process.env.GMAIL_APP_PASSWORD

            }

        });


        const contenidoCorreo = {

            from: "sunugonz0929@gmail.com",

            to: "sunugonz0929@gmail.com",

            replyTo: correo,

            subject: "Nueva solicitud - " + nombre,

            text: `
NUEVA SOLICITUD DE CONTACTO

Nombre:
${nombre}

Correo:
${correo}

Teléfono:
${telefono}

Servicio:
${servicio}

Tipo de proyecto:
${tipoProyecto}

Descripción del proyecto:
${mensaje}
            `

        };


        await transportador.sendMail(contenidoCorreo);


        res.status(200).json({

            mensaje: "Correo enviado correctamente"

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            mensaje: "Error al enviar el correo"

        });

    }

});


app.listen(3000, () => {

    console.log(
        "Servidor funcionando en http://localhost:3000"
    );

});
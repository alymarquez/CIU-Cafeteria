const inputNombre = document.getElementById("nombre");
const inputEmail = document.getElementById("email");
const inputMensaje = document.getElementById("mensaje");
const form = document.getElementById("formContacto");
const btnEnviar = document.getElementById("btnEnviar");

function mostrarCartel(mensaje, tipo = "error") {
  const cartel = document.createElement("div");
  cartel.textContent = mensaje;
  cartel.className = `cartel ${tipo}`;
  document.body.appendChild(cartel);
  setTimeout(() => {
    cartel.remove();
  }, 2000);
}

inputNombre.addEventListener("input", () => {
    const valor = inputNombre.value.trim()
    if (valor === "") {
        alert("El nombre no puede estar vacío.");
    }
});

inputEmail.addEventListener("change", () => {
    const valor = inputEmail.value;
    if (!valor.includes("@") || !valor.includes(".")) {
        alert("El email ingresado no es válido.");
    }
});

inputMensaje.addEventListener("input", () => {
    const valor = inputMensaje.value.trim()
    if (valor === "") {
        alert("Por favor escribí un mensaje.");
    }
});

form.addEventListener("submit", (e) => {
    let error = false;

    if (inputNombre.value.trim() === "") {
        error = true;
    }

    const emailVal = inputEmail.value;
    if (!emailVal.includes("@") || !emailVal.includes(".")) {
        error = true;
    }

    if (inputMensaje.value.trim() === "") {
        error = true;
    }

    if (error) {
        e.preventDefault();
        mostrarCartel("Revisá los datos ingresados.", "error");
    } else {
        e.preventDefault();
        mostrarCartel("¡Formulario enviado correctamente!", "ok");
        btnEnviar.textContent = "¡Enviado!";
    }
});

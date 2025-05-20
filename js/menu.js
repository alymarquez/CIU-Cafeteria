let productos = [];
let productosFiltrados = [];

const listaProductos = document.getElementById("productos");
const filtroInput = document.getElementById("filtro");
const btnAgregar = document.getElementById("btnAgregar");
const seccionAgregar = document.getElementById("seccionAgregar");
const nuevoNombre = document.getElementById("nuevoNombre");
const nuevoPrecio = document.getElementById("nuevoPrecio");
const btnGuardarNuevo = document.getElementById("btnGuardarNuevo");
const contadorSeleccionados = document.getElementById("contadorSeleccionados");

async function iniciarMenu() {
  try {
    const res = await fetch("data/productos.json")
    const data = await res.json()
    if (!res.ok) {
      throw new Error("No se pudo cargar el archivo JSON.")
    }
    productos = data
    productosFiltrados = productos.slice();
    mostrarProductos()
    setTimeout(mostrarRecomendaciones, 2000)
  } catch (error) {
    console.error("Error al cargar productos:", error)
  }
}

function mostrarProductos() {
  listaProductos.innerHTML = ""

  productosFiltrados.forEach((producto) => {
    const item = document.createElement("li")
    item.innerHTML = `
      <input type="checkbox" class="checkbox">
      <span class="nombre"><strong>${producto.nombre}</strong></span> - 
      <span class="precio">$${producto.precio}</span>
      <button class="btnModificar">Modificar</button>
      <button class="btnQuitar">Quitar</button>
    `;

    item.addEventListener("mouseover", () => {
      item.style.backgroundColor = "#f0f0f0"
    });
    item.addEventListener("mouseout", () => {
      item.style.backgroundColor = ""
    });

    const btnQuitar = item.querySelector(".btnQuitar")
    const btnModificar = item.querySelector(".btnModificar")

    btnQuitar.addEventListener("click", () => quitarProducto(producto.id))
    btnModificar.addEventListener("click", () => modificarProducto(producto.id))

    listaProductos.appendChild(item)
  });
  
  agregarEventos()
  actualizarContador()
}

function agregarEventos() {
  document.querySelectorAll(".checkbox").forEach(chk => {
    chk.addEventListener("change", actualizarContador)
  });
}

btnAgregar.addEventListener("click", () => {
  seccionAgregar.style.display = "block"
});

btnGuardarNuevo.addEventListener("click", () => {
  const nombre = nuevoNombre.value.trim()
  const precio = parseFloat(nuevoPrecio.value)

  if (nombre === "" || isNaN(precio) || precio <= 0) {
    alert("Por favor ingrese un nombre válido y un precio mayor a 0.")
    return
  }

  const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1
  productos.push({ id: nuevoId, nombre, precio })
  productosFiltrados = productos.slice()
  mostrarProductos()

  nuevoNombre.value = ""
  nuevoPrecio.value = ""
  seccionAgregar.style.display = "none"
});

function quitarProducto(id) {
  productos = productos.filter(p => p.id !== id)
  productosFiltrados = productos.slice();
  mostrarProductos()
}

function modificarProducto(id) {
  const producto = productos.find(p => p.id === id)
  if (!producto) return

  const nuevoPrecio = prompt("Ingrese el nuevo precio:")
  const precioNumero = parseFloat(nuevoPrecio)

  if (!isNaN(precioNumero) && precioNumero > 0) {
    producto.precio = precioNumero
    productosFiltrados = productos.slice()
    mostrarProductos()
  } else {
    alert("Precio inválido.")
  }
}

filtroInput.addEventListener("input", () => {
  const texto = filtroInput.value.toLowerCase()
  productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(texto))
  mostrarProductos()
});

function actualizarContador() {
  const seleccionados = document.querySelectorAll(".checkbox:checked").length
  contadorSeleccionados.textContent = seleccionados
}

function mostrarRecomendaciones() {
  const seccionRecomendaciones = document.getElementById("recomendaciones");

  seccionRecomendaciones.innerHTML = `
    <h2>Recomendaciones de la Casa</h2>
    <ul>
      <li> Capucchino </li>
      <li> Brownie artesanal </li>
      <li> Latte con canela </li>
    </ul>
  `
}

iniciarMenu()
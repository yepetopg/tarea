const modal = document.getElementById("modal");
const botones = document.querySelectorAll(".productoBoton");

const criaturas = {
  "Hypogrifo": {
    desc: "Criatura noble con cuerpo de león y cabeza de águila. Destaca por su fuerza, lealtad y orgullo.",
    clase: "Bestia alada",
    elemento: "Aire",
    rareza: "Épica",
    precio: 850
  },
  "Fénix Escarlata": {
    desc: "Ave legendaria que renace de sus cenizas.",
    clase: "Ave mística",
    elemento: "Fuego",
    rareza: "Legendaria",
    precio: 1200
  },
  "Dragón de Fuego": {
    desc: "Bestia ancestral con aliento ardiente.",
    clase: "Dragón elemental",
    elemento: "Fuego",
    rareza: "Legendaria",
    precio: 2500
  },
  "Basilisco": {
    desc: "Serpiente gigante cuya mirada es mortal.",
    clase: "Serpiente mágica",
    elemento: "Oscuridad",
    rareza: "Rara",
    precio: 1800
  }
};

let criaturaActual = null;

// 👉 ABRIR MODAL
botones.forEach(btn => {
  btn.addEventListener("click", e => {
    const card = e.target.closest(".productoInfo");
    const titulo = card.querySelector(".productoTitle").textContent;
    const img = card.querySelector(".productoImg").src;

    const data = criaturas[titulo];
    criaturaActual = { nombre: titulo, precio: data.precio };

    document.getElementById("modalImg").src = img;
    document.getElementById("modalTitulo").textContent = titulo;
    document.getElementById("modalDesc").textContent = data.desc;
    document.getElementById("modalClase").textContent = data.clase;
    document.getElementById("modalElemento").textContent = data.elemento;
    document.getElementById("modalRareza").textContent = data.rareza;
    document.getElementById("modalPrecio").textContent = data.precio;

    modal.classList.remove("oculto");
  });
});

// 👉 CERRAR MODAL
document.getElementById("cerrarModal").onclick = () => modal.classList.add("oculto");
document.getElementById("volverCatalogo").onclick = () => modal.classList.add("oculto");

// ================== CARRITO ==================

let carrito = JSON.parse(localStorage.getItem("carritoMagico")) || [];

const carritoPanel = document.getElementById("carritoPanel");
const carritoItems = document.getElementById("carritoItems");
const totalPrecio = document.getElementById("totalPrecio");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const iconoCarrito = document.querySelector(".carrito");

// 👉 ABRIR CARRITO
iconoCarrito.onclick = () => {
  carritoPanel.classList.remove("oculto");
  renderCarrito();
};

// 👉 CERRAR CARRITO
cerrarCarrito.onclick = () => carritoPanel.classList.add("oculto");

// 👉 AGREGAR AL CARRITO
document.getElementById("btnComprar").onclick = () => {
  if (!criaturaActual) return;

  carrito.push(criaturaActual);
  localStorage.setItem("carritoMagico", JSON.stringify(carrito));
  renderCarrito();
  alert("Criatura agregada al carrito 🐉🛒");
};

// 👉 MOSTRAR CARRITO
function renderCarrito() {
  carritoItems.innerHTML = "";
  let total = 0;

  carrito.forEach((item, i) => {
    total += item.precio;

    let div = document.createElement("div");
    div.className = "carritoItem";
    div.innerHTML = `
      <span>${item.nombre}</span>
      <span>${item.precio} 🪙</span>
      <button onclick="quitarDelCarrito(${i})">❌</button>
    `;
    carritoItems.appendChild(div);
  });

  totalPrecio.textContent = total;
}

// 👉 QUITAR
function quitarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carritoMagico", JSON.stringify(carrito));
  renderCarrito();
}

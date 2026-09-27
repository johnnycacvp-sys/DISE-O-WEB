// ===== CARRITO CON LOCALSTORAGE =====

// Obtener carrito guardado o iniciar vacío
let carrito = JSON.parse(localStorage.getItem('carritoAnimeWear')) || [];

// Actualizar contador al cargar cualquier página
document.addEventListener('DOMContentLoaded', () => {
  actualizarContador();
  if (document.getElementById('lista-carrito')) {
    renderizarCarrito();
  }
  activarBotonesAgregar();
});

// Activar botones "Agregar al carrito"
function activarBotonesAgregar() {
  const botones = document.querySelectorAll('.btn-agregar');
  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const nombre = boton.dataset.nombre;
      const precio = parseFloat(boton.dataset.precio);
      agregarAlCarrito(nombre, precio);
    });
  });
}

// Agregar producto
function agregarAlCarrito(nombre, precio) {
  const existente = carrito.find(p => p.nombre === nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  guardarCarrito();
  actualizarContador();
  alert(`✅ "${nombre}" agregado al carrito`);
}

// Guardar en localStorage
function guardarCarrito() {
  localStorage.setItem('carritoAnimeWear', JSON.stringify(carrito));
}

// Actualizar contador del header
function actualizarContador() {
  const contador = document.getElementById('contador');
  if (contador) {
    const total = carrito.reduce((sum, p) => sum + p.cantidad, 0);
    contador.textContent = total;
  }
}

// Renderizar carrito en carrito.html
function renderizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalEl = document.getElementById('total');
  lista.innerHTML = '';

  if (carrito.length === 0) {
    lista.innerHTML = '<p style="text-align:center;">Tu carrito está vacío 😢</p>';
    totalEl.textContent = 'Total: S/ 0.00';
    return;
  }

  let total = 0;
  carrito.forEach((producto, index) => {
    total += producto.precio * producto.cantidad;
    const div = document.createElement('div');
    div.classList.add('item-carrito');
    div.innerHTML = `
      <div>
        <strong>${producto.nombre}</strong><br>
        S/ ${producto.precio.toFixed(2)} x ${producto.cantidad}
      </div>
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    lista.appendChild(div);
  });

  totalEl.textContent = `Total: S/ ${total.toFixed(2)}`;
}

// Eliminar producto
function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  renderizarCarrito();
  actualizarContador();
}

// Vaciar carrito
const btnVaciar = document.getElementById('vaciar');
if (btnVaciar) {
  btnVaciar.addEventListener('click', () => {
    if (confirm('¿Seguro que deseas vaciar el carrito?')) {
      carrito = [];
      guardarCarrito();
      renderizarCarrito();
      actualizarContador();
    }
  });
}

const input      = document.getElementById('txtNumero');
const cuerpo     = document.getElementById('divTabla');
const datosPie   = document.getElementById('datosPie');
const heroF      = document.getElementById('heroFormula');
const heroT      = document.getElementById('heroTitulo');
const heroS      = document.getElementById('heroSub');
const quickBtns  = document.querySelectorAll('.qn');
const simboloGrande = document.querySelector('.s9');

// ─── Leer y validar el número del input ──────────────────────
function getNumero() {
  const valor = parseInt(input.value);
  return (!isNaN(valor) && valor >= 1) ? valor : 5;
}

// ─── Actualizar textos del hero ───────────────────────────────
function actualizarHero(n) {
  heroF.innerHTML   = `${n} &times; n = ?`;
  heroT.textContent = `Tabla del ${n}`;
  heroS.textContent = `Multiplica el ${n} por cada número del 1 al 10.`;
  document.title    = `Tabla del ${n}`;

  // Actualizar el símbolo flotante grande con el número actual
  if (simboloGrande) simboloGrande.textContent = n;
}

// ─── Marcar el botón rápido activo ───────────────────────────
function actualizarQuick(n) {
  quickBtns.forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.n) === n);
  });
}

// ─── Generar filas de la tabla ────────────────────────────────
function construirFilas(n) {
  let html = '';
  let suma = 0;

  for (let i = 1; i <= 10; i++) {
    const resultado = n * i;
    suma += resultado;

    html += `
      <tr class="fila-nueva" style="animation-delay: ${(i - 1) * 0.05}s">
        <td class="td-op">${n} &times; ${i} <span class="eq">=</span></td>
        <td class="td-res">${resultado}</td>
      </tr>`;
  }

  return { html, suma };
}

// ─── Actualizar el resumen al pie ─────────────────────────────
function actualizarDatos(n, suma) {
  const promedio = (suma / 10).toFixed(1);

  datosPie.innerHTML = `
    <div class="dato">&sum; Suma <strong>${suma}</strong></div>
    <div class="dato">&#x2300; Promedio <strong>${promedio}</strong></div>
    <div class="dato">${n} &times; 2 = <strong>${n * 2}</strong></div>
  `;
}

// ─── Función principal: generar toda la tabla ─────────────────
function generarTabla() {
  const n = getNumero();

  // Asegurar que el input refleje el número usado
  input.value = n;

  actualizarHero(n);
  actualizarQuick(n);

  const { html, suma } = construirFilas(n);
  cuerpo.innerHTML = html;

  actualizarDatos(n, suma);
}

// ─── Eventos ──────────────────────────────────────────────────

// Botones de acceso rápido
quickBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    input.value = btn.dataset.n;
    generarTabla();
  });
});

// Generar al presionar Enter dentro del input
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') generarTabla();
});

// Generar al salir del campo
input.addEventListener('blur', generarTabla);

// ─── Inicio: tabla del 5 por defecto ─────────────────────────
input.value = 5;
generarTabla();
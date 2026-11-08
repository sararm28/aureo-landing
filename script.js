


function toggleMenu() {
  // getElementById() → busca en el HTML un elemento con ese id
  // Guarda la referencia en una variable para usarla después
  let menu = document.getElementById("menu-nav");

  // toggle("clase") → agrega la clase si no la tiene, la quita si ya la tiene
  // Es como un interruptor: encendido/apagado
  menu.classList.toggle("header__nav--abierto");
}

/**
 * FUNCIÓN: cerrarMenu
 * Cierra el menú cuando el usuario hace clic en un enlace de navegación.
 * Se llama con onclick="cerrarMenu()" en cada <a> del menú.
 * 
 * Esto es necesario en móvil: después de navegar a una sección,
 * el menú debe cerrarse automáticamente.
 */
function cerrarMenu() {
  let menu = document.getElementById("menu-nav");

  // remove("clase") → quita esa clase si existe (sin efecto si no existe)
  menu.classList.remove("header__nav--abierto");
}




/**
 * FUNCIÓN: cambiarHeader
 * Modifica el estilo del header cuando el usuario hace scroll.
 * Se ejecuta automáticamente cada vez que el usuario hace scroll.
 */
function cambiarHeader() {
  // Obtiene el elemento header usando su clase CSS
  let header = document.querySelector(".header");

  // window.scrollY → cuántos píxeles ha bajado el usuario desde arriba
  // Si es mayor a 50px, agrega la clase que lo hace más compacto
  if (window.scrollY > 50) {
    header.classList.add("header--scrolled");
  } else {
    // Si está en la parte superior, quita la clase (vuelve a su tamaño normal)
    header.classList.remove("header--scrolled");
  }
}

// addEventListener() → escucha un evento y ejecuta una función cuando ocurre
// "scroll" → se dispara cada vez que el usuario hace scroll en la página
// La función cambiarHeader() se ejecuta automáticamente cada vez que hay scroll
window.addEventListener("scroll", cambiarHeader);




/**
 * FUNCIÓN: filtrarProductos
 * Filtra las tarjetas de productos según la categoría seleccionada.
 * 
 * @param {string} categoria - La categoría a mostrar (ej: "anillos", "todos")
 * 
 * Cómo funciona:
 * 1. Obtiene todas las tarjetas (.card)
 * 2. Recorre cada tarjeta con forEach
 * 3. Compara la categoría de la tarjeta con la categoría seleccionada
 * 4. Muestra u oculta la tarjeta según corresponda
 */
function filtrarProductos(categoria) {

  // querySelectorAll() → obtiene TODOS los elementos con esa clase
  // Retorna una NodeList (lista de elementos)
  let tarjetas = document.querySelectorAll(".card");
  let botones  = document.querySelectorAll(".filtros__btn");

  // ── Paso 1: actualizar el botón activo ──────────────────────
  // forEach() → recorre cada elemento de la lista y ejecuta una función
  botones.forEach(function(boton) {
    // Quita la clase activa de todos los botones primero
    boton.classList.remove("filtros__btn--activo");

    // Si el atributo data-filtro de este botón coincide con la categoría,
    // se agrega la clase activa
    // dataset → accede a los atributos data-* del elemento HTML
    if (boton.dataset.filtro === categoria) {
      boton.classList.add("filtros__btn--activo");
    }
  });

  // ── Paso 2: mostrar u ocultar las tarjetas ──────────────────
  tarjetas.forEach(function(tarjeta) {
    // dataset.categoria → lee el atributo data-categoria de la tarjeta HTML
    let categoriaTarjeta = tarjeta.dataset.categoria;

    if (categoria === "todos") {
      // Si el filtro es "todos", se muestran TODAS las tarjetas
      tarjeta.classList.remove("card--oculta");
    } else if (categoriaTarjeta === categoria) {
      // Si coincide con la categoría filtrada, se muestra
      tarjeta.classList.remove("card--oculta");
    } else {
      // Si no coincide, se oculta
      tarjeta.classList.add("card--oculta");
    }
  });
}


/**
 * FUNCIÓN: verProducto
 * Muestra información del producto al hacer clic en "Ver más".
 * 
 * @param {string} nombre - Nombre del producto
 * @param {string} precio - Precio del producto
 */
function verProducto(nombre, precio) {
  // alert() → muestra un cuadro emergente con el mensaje
  // Los backticks `` permiten usar template literals (texto + variables)
  // ${nombre} → inserta el valor de la variable "nombre" dentro del texto
  alert(`✦ ${nombre}\nPrecio: $${precio}\n\n¡Escríbenos para hacer tu pedido!\n📱 313 302 6563`);
}




/**
 * FUNCIÓN: animarContador
 * Anima un número de 0 hasta un valor final de forma progresiva.
 * 
 * @param {string} idElemento  - El id del <span> donde aparece el número
 * @param {number} valorFinal  - El número hasta el que debe contar
 * @param {string} sufijo      - Texto que se agrega después del número (ej: "+")
 */
function animarContador(idElemento, valorFinal, sufijo) {
  // Obtiene el elemento span donde se mostrará el número
  let elemento = document.getElementById(idElemento);

  // Si el elemento no existe en la página, no hace nada
  if (!elemento) return;

  let valorActual = 0; // El contador empieza en 0

  // Calcula el incremento: cuánto sube el número en cada paso
  // Queremos que la animación dure ~1.5 segundos con pasos cada 30ms
  // 1500ms / 30ms = 50 pasos → incremento = valorFinal / 50
  let incremento = Math.ceil(valorFinal / 50);

  // setInterval() → ejecuta una función repetidamente cada X milisegundos
  // Guarda el "id" del intervalo para poder detenerlo con clearInterval()
  let intervalo = setInterval(function() {
    // Suma el incremento al valor actual
    valorActual += incremento;

    // Si el valor actual supera el final, lo ajusta al valor exacto
    if (valorActual >= valorFinal) {
      valorActual = valorFinal;

      // clearInterval() → detiene el intervalo (para la animación)
      clearInterval(intervalo);
    }

    // Actualiza el texto del elemento con el número actual + sufijo
    // textContent → cambia solo el texto del elemento (más seguro que innerHTML)
    elemento.textContent = valorActual + sufijo;

  }, 30); // Se ejecuta cada 30 milisegundos
}

/**
 * FUNCIÓN: iniciarContadores
 * Inicia la animación de los tres contadores de la sección Nosotros.
 * Solo se llama cuando la sección Nosotros es visible en pantalla.
 */
function iniciarContadores() {
  animarContador("contador-1", 150, "+");  // 150+ piezas únicas
  animarContador("contador-2", 300, "+");  // 300+ clientas felices
  animarContador("contador-3", 5, " años"); // 5 años de experiencia
}




/**
 * Crea un observer que detecta cuando la sección Nosotros es visible.
 * Cuando el usuario llega a esa sección, activa los contadores animados.
 */
function configurarObserverContadores() {
  // Elemento que queremos vigilar (la sección Nosotros)
  let seccionNosotros = document.querySelector(".nosotros");

  // Si la sección no existe, no hace nada
  if (!seccionNosotros) return;

  // Variable para que los contadores solo se animen UNA vez
  let contadoresActivados = false;

  // IntersectionObserver recibe una función que se ejecuta cuando el
  // elemento entra o sale del viewport (área visible)
  let observer = new IntersectionObserver(function(entries) {

    // entries → lista de elementos vigilados (solo tenemos uno aquí)
    entries.forEach(function(entry) {

      // isIntersecting → true cuando el elemento es visible en pantalla
      if (entry.isIntersecting && !contadoresActivados) {
        contadoresActivados = true; // Marca que ya se activaron
        iniciarContadores();        // Inicia la animación
      }
    });

  }, { threshold: 0.3 }); // threshold: qué tanto del elemento debe ser visible
                            // 0.3 = cuando el 30% es visible, se activa

  // Le dice al observer qué elemento debe vigilar
  observer.observe(seccionNosotros);
}




/**
 * FUNCIÓN: enviarFormulario
 * Maneja el envío del formulario de contacto.
 * 
 * @param {Event} event - El objeto del evento "submit" del formulario
 * 
 * Nota: "event" se pasa desde el HTML con onsubmit="enviarFormulario(event)"
 */
function enviarFormulario(event) {

  // preventDefault() → cancela el comportamiento por defecto del formulario
  // Sin esto, la página se recargaría al enviar y se perdería el mensaje
  event.preventDefault();

  // ── Obtener los valores de los campos ───────────────────────
  // .value → obtiene el texto que el usuario escribió en el campo
  // .trim() → elimina espacios al inicio y al final del texto
  let nombre  = document.getElementById("nombre").value.trim();
  let correo  = document.getElementById("correo").value.trim();
  let mensaje = document.getElementById("mensaje").value.trim();

  // ── Validación básica ────────────────────────────────────────
  // Verifica que los campos obligatorios no estén vacíos
  if (nombre === "" || correo === "" || mensaje === "") {
    alert("⚠ Por favor completa todos los campos requeridos.");
    return; // Sale de la función sin continuar
  }

  // Validación del formato de email con expresión regular
  // Esta es la forma estándar de verificar si un email tiene formato válido
  let formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoEmail.test(correo)) {
    alert("⚠ Por favor ingresa un correo electrónico válido.");
    return;
  }

  // ── Si todo está bien: mostrar confirmación ──────────────────
  let divConfirmacion = document.getElementById("mensaje-confirmacion");

  // innerHTML → inserta contenido HTML dentro del elemento
  // Template literal (backticks) permite insertar variables en el texto
  divConfirmacion.innerHTML = `
    ✦ ¡Gracias, ${nombre}! Tu mensaje fue recibido.<br>
    Te responderemos pronto a <strong>${correo}</strong>.
  `;

  // Agrega la clase de éxito para aplicar los estilos CSS de confirmación
  divConfirmacion.classList.add("form__confirmacion--exito");

  // ── Limpiar el formulario ────────────────────────────────────
  // reset() → vacía todos los campos del formulario
  document.getElementById("formulario-contacto").reset();

  // ── Ocultar el mensaje después de 6 segundos ─────────────────
  // setTimeout() → ejecuta una función una sola vez después de X milisegundos
  setTimeout(function() {
    divConfirmacion.innerHTML = "";
    divConfirmacion.classList.remove("form__confirmacion--exito");
  }, 6000); // 6000 ms = 6 segundos
}




/**
 * FUNCIÓN: animarTarjetas
 * Agrega la clase de animación a las tarjetas cuando se hacen visibles.
 */
function animarTarjetas() {
  let tarjetas = document.querySelectorAll(".card");

  // Crea un observer para cada tarjeta
  let observerTarjetas = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Agrega la clase de animación cuando la tarjeta es visible
        entry.target.classList.add("card--visible");
      }
    });
  }, { threshold: 0.1 }); // Se activa cuando el 10% de la tarjeta es visible

  // Le dice al observer que vigile CADA tarjeta
  tarjetas.forEach(function(tarjeta) {
    observerTarjetas.observe(tarjeta);
  });
}



document.addEventListener("DOMContentLoaded", function() {

  // Confirma en la consola del navegador que el script cargó correctamente
  // Puedes ver esto abriendo las DevTools del navegador (tecla F12) → Consola
  console.log("✦ Aureo JS cargado correctamente");

  // Inicia el observer de los contadores
  configurarObserverContadores();

  // Inicia las animaciones de las tarjetas
  animarTarjetas();

  // Muestra el año actual en el footer automáticamente (si existiera el elemento)
  // Este es un ejemplo extra: actualizaría un elemento <span id="anio">
  let elementoAnio = document.getElementById("anio");
  if (elementoAnio) {
    // new Date().getFullYear() → obtiene el año actual del sistema
    elementoAnio.textContent = new Date().getFullYear();
  }

});

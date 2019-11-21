const cotizador = new API('09e97e569dd08ead7ba13b24276cde63b07536cc3b69835f49bbce66561fd38b');
// Instanciar classe de Interfaz para que este disponible para toda la APP
const ui = new Interfaz();

cotizador.obtenerMonedasAPI(); // llamar metodo en objeto instanceado

// Validar Formulario

const formulario = document.querySelector('#formulario');

// Listener

formulario.addEventListener('submit', (e) =>{
    e.preventDefault();

    // Leer campos del select: moneda y criptomonedas
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value; // me da el valor seleccionado del option 

    const criptomonedaSelect = document.querySelector('#criptomoneda');
    const criptomonedaSeleccionada = criptomonedaSelect.options[criptomonedaSelect.selectedIndex].value; // me da el valor seleccionado del option 

    // Comprobar que ambos campos tienen ago seleccionado

    if(monedaSeleccionada === '' || criptomonedaSeleccionada === ''){
        // Arrojar una alerta de error
        ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');
    } else {
        // Todo bien, consultar API
        cotizador.obtenerValores(monedaSeleccionada, criptomonedaSeleccionada)
            .then(data => { // Se mezclan las clases
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptomonedaSeleccionada);
            })
    }

})


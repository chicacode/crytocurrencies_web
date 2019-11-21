class Interfaz {

    constructor(){
        this.init();
    }
    init(){
        this.construirSelect();
    }

    construirSelect(){
        cotizador.obtenerMonedasAPI()
        .then(monedas => {
            // Crear un Select de Opciones
            const select = document.querySelector('#criptomoneda');

            //Iterar por los resultados de la API
            for(const [key, value] of Object.entries(monedas.monedas.Data) ) {//operador nuevo de JS
            // Añadir Symbol y el Nombre como opciones
            // Creamos en el DOM un option para el select de criptocurrency
            const option = document.createElement('option');
            option.value = value.Symbol;
            option.appendChild(document.createTextNode(value.CoinName));
            select.appendChild(option);
            }
        })
    }

    mostrarMensaje(mensaje, clases){ // 1er Method de Classes
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        // Seleccionar mensaje
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div) // Aqui se inserta en el DOM el div que hemos creado

        // Mostrar contenido
        setTimeout(()=>{
            document.querySelector('.mensajes div').remove(); // elimina el mensaje de error del DOM despues de 3 segundos
        },3000);
    }

    // Imprime el resultado de la cotización en Interface

    mostrarResultado(resultado, moneda, crypto){

        const datosMoneda= resultado[crypto][moneda]; // Parece array de php pero asi se puede acceder a objetos en JS
        
        console.log(datosMoneda);
        //Recortar digitos de precio
        let precio = datosMoneda.PRICE.toFixed(2),
            porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
            actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-US'); // la fecha que ha sido actualizado
        // construir el template
        let templateHTML = `
            <div class="card bg-dark">
                <div class="card-body text-light">
                    <h2 class="card-title">Result:</h2>
                    <p>The Price from ${datosMoneda.FROMSYMBOL} to ${datosMoneda.TOSYMBOL} currency is: $${precio}</p>
                    <p>Change last day: ${porcentaje}</p>
                    <p>Last update: ${actualizado}</p>
                </div>
            </div>
        `;
        this.mostrarOcultarSpinner('block');
        // Insertar el resultado en el DOM
        setTimeout(() => {
            document.querySelector('#resultado').innerHTML = templateHTML;
        // ocultar el spinner
        this.mostrarOcultarSpinner('none');
        }, 3000);

    }
    // Mostrar spinner de carga al enviar cotización
    mostrarOcultarSpinner(vista){
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;
    }
}
class API {
    constructor(apiKey){
        this.apiKey = apiKey;
    }
    // Obtener todas las monedas utilizando async await en el Method
    async obtenerMonedasAPI(){
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apiKey}`;

        //fetch API
        const urlObtenerMonedas = await fetch(url);

        // Respuesta en JSON
        const monedas = await urlObtenerMonedas.json();
        console.log(monedas);
        return{
            monedas
        }
    }

    async obtenerValores(moneda, criptomoneda){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${this.apiKey}`;

        // Consultar REstAPI

        const urlConvertir = await fetch(url);

        const resultado = await urlConvertir.json(); // la respuesta

        return {
            resultado
        }
    }

}
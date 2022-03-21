const https = require('https');

const ENDPOINT = "https://www.metaweather.com/es/";

let request = https.get(ENDPOINT, (res) => { 
    if (res.statusCode !== 200 ) {
        console.error("Error");
        console.log("Código de respuesta:" + res.statusCode);
        res.resume();
        return;
    }

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('close', () => {
        console.log('Datos recibidos');

        //-- Obtener la variable con la informacion
        let tiempo = JSON.parse(data);

        let temp = tiempo.consolidated_weather[0].the_temp;

        console.log("Localización: " + tiempo.title);
        console.log("Temperatura(ºC): " + temp);
        console.log("Hora local: " + tiempo.time);
        
    });
   
});
const axios = require("axios");
module.exports={

    get:async function(codeStudent){
        const {data} = await axios.get("http://user_api:8080/alumno/"+codeStudent);
        return data; 
    }
}
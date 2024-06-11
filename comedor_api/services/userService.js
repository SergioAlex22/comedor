const axios = require("axios");
module.exports={

    get:async function(code){
        const {data} = await axios.get("http://user_api:8080/people/"+codeStudent);
        return data; 
    }
}
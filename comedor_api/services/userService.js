const axios = require("axios");
module.exports={

    get:async function(code){
        const {data} = await axios.get("http://loan_api:8080/loan/"+code);
        return data; 
    },
    changeStatus: async function(code, status){
        const {data} = await axios.put("http://loan_api:8080/loan/"+code, {status});
    }
}
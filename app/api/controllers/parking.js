const axios = require("axios").default


const newLocal = 'https://dev.parcoapp.com/api/Parkings?access_token=3Gc60QmoQO0IqWnCH7Jh2O3kFjREjHDDshfcn4i0076GBwhja2TV17MDjyMIyKMD'


module.exports = {

   getparking: async function (req, res){
    
    let response =await axios(newLocal)
    console.log(response.status)

    let data = response.data
    if(response.status === 200 ){       
        res.json({status:"Ok", message:"Data obtenida con éxito", data})
    } 
    

}
    
}

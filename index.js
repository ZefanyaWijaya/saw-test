const express = require('express')
const app = express()
app.use(express.json())

const db = require("./db").DB

const functions = require("./funtion")

//GENERATE API LIST WHEY
app.get('/listwhey', (req, res) => {


    let parameter = {
        "harga" : req.query.harga,
        'protein' : req.query.protein,
        "calories" : req.query.calories,
        "variants" : req.query.variants,
        "search" : req.query.search,
    }
    functions.getWheyProtein(parameter,function(err, results) {
        try{
            if (err)
                throw err; // or return an error message, or something
            else
                console.log(results.length)
                res.send({"data" : results}); 
        }catch(error) {
            res.send({
                "error_key" : "error_internal_server",
                "error_message" : error
            })
        }
       
    });
})

app.post('/addwhey', (req, res) => {

    let body = req.body
    
    functions.postWheyProtein(body,function(err, results) {
        try{
            if (err)
                throw err; // or return an error message, or something
            else
            res.send({"data" : "Success"}); 
        }catch(error) {
            res.send({
                "error_key" : "error_internal_server",
                "error_message" : error
            })
        }
        
    });

})

app.put('/updatewhey', (req, res) => {

    let body = req.body
    
    functions.putWheyProtein(body,function(err, results) {
        try{
            if (err)
                throw err; // or return an error message, or something
            else
            res.send({"data" : "Success"}); 
        }catch(error) {
            res.send({
                "error_key" : "error_internal_server",
                "error_message" : error
            })
        }
        
    });

})

app.delete('/deletewhey', (req, res) => {

    let id = req.body.id_whey_protein 
    
    functions.deleteWheyProtein(id,function(err, results) {
        try{
            if (err)
                throw err; // or return an error message, or something
            else if(results == 0)
            {
                res.send()
            }
            res.send({"data" : "Success"}); 
        }catch(error) {
            res.send({
                "error_key" : "error_internal_server",
                "error_message" : error
            })
        }
        
    });

})
  

//GENERATE API CALCULATE WHEY



app.listen(3000, () => console.log(`Example app listening at http://localhost:3000`))


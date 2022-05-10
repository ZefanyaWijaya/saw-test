const cors = require('cors')
const express = require('express')
const app = express()
app.use(express.json())
app.use(cors())

const db = require("./db").DB

const functions = require("./function")
const sawfunction = require("./calculate_saw")

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
                res.send({
                    "message" : "Success",
                    "data" : results
                }); 
                
        }catch(error) {
            res.send({
                "message" : "Failed",
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

app.get('/getcalculatewhey', (req, res) => {

    let parameter = req.query.search

    functions.getCalculateWhey(parameter,function(err, results) {
        try{
            if (err)
                throw err; // or return an error message, or something
            else
                console.log(results.length)
                res.send({
                    "message" : "Success",
                    "data" : results
                }); 
        }catch(error) {
            res.send({
                "message" : "Failed",
                "error_key" : "error_internal_server",
                "error_message" : error
            })
        }
    });  
}) 

app.put('/update_calculate_whey', (req, res) => {

    let data 
    
    functions.getCalculateWhey("", async function(err, results) {
        try{
            if (err)
                throw err; 
            else
                console.log(results.length)
                let calculate_saw =  sawfunction.calculateSaw(results);
                for (let i = 0 ; i < results.length ; i++) {
                    await functions.update_calculate_whey(calculate_saw[i] , results[i].id_whey_protein)
                }
                res.send(calculate_saw);
        }catch(error) {
            res.send({
                "error_key" : "error_internal_server",
                "error_message" : error
            })
        }
    });  
   
    console.log(data);

})


// GENERATE API RANKING WHEY

app.get('/rankingwhey', (req, res) => {


    let parameter = {
        "harga" : req.query.harga,
        'protein' : req.query.protein,
        "calories" : req.query.calories,
        "variants" : req.query.variants,
        "others" : req.query.others,
    }
    functions.getRankingWheyProtein(parameter,function(err, results) {
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







app.listen(3000, () => console.log(`Example app listening at http://localhost:3000`))


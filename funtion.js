
const db = require("./db").DB

//FUNCTION LIST WHEY

function getWheyProtein(parameter , callback){
    db.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            throw err;
        }
        var tambahan =""

        var params = [];


        if (parameter.harga == "a")
        {
            tambahan += " where price_per_serving between ? and ?"
            params.push(0)
            params.push(5000)
        } else if (parameter.harga == "b") {
            tambahan += " where price_per_serving between ? and ?"
            params.push(5001)
            params.push(10000) 
        } else if (parameter.harga == "c") {
            tambahan += " where price_per_serving between ? and ?"
            params.push(10001)
            params.push(15000)
        } else if (parameter.harga == "d") {
            tambahan += " where price_per_serving between ? and ?"
            params.push(15001)
            params.push(20000)
        } else if (parameter.harga == "e") {
            tambahan += " where price_per_serving between ? and ?"
            params.push(20001)
            params.push(25000)
        } else if (parameter.harga == "f") {
            tambahan += " where price_per_serving between ? and ?"
            params.push(25001)
            params.push(30000)
        } else if (parameter.harga == "g") {
            tambahan += " where price_per_serving > ?"
            params.push(30000)
        } else {
            tambahan += " where price_per_serving >= ?"
            params.push(0)
        }

        if (parameter.protein == "a") {
            tambahan += " AND protein_per_serving between ? and ?"
            params.push(0)
            params.push(5)
        } else if (parameter.protein == "b") {
            tambahan += " AND protein_per_serving between ? and ?"
            params.push(6)
            params.push(10)
        } else if (parameter.protein == "c") {
            tambahan += " AND protein_per_serving between ? and ?"
            params.push(11)
            params.push(15)
        } else if (parameter.protein == "d") {
            tambahan += " AND protein_per_serving between ? and ?"
            params.push(16)
            params.push(20)
        } else if (parameter.protein == "e") {
            tambahan += " AND protein_per_serving between ? and ?"
            params.push(21)
            params.push(25)
        } else if (parameter.protein == "f") {
            tambahan += " AND protein_per_serving between ? and ?"
            params.push(26)
            params.push(30)
        } else if (parameter.protein == "g") {
            tambahan += " AND protein_per_serving > ?"
            params.push(30)
        } else {
            tambahan += " AND protein_per_serving >= ?"
            params.push(0)
        }

        if(parameter.calories == "a") {
            tambahan += " AND calories_per_serving between ? and ?"
            params.push(0)
            params.push(100)
        } else if (parameter.calories == "b") {
            tambahan += " AND calories_per_serving between ? and ?"
            params.push(101)
            params.push(125)
        } else if (parameter.calories == "c") {
            tambahan += " AND calories_per_serving between ? and ?"
            params.push(126)
            params.push(150)
        } else if (parameter.calories == "d") {
            tambahan += " AND calories_per_serving between ? and ?"
            params.push(151)
            params.push(175)
        } else if (parameter.calories == "e") {
            tambahan += " AND calories_per_serving between ? and ?"
            params.push(176)
            params.push(200)
        } else if (parameter.calories == "f") {
            tambahan += " AND calories_per_serving between ? and ?"
            params.push(201)
            params.push(225)
        } else if (parameter.calories == "g") {
            tambahan += " AND calories_per_serving between ? and ?"
            params.push(226)
            params.push(250)
        } else if (parameter.calories == "h") {
            tambahan += " AND calories_per_serving > ?"
            params.push(250)
        } else {
            tambahan += " AND calories_per_serving >= ?"
            params.push(0)
        }

        if(parameter.variants == "a") {
            tambahan += " AND available_variant_product = ?"
            params.push(1)
        } else if(parameter.variants == "b") {
            tambahan += " AND available_variant_product = ?"
            params.push(2)
        } else if(parameter.variants == "c") {
            tambahan += " AND available_variant_product = ?"
            params.push(3)
        } else if(parameter.variants == "d") {
            tambahan += " AND available_variant_product = ?"
            params.push(4)
        } else if(parameter.variants == "e") {
            tambahan += " AND available_variant_product = ?"
            params.push(5)
        } else if(parameter.variants == "f") {
            tambahan += " AND available_variant_product > ?"
            params.push(5)
        } else {
            tambahan += " AND available_variant_product >= ?"
            params.push(0)
        }
        
        if(parameter.search != null) {
            tambahan += " AND whey_protein_name LIKE '%"+parameter.search+"%' " 
            // + connection.escape('%'+parameter.search+'%')
        } 
        // else {
        //     tambahan += ""
            
        // }

        connection.query("select * from whey_protein"+tambahan, params, function (err, rows) {
            // connection.release();
            if (!err) {
                console.log(rows);
                connection.release()
                callback(null,rows)
                
            }
            else {
                console.log("error");
                connection.release()
                callback(err,null)
            }

        });

        connection.on('error', function (err) {
            connection.release();
            callback(err,null)
            throw err;
        });
    });
}

function postWheyProtein (parameter , callback){
    db.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            throw err;
        }

        params = [
            parameter.price_per_serving,
            parameter.protein_per_serving,
            parameter.calories_per_serving,
            parameter.available_variants
        ]

        connection.query(`INSERT INTO whey_protein(whey_protein_name ,price_per_serving ,protein_per_serving ,
            calories_per_serving , available_variant_product  , more_detail_link ) 
            VALUES ('`+parameter.whey_protein_name+`', ?, ?, ?, ?, '`+parameter.details+`') `, params, function (err, rows) {
            
            if (!err) {
                console.log(rows);
                connection.release()
                callback(null,rows)
                
            }
            else {
                console.log("error");
                connection.release()
                callback(err,null)
            }

        });

        connection.on('error', function (err) {
            connection.release();
            callback(err,null)
            throw err;
        });
    });
}

function putWheyProtein (parameter , callback){
    db.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            throw err;
        }

        params = [
            parameter.price_per_serving,
            parameter.protein_per_serving,
            parameter.calories_per_serving,
            parameter.available_variants,
            parameter.id_whey_protein
        ]

        connection.query(`UPDATE whey_protein SET whey_protein_name = '`+parameter.whey_protein_name+`',
            price_per_serving = ? , 
            protein_per_serving = ? ,
            calories_per_serving = ? ,
            available_variant_product = ? ,
            more_detail_link = '`+parameter.details+`'
            WHERE id_whey_protein = ? 
             `, params, function (err, rows) {
            
            if (!err) {
                console.log(rows);
                connection.release()
                callback(null,rows)
                
            }
            else {
                console.log("error");
                connection.release()
                callback(err,null)
            }
        });

        connection.on('error', function (err) {
            connection.release();
            callback(err,null)
            throw err;
        });
    });
}


function deleteWheyProtein (id , callback){
    db.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            throw err;
        }

        params = []

        connection.query(`DELETE FROM whey_protein WHERE id_whey_protein = ?`, id, function (err, rows) {
            if (!err) {
                console.log(rows.affectedRows);
                connection.release()
                callback(null,rows.affectedRows)
                
            }
            else {
                console.log("error");
                connection.release()
                callback(err,null)
            }
        });

        connection.on('error', function (err) {
            connection.release();
            callback(err,null)
            throw err;
        });
    });
}

//CALCULATE WHEY

function getCalculateWhey(parameter, callback){
    db.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            throw err;
        }
    
        var tambahan = ''
        
        if(parameter != null) {
            tambahan += " WHERE whey_protein_name LIKE '%"+parameter+"%' " 
            // + connection.escape('%'+parameter.search+'%')
        } 
        // else {
        //     tambahan += ""
            
        // }

        connection.query("select * from calculate_whey"+tambahan, parameter, function (err, rows) {
            if (!err) {
                console.log(rows);
                connection.release()
                callback(null,rows)
            }
            else {
                console.log("error");
                connection.release()
                callback(err,null)
            }

        });

        connection.on('error', function (err) {
            connection.release();
            callback(err,null)
            throw err;
        });
    });
}


exports.getWheyProtein = getWheyProtein
exports.postWheyProtein = postWheyProtein
exports.putWheyProtein = putWheyProtein
exports.deleteWheyProtein = deleteWheyProtein

exports.getCalculateWhey = getCalculateWhey


function calculateSaw (data) {

    let alternatif = []
    let alternatifkriteria = []


    for (let i = 0 ; i < data.length ; i++) {
        alternatif.push(data[i].whey_protein_name);
        alternatifkriteria.push(  
            [
                data[i].price_per_serving,
                data[i].protein_per_serving,
                data[i].calories_per_serving,
                data[i].other_ingredients,
                data[i].available_variant_product
            ]
        )
    };
 
    
    let kriteria = ["Harga" , "Protein", "Calories", "Kandungan Lain", "Rasa"];
    let costbenefit = ["cost" , "benefit", "cost", "benefit", "benefit"];
    let kepentingan = [0.2 , 0.3 , 0.3 , 0.15, 0.05];
    
    pembagi = [];

    for (let i = 0; i < kriteria.length ; i++) {
        pembagi.push(0);
        for (let j = 0; j < alternatif.length ; j++) {
            if(costbenefit[i] == 'cost') {
                if(j == 0) {
                    pembagi[i] = alternatifkriteria[j][i];
                } else {
                if (pembagi[i] > alternatifkriteria[j][i]) {
                        pembagi [i] = alternatifkriteria[j][i];
                    }
                }
            } else { //costbenefit[i] berarti benefit
                if(j == 0) {
                    pembagi[i] = alternatifkriteria[j][i];
                } else {
                if (pembagi[i] < alternatifkriteria[j][i]) {
                        pembagi [i] = alternatifkriteria[j][i];
                    }
                }
            }
        }
    }

    console.log('Nilai Pembagi Penentu'); console.log(pembagi);

    let normalisasi = [];

    for (let i = 0; i < alternatif.length ; i++) {
        normalisasi.push([]);
        for( let j = 0; j < kriteria.length; j++) {
            normalisasi[i].push(0);
            if(costbenefit[j] == 'cost'){
                normalisasi[i][j] = pembagi[j] / alternatifkriteria[i][j];
            } else {
                normalisasi[i][j] = alternatifkriteria[i][j] / pembagi[j];
            }
        }
    }

    console.log('Hasil Normalisasi'); console.log(normalisasi);

    let hasil = [];

    for (let i = 0; i < alternatif.length; i++) {
        hasil.push(0);
        for( let j = 0; j < kriteria.length; j++) {
            hasil[i] = hasil [i] + (normalisasi[i][j] * kepentingan[j]);
        }
    }

    console.log('Hasil Perhitungan Dari Setiap Kriteria'); console.log(hasil);

    return hasil;

    // alternatifranking = [];
    // hasilranking = [];

    // for (let i = 0 ; i < alternatif.length ; i++) {
    //     hasilranking.push(hasil[i]);
    //     alternatifranking.push(alternatif[i]);
    // }

    // for (let i = 0; i < alternatif.length; i++) {
    //     for (let j = 0 ; j < alternatif.length; j++) {
    //         if (j > i) {
    //             if (hasilranking[j] > hasilranking [i]) {
    //                 temphasil = hasilranking[i];
    //                 tempalternatif = alternatifranking[i];
    //                 hasilranking[i] = hasilranking[j];
    //                 alternatifranking[i] = alternatifranking[j];
    //                 hasilranking[j] = temphasil;
    //                 alternatifranking[j] = tempalternatif;
    //             }
    //         }
    //     }
    // }

    // console.log('Alternatif Ranking'); console.log(alternatifranking);
    // console.log('Hasil Ranking'); console.log(hasilranking);
}

exports.calculateSaw = calculateSaw

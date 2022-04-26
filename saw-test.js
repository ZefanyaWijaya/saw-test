        alternatif = 
                    [  "Optimum N Gold Standard" , 
                        "Optimum Platinum", 
                        "EVOWHEY PROTEIN 1750 gr", 
                        "EVOLENE ISOLENE 1650 gr",
                        "L-Men Daily Whey Protein 250 gr",
                        "BSN Syntha 6 (5 lbs)"
                    ];
        kriteria = ["Harga" , "Protein", "Calories", "Kandungan Lain", "Rasa"];
        costbenefit = ["cost" , "benefit", "cost", "benefit", "benefit"];
        kepentingan = [0.2 , 0.3 , 0.3 , 0.15, 0.05];
        alternatifkriteria = [
            [13874, 24, 120, 3, 20],
            [31225, 30, 140, 4, 2],
            [13600, 25, 125, 4, 3],
            [16400, 27, 140, 4, 1],
            [9233, 12, 150, 14, 2],
            [17083, 22, 200, 5, 6]
        ]

        console.log('Alternatif');console.log(alternatif);
        console.log('Kriteria');console.log(kriteria);
        console.log('Cost / Benefit');console.log(costbenefit);
        console.log('Nilai Kepentingan'); console.log(kepentingan);
        console.log('Alternatif Kriteria');console.log(alternatifkriteria);

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

        normalisasi = [];

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

        hasil = [];

        for (let i = 0; i < alternatif.length; i++) {
            hasil.push(0);
            for( let j = 0; j < kriteria.length; j++) {
                hasil[i] = hasil [i] + (normalisasi[i][j] * kepentingan[j]);
            }
        }

        console.log('Hasil Perhitungan Dari Setiap Kriteria'); console.log(hasil);

        alternatifranking = [];
        hasilranking = [];

        for (let i = 0 ; i < alternatif.length ; i++) {
            hasilranking.push(hasil[i]);
            alternatifranking.push(alternatif[i]);
        }

        for (let i = 0; i < alternatif.length; i++) {
            for (let j = 0 ; j < alternatif.length; j++) {
                if (j > i) {
                    if (hasilranking[j] > hasilranking [i]) {
                        temphasil = hasilranking[i];
                        tempalternatif = alternatifranking[i];
                        hasilranking[i] = hasilranking[j];
                        alternatifranking[i] = alternatifranking[j];
                        hasilranking[j] = temphasil;
                        alternatifranking[j] = tempalternatif;
                    }
                }
            }
        }

        console.log('Alternatif Ranking'); console.log(alternatifranking);
        console.log('Hasil Ranking'); console.log(hasilranking);

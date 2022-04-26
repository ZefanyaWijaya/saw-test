alternatif = ["hp A" , "hp B", "hp C", "hp D" , "hp zef"];
kriteria = ["Harga" , "Kualitas", "Fitur", "Poupuler" , "Purna Jual", "Keawetan"];
costbenefit = ["cost", 'benefit', 'benefit', 'benefit', 'benefit', 'benefit'];
kepentingan = [0.2, 0.25, 0.2, 0.15, 0.1, 0.1];
alternatifkriteria = [
    [3500000, 70, 10, 80, 3000, 36],
    [4500000, 90, 10, 60, 2500, 48],
    [4000000, 80, 9,  90, 2000, 48],
    [4000000, 70, 8,  50, 1500, 60],
    [3000000, 90, 10, 90, 4000, 70],
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

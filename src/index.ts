import Modulocr from './modulocr';

console.log(Modulocr.encrypt('test')); // edge case

console.log(Modulocr.encrypt('Informatik ist toll kappa'));

for (let i = 0; i < 10; i++) {
    console.log(Modulocr.encrypt('Informatik ist toll kappa'));
}

// 3-afcyffdgs zat wzvc ddfii
console.log(Modulocr.decrypt('1ijbarbbklp ?jz -?qa kkbcc'));

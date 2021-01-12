import Modulocr from './modulocr';

console.log(Modulocr.encrypt('test')); // edge case

console.log(Modulocr.encrypt('Informatik ist toll'));

for (let i = 0; i < 10; i++) {
    console.log(Modulocr.encrypt('Informatik ist toll'));
}

// 3-afcyffdgs zat wzvc ddfii
console.log(Modulocr.decrypt('1ijbarbbklp ?jz -?qa'));

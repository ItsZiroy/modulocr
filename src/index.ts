import Modulocr from '../utils/modulocr';

console.log(Modulocr.encrypt('rm')); // edge case

console.log(Modulocr.encrypt('Informatik ist toll kappa'))

for (let i = 0; i < 10; i++) {
    console.log(Modulocr.encrypt('Informatik ist toll kappa'))
}


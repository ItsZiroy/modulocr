const index = {
    0: 0,
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
};
export default class Modulocr {
    static encrypt = (encryptable: string): string => {
        const seed = parseInt((Math.random() * 10).toFixed(0)) || 1;

        const parts = encryptable.toLowerCase().split('');

        let before = 0;

        let result :string = '' + seed;

        parts.forEach((value: string) => {
            if(value === ' ') {
                result = result + ' ';
            } else {
            const encrypted = Modulocr.encryptInt(
                before,
                value as keyof typeof index,
                seed
            );
            result =
                result +
                Object.keys(index).find((key:string) => index[key as  keyof typeof index] === encrypted);

            before = encrypted;
            }
        });
        return result;
    };

    static encryptInt = (
        before: number,
        encryptable: keyof typeof index,
        seed: number
    ): number => {
        if (!before) {
            return (index[encryptable] * seed) % 26;
        } else {
            return (before * index[encryptable]) % 26;
        }
    };
}

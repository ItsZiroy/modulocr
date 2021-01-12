const index = {
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
    '-': 27,
    '?': 28,
};
type IndexKey = keyof typeof index;

class Modulocr {
    /**
     * # Modulocr encryption
     *
     * Every letter of the string is converted to a number
     * from 1-29. It includes the letters from a-z, - and ?.
     *
     * The last number of the index may be customized as
     * the index grows, but it must always be a prime
     * number and unassigned as only then the algorithm
     * never returns zero, which is difficult to handle.
     *
     * ## The algorithm
     *
     * The algorithm itself is fairly simple:
     * A random `seed` between 1 and 9 is generated and multipied
     * with the first value of the string. Then the modulo 29 (or
     * index size) is calculated and returned as the new value
     * and converted back to a letter which serves as the encrypted
     * value.
     *
     * The algorithm then moves on to replace seed with the
     * encrypted value of the former letter in the encryptable
     * string. This leaves the following basic function to
     * be evaluated for each letter in the string:
     *
     * `(seed | before) * current % 29`
     *
     * @param encryptable The string to be encrypted
     */
    public encrypt = (encryptable: string): string => {
        const seed = parseInt((Math.random() * 9).toFixed(0)) || 1;

        const parts = encryptable.toLowerCase().split('');

        let before = 0;

        let result: string = '' + seed;

        parts.forEach((value: string) => {
            if (value === ' ') {
                result = result + ' ';
            } else {
                const encrypted = this.encryptInt(
                    before,
                    value as IndexKey,
                    seed,
                );
                result =
                    result +
                    Object.keys(index).find(
                        (key: string) => index[key as IndexKey] === encrypted,
                    );

                before = encrypted;
            }
        });
        return result;
    };

    public decrypt = (decryptable: string): string => {
        const seed = parseInt(decryptable.split('')[0]);

        const parts = decryptable.slice(1).split('');

        let before = 0;

        let result = '';

        parts.forEach((value: string) => {
            if (value === ' ') {
                result = result + ' ';
            } else {
                const decrypted = this.decryptInt(
                    before,
                    value as IndexKey,
                    seed,
                );

                result =
                    result +
                    Object.keys(index).find(
                        (key: string) => index[key as IndexKey] === decrypted,
                    );

                before = index[value as IndexKey];
            }
        });

        return result;
    };

    /**
     * The recursively run method of the encryption
     * algorithm
     *
     * @param before Value of the former encrypted letter
     * @param encryptable The letter to be encrypted
     * @param seed The seed of the algorithm
     */
    private encryptInt = (
        before: number,
        encryptable: IndexKey,
        seed: number,
    ): number => {
        if (!before) {
            return (index[encryptable] * seed) % 29;
        } else {
            return (before * index[encryptable]) % 29;
        }
    };

    /**
     * The recursively run method of the decryption
     * algorithm
     *
     * @param before Value of the former encrypted letter
     * @param encryptable The letter to be encrypted
     * @param seed The seed of the algorithm
     */
    private decryptInt = (
        before: number,
        decryptable: IndexKey,
        seed: number,
    ): number => {
        if (!before) {
            before = seed;
        }
        let lcm = 0; // Lowest common multiple

        for (let i = 0; i < 30; i++) {
            if (
                Number.isInteger(((index[decryptable] + 29 * i) / before) % 29)
            ) {
                lcm = i;
                break;
            }
        }
        return (index[decryptable] + 29 * lcm) / before;
    };
}
export default new Modulocr();

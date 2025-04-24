const {countCharacters,
    countWords,
    countSentence,
    estimateReadingTime,
    getLetterDensity}  = require('../js/utils');


describe('Character Counter Functionality', () => {
    test('counts characters with spaces', () =>{
        expect(countCharacters('Hi, Jemima')).toBe(10);
    });
    
    test('counts character with no spaces', () =>{
        expect(countCharacters('Hi, Jemima',true)).toBe(9);
    });

    test('return 0 for empty string', () => {
        expect(countCharacters('')).toBe(0);
    })
    
    test('count words in a string', () =>{
        expect(countWords('Hi, Jemima')).toBe(2);
    });

    test('count words with excessive whitespace', () => {
        expect(countWords('   I    am    a    girl   ')).toBe(4);
    })
    
    test('count sentences', () =>{
        expect(countSentence('Hi, Jemima. How are you doing? I am fine!')).toBe(3);
    });
    test('calculate estimated reading time', () =>{
        expect(estimateReadingTime(0)).toBe('<1minute');
        expect(estimateReadingTime(100)).toBe('<1minute');
        expect(estimateReadingTime(400)).toBe('2minutes');
    });
    test('topletters letter density analysis', () =>{
        const result = getLetterDensity('Kofi is going to school.')
        expect(result.totalLetters).toBe(19);
        expect(result.topLetters[0]).toStrictEqual(['o', 5]);
    });
    test('letter density with no letters', () =>{
        const result = getLetterDensity('10059679')
        expect(result.totalLetters).toBe(0);
        expect(result.topLetters).toStrictEqual([]);
    })
});

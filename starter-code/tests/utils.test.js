/**
 * @jest-environment jsdom
 */
import {countCharacters,
    countWords,
    countSentences,
    estimateReadingTime,
    getLetterDensity,
    updateCounters
    }  from '../js/utils';

// Character Counter Functionality
describe('Character Counter Functionality', () => {
    test('counts characters with spaces', () =>{
        expect(countCharacters('Hi, Jemima')).toBe('10');
    });
    
    test('counts character with no spaces', () =>{
        expect(countCharacters('Hi, Jemima',true)).toBe('09');
    });

    test('return 0 for empty string', () => {
        expect(countCharacters('')).toBe('00');
    });
});

// Word Counter Functionality
describe('Word Count Functionality', () =>{
    test('count words in a string', () =>{
        expect(countWords('Hi, Jemima')).toBe('02');
    });

    test('count words with excessive whitespace', () => {
        expect(countWords('   I    am    a    girl   ')).toBe('04');
    })
});

// Sentence Counter Functionality
describe('Sentence Count Functionality', () =>{
    test('count sentences', () =>{
        expect(countSentences('Hi, Jemima. How are you doing? I am fine!')).toBe('03');
    });
});

// Reading Time Functionality
describe('Reading Time Functionality', () =>{
    test('calculate estimated reading time with no input word', () =>{
        expect(estimateReadingTime(0)).toBe('0minute');
    });
    test('calculate estimated reading time with 100 words', () =>{
        expect(estimateReadingTime(100)).toBe('<1minute');
    });
    test('calculate estimated reading time with 400 words', () =>{
        expect(estimateReadingTime(400)).toBe('2minutes');
    });
});

// Letter Density Functionality
describe('Letter Density Functionality', () =>{
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


// DOM Element Mocking
describe('DOM interaction tests', () => {
    let textInput,characterCount,wordCount,sentenceCount;
    beforeEach(() => {
        textInput = document.createElement('textarea');
        characterCount = document.createElement('div');
        wordCount = document.createElement('div');
        sentenceCount = document.createElement('div');
    })

    test('test character count in DOM', () => {
        textInput.value = 'Hello, you are welcome!';
        updateCounters(textInput,characterCount,wordCount,sentenceCount);
        
        expect(characterCount.textContent).toBe('23');
    });
    test('test word count in DOM', () => {
        textInput.value = 'Hello, you are welcome!';
        updateCounters(textInput,characterCount,wordCount,sentenceCount);

        expect(wordCount.textContent).toBe('04');
    });
    test('test sentence count in DOM', () => {
        textInput.value = 'Hello, you are welcome!';
        updateCounters(textInput,characterCount,wordCount,sentenceCount);
        
        expect(sentenceCount.textContent).toBe('01');
    });
});

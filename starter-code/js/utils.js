//Refactored utility functions
//export and import are ES Modules syntax - modern JavaScript

//Character count 
export function countCharacters(text, excludeSpaces = false) {
    const characters = excludeSpaces ? text.replace(/\s/g,'').length : text.length; //using regular expression to remove all white spaces
    return characters.toString().padStart(2,0);
}

//Word count
export function countWords(text) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return words.toString().padStart(2,0);
}

//Sentence count
export function countSentences(text) {
    const sentences = text.trim() ? text.split(/[.!?}]+/).filter(s => s.trim().length > 0).length : 0;
    return sentences.toString().padStart(2,0);
}

//Calculate Estimated Reading time
export function estimateReadingTime(wordCount,wpm=200) {
    const time = (wordCount/wpm);
    if (time == 0) return `0minute` ;
    else if(isNaN(time) || (time < 1 && time > 0)) return `<1minute`;
    else return `${time}minutes` ;
}

//Retrieve Letter density
export function getLetterDensity(text, topFiveNum = 5){
    const letters = text.toLowerCase().match(/[a-z]/g)  || [];
    const total = letters.length;

    const letterCount = {};
    letters.forEach(letter => letterCount[letter] = (letterCount[letter] || 0)+1);

    const sorted = Object.entries(letterCount).sort((a,b) => b[1] - a[1]);

    return {
        totalLetters: total,
        topLetters: sorted.slice(0, topFiveNum),
        allLetters: sorted
    }

}

//DOM Element mocking
export function updateCounters(textInput,characterCount,wordCount,sentenceCount) {
    let text  = textInput.value;
    characterCount.textContent = countCharacters(text);
    wordCount.textContent = countWords(text);
    sentenceCount.textContent = countSentences(text);
}

//Removed module.export and replaced with export
//module.exports and require are CommonJS(old Node.js style module )

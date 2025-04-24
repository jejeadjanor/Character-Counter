//Refactored utility functions

//Character count 
function countCharacters(text, excludeSpaces = false) {
    const characters = excludeSpaces ? text.replace(/\s/g,'').length : text.length;
    return characters.toString().padStart(2,0);
}

//Word count
function countWords(text) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return words.toString().padStart(2,0);
}

//Sentence count
function countSentence(text) {
    const sentences = text.trim() ? text.split(/[.!?}]+/).filter(s => s.trim().length > 0).length : 0;
    return sentences.toString().padStart(2,0);
}

//Calculate Estimated Reading time
function estimateReadingTime(wordCount,wpm=200) {
    if(isNaN(wordCount) || (wordCount > 0 && wordCount < 200)) return `<1minute`;
    const time = wordCount/wpm;
    return wordCount < wpm ? `<1minute` : `${time}minute${time !== 1 ? 's' : ''}` ;
}

//Retrieve Letter density
function getLetterDensity(text, topFiveNum = 5){
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
function updateCounters(textInput,characterCount,wordCount,sentenceCount) {
    let text  = textInput.value;
    characterCount.textContent = countCharacters(text);
    wordCount.textContent = countWords(text);
    sentenceCount.textContent = countSentence(text);
}

module.exports = {
    countCharacters,
    countWords,
    countSentence,
    estimateReadingTime,
    getLetterDensity,
    updateCounters
};

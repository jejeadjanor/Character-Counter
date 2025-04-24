//Refactored utility functions

//Character count 
function countCharacters(text, excludeSpaces = false) {
    return excludeSpaces ? text.replace(/\s/g,'').length : text.length;
}

//Word count
function countWords(text) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
}

//Sentence count
function countSentence(text) {
    return text.trim() ? text.split(/[.!?}]+/).filter(s => s.trim().length > 0).length : 0;
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

module.exports = {
    countCharacters,
    countWords,
    countSentence,
    estimateReadingTime,
    getLetterDensity
};

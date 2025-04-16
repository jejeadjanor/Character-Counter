//DOM Elements
const textInput = document.getElementById('text-input');
const excludeSpaces = document.getElementById('exclude-spaces');
const setLimit = document.getElementById('set-limit');
const limitInput = document.getElementById('limit-input');
const limitDisplay = document.getElementById('limit-display');
const errorMessage = document.querySelector('.error-message');
const readingTime = document.getElementById('reading-time');
const countCharacter = document.getElementById('character-count');
const countWord = document.getElementById('word-count');
const countSentence = document.getElementById('sentence-count');

//Initial Declarations & Calls
let maxCharater = parseInt(limitInput.value);
let isExcludeSpaces = excludeSpaces.checked;
let isLimitSet = setLimit.checked;
updateLimitDisplay();

//Text Analysis
textInput.addEventListener('input', analyzeText);



//Controllers settings changes
excludeSpaces.addEventListener('change', () => {
    isExcludeSpaces = excludeSpaces.checked;
    analyzeText();
})

setLimit.addEventListener('change', () => {
    isLimitSet = setLimit.checked;
    limitInput.disable = !isLimitSet

    if(isLimitSet) {
        analyzeText();
    } else {
        errorMessage.classList.remove('hidden')
        textInput.style.borderColor = '';
    }
})

limitInput.addEventListener('input', () => {
    if(limitInput.value && parseInt(limitInput.value) > 0) {
        maxCharater = parseInt(limitInput.value);
        updateLimitDisplay();
        analyzeText();
    }
})


function analyzeText() {
    const text = textInput.value;

    //Character count
    let characters;

    if(excludeSpaces) {
        characters = text.replace(/\s/g, '').length; //using regular expression to remove all white spaces
    }else{
        characters = text.length;
    }

    countCharacter.textContent = characters;

    //Word count
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    countWord.textContent = words;

    //sentence count
    const sentences = text.trim() ?  text.split(/[.!?}]+/).filter(sentence => sentence.trim().length > 0).length : 0;
    countSentence.textContent = sentences;

    //Reading time: assuming average reading speed time is 300 words per minute
    const wordsPerMinute = 300;
    const estimatedReadingTime = Math.ceil(words / wordsPerMinute) || 0;
    if(isNaN(estimatedReadingTime) || estimatedReadingTime < 1 && words > 0) {
        readingTime.textContent = '< 1minute';
    }else {
        readingTime.textContent = `${estimatedReadingTime} minute ${estimatedReadingTime !== 1 ? 's' : ''}`;
    }
    
    //Character limit check
    if(isLimitSet && characters > maxCharater) {
        errorMessage.classList.remove('hidden');
        textInput.style.borderColor = 'var(--error-color)'
    } else{
        errorMessage.classList.add('hidden');
        textInput.style.borderColor = '';
    }
    
}

function updateLimitDisplay(){
    limitDisplay.textContent = maxCharater;
}
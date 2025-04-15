//DOM Elements
const textInput = document.getElementById('text-input');
const excludeSpaces = document.getElementById('exclude-spaces');
const setLimit = document.getElementById('set-limit');
const limitInput = document.getElementById('limit-input');
const limitDisplay = document.getElementById('limit-display');
const errorMessage = document.querySelector('.error-message');

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
        errorMessage.classList.add('hidden')
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

    let characters;

    if(excludeSpaces) {
        characters = text.replace(/\s/g, '').length; //using regular expression to remove all white spaces
    }else{
        characters = text.length;
    }

    //Character limit check
    if(isLimitSet && characters > maxCharater) {
        errorMessage.classList.remove('hidden');
        textInput.style.borderColor = 'var(--error-color)'
    }else{
        errorMessage.classList.add('hidden');
        textInput.style.borderColor = '';
    }
    
}

function updateLimitDisplay(){
    limitDisplay.textContent = maxCharater;
}
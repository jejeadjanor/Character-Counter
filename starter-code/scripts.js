//DOM Elements
const textInput = document.getElementById('text-input');
const excludeSpaces = document.getElementById('exclude-spaces');
const spaceIndicator = document.getElementById('space-indicator');
const setLimit = document.getElementById('set-limit');
const limitInput = document.getElementById('limit-input');
const limitDisplay = document.getElementById('limit-display');
const errorMessage = document.querySelector('.error-message');
const readingTime = document.getElementById('reading-time');
const countCharacter = document.getElementById('character-count');
const countWord = document.getElementById('word-count');
const countSentence = document.getElementById('sentence-count');
const densityProgress = document.getElementById('density-progress');
const seeMoreButton = document.getElementById('seemore-button');
const togglingTheme = document.getElementById('toggle-theme');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const myBar = document.getElementById('mybar');


//Initial Declarations & Calls
let maxCharater = parseInt(limitInput.value);
let isExcludeSpaces = excludeSpaces.checked;
let isLimitSet = setLimit.checked;
let isDensityProgressExpanded = false;
updateLimitDisplay();

//Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(`${savedTheme}-theme`);
sunIcon.style.display = savedTheme === 'dark' ? 'flex' : 'none';
moonIcon.style.display = savedTheme === 'light' ? 'flex' : 'none';

togglingTheme.addEventListener('click', toggleTheme)

//Text Analysis
textInput.addEventListener('input', analyzeText);


//Controllers settings changes
excludeSpaces.addEventListener('change', () => {
    isExcludeSpaces = excludeSpaces.checked;
    spaceIndicator.textContent = isExcludeSpaces ? '(no space)' : '(with spaces)'
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

seeMoreButton.addEventListener('click', () => {
    isDensityProgressExpanded = !isDensityProgressExpanded;
    densityProgress.classList.toggle('expanded', isDensityProgressExpanded);
    seeMoreButton.classList.toggle('expanded', isDensityProgressExpanded);
    seeMoreButton.innerHTML = isDensityProgressExpanded ? `See less <img src="./assets/images/uparrow.png" alt="uparrow" class="downarrow" srcset="">` : `See more<img src="./assets/images/downarrow.png" alt="downarrow" class="downarrow" srcset="">`;
    analyzeText();
})

//write your functions
function toggleTheme() {
    if(document.body.classList.contains('light-theme')) {
        document.body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark');
        sunIcon.style.display = 'flex';
        moonIcon.style.display = 'none';
        textInput.style.backgroundColor = '#2A2B37';
        textInput.style.color = '#E4E4EF';
        myBar.style.backgroundColor = '#21222C';

    } else {
        document.body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'flex';
        textInput.style.backgroundColor = '#F2F2F7';
        textInput.style.color = '#2A2B37';
        spaceIndicator.style.color = '#FF4C4C !important';
        myBar.style.backgroundColor = '#F2F2F7';
    }
}


function analyzeText() {
    const text = textInput.value;
    

    //Character count
    let characters;

    if(excludeSpaces) {
        characters = text.replace(/\s/g, '').length; //using regular expression to remove all white spaces
    }else{
        characters = text.length;
    }

    countCharacter.textContent = characters.toString().padStart(2,0);

    //Word count
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    countWord.textContent = words.toString().padStart(2,0);

    //sentence count
    const sentences = text.trim() ?  text.split(/[.!?}]+/).filter(sentence => sentence.trim().length > 0).length : 0;
    countSentence.textContent = sentences.toString().padStart(2,0);

    //Reading time: average reading speed time is 200 words per minute
    const wordsPerMinute = 200;
    const estimatedReadingTime = Math.ceil(words / wordsPerMinute) || 0;
    if(isNaN(estimatedReadingTime) || estimatedReadingTime < 1 && words > 0) {
        readingTime.textContent = `&lt; 1minute`;
    }else {
        readingTime.textContent = `${estimatedReadingTime} minute${estimatedReadingTime !== 1 ? 's' : ''}`;
    }
    
    //Character limit check
    if(isLimitSet && characters > maxCharater) {
        errorMessage.classList.remove('hidden');
        textInput.style.borderColor = 'var(--error-color)'
    } else{
        errorMessage.classList.add('hidden');
        textInput.style.borderColor = '';
    }

    analyzeLetterDensity(text);
    toggleTheme();
}

function updateLimitDisplay(){
    limitDisplay.textContent = maxCharater;
}

function analyzeLetterDensity(text) {
    //skip if text is empty
    if(!text.trim()) {
        densityProgress.innerHTML = `
        <div class=density-progress>
            <span>No characters found. Start typing to see letter density</span>
        </div>
        `;
        seeMoreButton.style.display = 'none';
        densityProgress.classList.remove('seeMoreButton');
        return;
    }

    //count letter frequencies
    const letterCount = {};
    const letters = text.toLowerCase().match(/[a-z]/g) || [];
    let totalLetters = letters.length;

    if(totalLetters === 0) {
        densityProgress.innerHTML = `
        <div class=density-progress>
            <span>No characters found. Start typing to see letter density</span>
        </div>
         `;
        seeMoreButton.style.display = 'none';
        densityProgress.classList.remove(seeMoreButton);
        return;
    } else {
        letters.forEach(letter => {
            letterCount[letter] = (letterCount[letter] || 0) + 1;
        });
    
        //sort letter frequency
        if(isDensityProgressExpanded) {
            const sortLettersCount = Object.entries(letterCount)
        .sort((a,b) => b[1] - a[1]);
        
        //display density progress
        densityProgress.innerHTML = '';
        sortLettersCount.forEach(([letter,count]) => {
            const percentage = ((count/totalLetters) * 100).toFixed(2);
    
            const letterProgressElement = document.createElement('div');
            letterProgressElement.className = 'bar';
            letterProgressElement.innerHTML = `
                <span>${ letter.toUpperCase() }</span><div class="mybar" id="mybar">
                    <div class="progress-fill" style="width: ${percentage}%;"></div>
                </div><span> ${count}(${percentage}%)</span>
            `;

            densityProgress.appendChild(letterProgressElement);
        });
        seeMoreButton.style.display = 'inline-block';
        densityProgress.classList.add(seeMoreButton); 
    }

    else {
            const sortLettersCount = Object.entries(letterCount)
            .sort((a,b) => b[1] - a[1]).slice(0,5);
            //display density progress
        densityProgress.innerHTML = '';
        sortLettersCount.forEach(([letter,count]) => {
            const percentage = ((count/totalLetters) * 100).toFixed(2);
    
            const letterProgressElement = document.createElement('div');
            letterProgressElement.className = 'bar';
            letterProgressElement.innerHTML = `
                <span>${ letter.toUpperCase() }</span><div class="mybar">
                    <div class="progress-fill" style="width: ${percentage}%;"></div>
                </div><span> ${count}(${percentage}%)</span>
            `;

            densityProgress.appendChild(letterProgressElement);
        });
        seeMoreButton.style.display = 'inline-block';
        densityProgress.classList.add(seeMoreButton); 
    }
}           
}

//intialize
window.onload(analyzeText(),toggleTheme());


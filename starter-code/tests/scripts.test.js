/**
 * @jest-environment jsdom
 */

const { initApp } = require('../js/scripts');

describe('DOM interacts tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <textarea id='text-input'></textarea>
            <input type="number" id="limit-input" value="300" min="0"/>
            <input type="checkbox" id="exclude-spaces"/>
            <input type="checkbox" id="set-limit"/>
            <div id='character-count'></div>
            <div id='word-count'></div>
            <div id='sentence-count'></div>
            <div id='sun-icon'></div>
            <div id='moon-icon'></div>
            <div id='toggle-theme'></div>
            <div id='reading-time'></div>
            <div id='error-message' class='hidden'></div>
            <div id='density-progress'></div>
            <button id='seemore-button'></button>
        `;

        initApp();
        
    });
    


    test('updates character count on input', () => {
        const textInput = document.getElementById('text-input');
        const countCharacter = document.getElementById('character-count');
        const limitInput = document.getElementById('limit-input');
        
    
        textInput.value = 'Hello, you are welcome';
        limitInput.value = '20';
        textInput.dispatchEvent(new Event('input', {bubbles: true}))
        
        expect(countCharacter.textContent).toMatch(/\d+/);
    });
})

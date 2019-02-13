//Init on DOM load
document.addEventListener('DOMContentLoaded', init);

//Init app
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init typewriter
    new TypeWriter(txtElement, words, wait);
}

// Function to typewriter on mobile screen

//Es6 Class method for typewriter function

class TypeWriter {
    constructor(txtElement, words, wait = 1000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        //current index of word
        const current = this.wordIndex % this.words.length;
        //get full text of current word
        const fullTxt = this.words[current];

        //check if deleting
        if (this.isDeleting) {
            //remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            //add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        //insert the txtElement into the span element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        //Initial Type speed
        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        //check if words is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            //Make a pause
            typeSpeed = this.wait;
            //set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            //Move to next word
            this.wordIndex++;
            //Pause before Start typing
            typeSpeed = 400;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}
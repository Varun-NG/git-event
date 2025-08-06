class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.text = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        // Current word index
        const current = this.wordIndex % this.words.length;
        const fullWord = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove character
            this.text = fullWord.substring(0, this.text.length - 1);
        } else {
            // Add character
            this.text = fullWord.substring(0, this.text.length + 1);
        }

        // Insert text into element
        this.element.textContent = this.text;

        // Initial typing speed
        let typeSpeed = 150;

        if (this.isDeleting) {
            typeSpeed /= 2; // Faster deletion
        }

        // Check if word is complete
        if (!this.isDeleting && this.text === fullWord) {
            // Pause at end of word
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

class QuoteRotator {
    constructor(element, quotes, wait = 5000) {
        this.element = element;
        this.quotes = quotes;
        this.wait = wait;
        this.current = 0;
        this.rotate();
    }

    rotate() {
        this.element.style.opacity = '0';
        setTimeout(() => {
            this.element.textContent = this.quotes[this.current];
            this.element.style.opacity = '1';
            this.current = (this.current + 1) % this.quotes.length;
        }, 500);
        setTimeout(() => this.rotate(), this.wait);
    }
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Initialize header typing effect
    const element = document.getElementById('typing-text');
    const words = [
        'ECE Student',
        'Web Developer',
        'AI Enthusiast'
    ];
    new TypeWriter(element, words);

    // Initialize about section intro
    const aboutIntro = document.getElementById('about-intro');
    aboutIntro.textContent = "Hi, I'm Alex, a 3rd Year ECE student passionate about AI and Web Dev.";

    // Initialize quote rotator
    const quoteElement = document.getElementById('rotating-quote');
    const quotes = [
        '"The only way to do great work is to love what you do." - Steve Jobs',
        '"Innovation distinguishes between a leader and a follower." - Steve Jobs',
        '"Learning never exhausts the mind." - Leonardo da Vinci'
    ];
    new QuoteRotator(quoteElement, quotes);

    // Skills section scroll animation
    const skillElements = document.querySelectorAll('.skills-section .animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, idx * 120); // staggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    skillElements.forEach(el => observer.observe(el));
}
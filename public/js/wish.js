function typeTextFade(elementId, text, delay, callback) {
    const element = document.getElementById(elementId);
    let i = 0;

    function typing() {
        if (i < text.length) {
            const span = document.createElement('span');
            span.textContent = text[i];
            element.appendChild(span);

            i++;
            setTimeout(typing, delay);
        } else if (callback) {
            setTimeout(callback, 500);
        }
    }

    typing();
}

const naam = document.querySelector(".naam");
const paragraph = document.querySelector(".paragraph");
const image = document.querySelector(".image");

// Initial state
naam.style.opacity = 1;
image.style.opacity = 0;
paragraph.style.opacity = 0;

function startLoop() {
    // Show naam
    naam.style.opacity = 1;
    image.style.opacity = 0;
    paragraph.style.opacity = 0;

    // After 8s → show image
    setTimeout(() => {
        naam.style.opacity = 0;
        image.style.opacity = 1;
        paragraph.style.opacity = 0;
    }, 8000);

    // After 12s → show paragraph
    setTimeout(() => {
        naam.style.opacity = 0;
        image.style.opacity = 0;
        paragraph.style.opacity = 1;
    }, 12000);

    // After 18s → restart loop
    setTimeout(() => {
        startLoop();
    }, 18000); 
}

const start = document.querySelector("#start");
const container = document.querySelector(".container");
const music = document.getElementById("bg-music");

start.addEventListener("click", () => {
    music.play();
    document.querySelector(".start-btn").style.display = "none";
    container.style.display = "block";

    // Start typing "Happy" then "Birthday"
    typeTextFade('happy', 'Happy', 480, () => {
        typeTextFade('birthday', 'Birthday', 480);
    });

    // Start the sequence
    startLoop();
});

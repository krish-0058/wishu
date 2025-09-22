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
            setTimeout(callback, 200); // small delay before next word
        }
    }

    typing();
}

// Animate each word sequentially
typeTextFade('create', 'Create', 100, () => {
    typeTextFade('your', 'your', 100, () => {
        typeTextFade('birthday', 'Birthday', 100, () => {
            typeTextFade('card', 'Card', 100);
        });
    });
});

const profilePic = document.getElementById("profilePic");
const inputPic = document.getElementById("photo");

inputPic.onchange = function () {
    profilePic.src = URL.createObjectURL(inputPic.files[0]);
};

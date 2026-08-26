const paletteContainer = document.querySelector(".palette-container");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.querySelectorAll(".copy-btn");

generateBtn.addEventListener("click", generatePalette);
paletteContainer.addEventListener("click", copyColor);

function generatePalette() {
    const colors = [];
    for (let i = 0; i < 5; i++) {
        const color = getRandomColor();
        colors.push(color);
    }
    displayPalette(colors);
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for( let i = 0; i < 6; i++){
        color+= letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function displayPalette(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorCode = box.querySelector(".color-code");
        const colorElement = box.querySelector(".color");

        colorCode.textContent = color;
        colorElement.style.backgroundColor = color;
    });
}

function copyColor(e) {
    const target = e.target;

    if (target.classList.contains("copy-btn")) {

        const colorCode = target.previousElementSibling.textContent;

        navigator.clipboard.writeText(colorCode)
            .then(() => {
                showCopyMessage(target);
            })
            .catch(err => {
                console.error("Failed to copy color code:", err);
            });

    } else if (target.classList.contains("color-code")) {

        const colorCode = target.textContent;


        navigator.clipboard.writeText(colorCode)
            .then(() => {
                showCopyMessage(target.nextElementSibling.querySelector(".copy-btn"));
            })
            .catch(err => {
                console.error("Failed to copy color code:", err);
            });
    }
}

function showCopyMessage(copyBtn) {

    copyBtn.classList.remove("fas", "fa-copy");
    copyBtn.classList.add("fas", "fa-check");

    setTimeout(() => {
        copyBtn.classList.remove("fas", "fa-check");
        copyBtn.classList.add("fas", "fa-copy");
    }, 1000);
}


generatePalette();
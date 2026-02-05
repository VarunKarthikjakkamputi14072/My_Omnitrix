const coreBtn = document.getElementById('coreButton');
const coreDisplay = document.getElementById('coreDisplay');
const resetBtn = document.getElementById('resetBtn');
const body = document.body;
const statusText = document.getElementById('systemStatus');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const wave = document.getElementById('energyWave');

let currentIdx = 0;
let isDialActive = false; 
const sectionIcons = ["🧬", "🎓", "💼", "🚀", "🛠️"];
const sectionIds = ['about', 'education', 'experience', 'projects', 'skills'];

// Handle Main Core Clicks
coreBtn.onclick = () => {
    if (!isDialActive) {
        isDialActive = true;
        body.classList.add('dial-active');
        triggerFlash();
        updateInsignia(0);
        statusText.innerText = "SELECT DATAMODULE";
        statusText.classList.add('alert-red');
    } else if (!body.classList.contains('transformed')) {
        triggerTransformation();
    }
};

function triggerFlash() {
    coreBtn.classList.remove('selection-pulse');
    void coreBtn.offsetWidth; 
    coreBtn.classList.add('selection-pulse');
}

function triggerTransformation() {
    wave.classList.add('wave-active');
    body.style.backgroundColor = "rgba(0, 255, 136, 0.3)";

    setTimeout(() => {
        body.style.backgroundColor = ""; 
        body.classList.add('transformed');
        wave.classList.remove('wave-active');
        statusText.innerText = "LINK ESTABLISHED";
        statusText.classList.remove('alert-red');
        scrollToSec(sectionIds[currentIdx]);
    }, 600);
}

function updateInsignia(idx) {
    currentIdx = idx;
    coreDisplay.innerHTML = sectionIcons[idx];
    coreDisplay.style.fontSize = "5rem";
    
    // Smooth dial rotation logic
    coreBtn.style.transform = `rotate(${idx * 72}deg)`;
    triggerFlash();
    
    if (body.classList.contains('transformed')) {
        scrollToSec(sectionIds[idx]);
    }
}

function scrollToSec(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

nextBtn.onclick = (e) => {
    e.stopPropagation();
    let next = (currentIdx + 1) % sectionIcons.length;
    updateInsignia(next);
};

prevBtn.onclick = (e) => {
    e.stopPropagation();
    let prev = (currentIdx - 1 + sectionIcons.length) % sectionIcons.length;
    updateInsignia(prev);
};

resetBtn.onclick = () => {
    body.classList.remove('transformed', 'dial-active');
    isDialActive = false;
    coreDisplay.innerHTML = "VJK";
    coreDisplay.style.fontSize = "2.8rem";
    coreBtn.style.transform = "rotate(0deg)";
    statusText.innerText = "SYSTEM READY: TAP CORE";
    statusText.classList.remove('alert-red');
    window.scrollTo({top: 0, behavior: 'smooth'});
};

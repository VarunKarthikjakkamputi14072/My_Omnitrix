const coreBtn = document.getElementById('coreButton');
const coreDisplay = document.getElementById('coreDisplay');
const alienLabel = document.getElementById('alienLabel');
const resetBtn = document.getElementById('resetBtn');
const body = document.body;
const mainPanel = document.getElementById('mainPanel');
const sections = document.querySelectorAll('.stream-card');
const rackBtns = document.querySelectorAll('.rack-btn');
const systemStatus = document.getElementById('systemStatus');

let currentIdx = 0;
let isDialActive = false; 
let isAutoScrolling = false;

const alienData = [
    { icon: "👤", name: "About Me", id: "about" },
    { icon: "🎓", name: "Education", id: "education" },
    { icon: "⚙️", name: "Work", id: "experience" },
    { icon: "🚀", name: "Projects", id: "projects" },
    { icon: "⚡", name: "Skills", id: "skills" }
];

coreBtn.onclick = () => {
    if (!isDialActive) {
        isDialActive = true;
        body.classList.add('dial-active'); 
        updateUI(0);
        systemStatus.innerText = "SELECT MODULE";
    } else if (!body.classList.contains('transformed')) {
        body.classList.add('transformed');
        systemStatus.innerText = "SYSTEM ACTIVE";
        scrollToSection(alienData[currentIdx].id);
    }
};

resetBtn.onclick = (e) => {
    e.stopPropagation();
    body.classList.remove('transformed', 'dial-active');
    isDialActive = false;
    coreDisplay.innerHTML = "VJK";
    alienLabel.innerText = "";
    systemStatus.innerText = "SYSTEM READY: TAP CORE";
    mainPanel.scrollTop = 0;
};

function updateUI(idx) {
    currentIdx = idx;
    coreDisplay.innerHTML = alienData[idx].icon;
    alienLabel.innerText = alienData[idx].name;
    const rot = idx * 72;
    coreBtn.style.transform = `rotate(${rot}deg)`;
    coreDisplay.style.transform = `rotate(${-rot}deg)`;
    
    if (body.classList.contains('transformed')) {
        scrollToSection(alienData[idx].id);
    }
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        isAutoScrolling = true;
        el.scrollIntoView({ behavior: 'smooth' });
        // Release the scroll lock after animation finishes
        setTimeout(() => { isAutoScrolling = false; }, 800);
    }
}

// ROLLING SYNC FUNCTIONALITY
mainPanel.onscroll = () => {
    if (!body.classList.contains('transformed') || isAutoScrolling) return;

    sections.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect();
        // Trigger point: when section is in the top 30% of the window
        if (rect.top >= -100 && rect.top <= 300) {
            if (currentIdx !== i) {
                currentIdx = i;
                coreDisplay.innerHTML = alienData[i].icon;
                alienLabel.innerText = alienData[i].name;
                const rot = i * 72;
                coreBtn.style.transform = `rotate(${rot}deg)`;
                coreDisplay.style.transform = `rotate(${-rot}deg)`;
                
                // Sync Top Nav buttons
                rackBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-sec') === sec.id);
                });
            }
        }
    });
};

document.getElementById('nextBtn').onclick = () => updateUI((currentIdx + 1) % 5);
document.getElementById('prevBtn').onclick = () => updateUI((currentIdx + 4) % 5);

rackBtns.forEach(btn => {
    btn.onclick = () => scrollToSection(btn.getAttribute('data-sec'));
});

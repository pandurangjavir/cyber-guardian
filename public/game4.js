const challenges = [
    { // Gate 1
        question: "The Dark Lord's email says: 'Transfer 100 shadow coins to this address immediately!' The signature looks suspicious...",
        options: [
            "Transfer the coins - the Dark Lord demands it!",
            "Verify the request through secure channels",
            "Forward it to the crypt keeper"
        ],
        correct: 1,
        damage: 20,
        successImg: "🛡️",
        failImg: "💸"
    },
    { // Gate 2
        question: "A pop-up warns: 'YOUR KEEP IS INFECTED WITH WRAITHS! CLICK TO CLEANSE!'",
        options: [
            "Click immediately - wraiths are dangerous!",
            "Close and run a trusted scan",
            "Call the number provided"
        ],
        correct: 1,
        damage: 15,
        successImg: "🔮",
        failImg: "👻"
    },
    { // Gate 3
        question: "A messenger delivers 'Dark_Proclamation.exe' claiming it's urgent...",
        options: [
            "Run the file - it might be important",
            "Scan with necromantic protections first",
            "Burn it with dragon fire"
        ],
        correct: 1,
        damage: 25,
        successImg: "📜",
        failImg: "💀"
    },
    { // Gate 4
        question: "The haunted tavern's free spectral WiFi asks for your dark password...",
        options: [
            "Enter your main fortress password",
            "Use your shadow VPN instead",
            "Give a fake password"
        ],
        correct: 1,
        damage: 20,
        successImg: "🌐",
        failImg: "👁️"
    },
    { // Gate 5
        question: "A raven delivers: 'Your cursed package is held! Click talon to track!'",
        options: [
            "Click the talon link",
            "Visit the underworld post directly",
            "Send your wraith to investigate"
        ],
        correct: 1,
        damage: 15,
        successImg: "📦",
        failImg: "🕵️"
    },
    { // Gate 6
        question: "'Shadow Keep Cleaner' requests full access to your dark domain...",
        options: [
            "Grant all permissions - cleanliness is key",
            "Only allow necessary access",
            "Banish it to the void"
        ],
        correct: 1,
        damage: 20,
        successImg: "🧹",
        failImg: "👀"
    },
    { // Gate 7
        question: "You receive an unexpected password reset from the Underworld Bank...",
        options: [
            "Click 'Not me' in the message",
            "Visit the bank's portal directly",
            "Ignore it - probably a trick"
        ],
        correct: 1,
        damage: 25,
        successImg: "🏦",
        failImg: "🔑"
    },
    { // Gate 8
        question: "You find a 'Top Secret - Doom Plans' USB in the dungeon...",
        options: [
            "Plug it into your main terminal",
            "Give it to the dark guards",
            "Toss it in the lava pit"
        ],
        correct: 1,
        damage: 30,
        successImg: "💂‍♂️",
        failImg: "💻"
    },
    { // Gate 9
        question: "Your dark calculator app update wants camera and location access...",
        options: [
            "Allow all permissions - updates are vital",
            "Only enable calculator functions",
            "Use abacus magic instead"
        ],
        correct: 1,
        damage: 15,
        successImg: "🧮",
        failImg: "📍"
    },
    { // Gate 10
        question: "The 'IT Lich' requests your password via ghostly messenger...",
        options: [
            "Send your password immediately",
            "Contact the IT Lich directly",
            "Change your password to be safe"
        ],
        correct: 1,
        damage: 35,
        successImg: "🧙‍♂️",
        failImg: "📨"
    },
    { // Gate 11
        question: "A dark quiz asks: 'First undead pet's name and mother's crypt name?'",
        options: [
            "Answer truthfully - it's just fun",
            "Make up spooky answers",
            "Never share security answers"
        ],
        correct: 2,
        damage: 20,
        successImg: "🤫",
        failImg: "🗝️"
    },
    { // Gate 12
        question: "Installing new dark software offers 'Bonus Soul Stones'...",
        options: [
            "Accept all bonus offers",
            "Custom install and decline extras",
            "Stick with ancient scrolls"
        ],
        correct: 1,
        damage: 15,
        successImg: "💎",
        failImg: "👹"
    },
    { // Gate 13
        question: "The dungeon chef needs your login to order more cursed ingredients...",
        options: [
            "Share your credentials",
            "Use the shared dark pantry account",
            "Order them yourself later"
        ],
        correct: 1,
        damage: 30,
        successImg: "🍖",
        failImg: "🍽️"
    },
    { // Gate 14
        question: "The magic mirror demands WiFi password for 'security upgrades'...",
        options: [
            "Give it the main password",
            "Create a separate mirror network",
            "Ask it to show you first"
        ],
        correct: 1,
        damage: 25,
        successImg: "🪞",
        failImg: "👁️"
    },
    { // Gate 15
        question: "A spectral voice says: 'Your keep has ghosts! Let us possess your defenses!'",
        options: [
            "Allow possession - ghosts are scary!",
            "Banish the spirit and call dark IT",
            "Activate anti-ghost runes"
        ],
        correct: 1,
        damage: 40,
        successImg: "🏰",
        failImg: "👻"
    }
];

let currentGate = 0;
let health = 100;
let gatesCompleted = 0;
let damageTaken = 0;

document.addEventListener('DOMContentLoaded', () => {
    updateGateDisplay();
    startChallenge(currentGate);
    
    document.getElementById('hero').addEventListener('click', () => {
        document.getElementById('hero').classList.add('jump');
        setTimeout(() => {
            document.getElementById('hero').classList.remove('jump');
        }, 500);
    });
    
    document.getElementById('villain').addEventListener('click', () => {
        document.getElementById('villain').classList.add('shake');
        setTimeout(() => {
            document.getElementById('villain').classList.remove('shake');
        }, 500);
    });
});

function startChallenge(gateNumber) {
    const challenge = challenges[gateNumber];
    document.getElementById('scenario-text').textContent = challenge.question;
    document.getElementById('current-gate').textContent = gateNumber + 1;
    
    document.querySelectorAll('.gate').forEach(gate => {
        gate.classList.remove('active');
        if(parseInt(gate.textContent) === gateNumber + 1) {
            gate.classList.add('active');
        }
    });
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    
    challenge.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = `${index + 1}. ${option}`;
        button.onclick = () => handleAnswer(index, challenge.correct, challenge.damage, challenge.successImg, challenge.failImg);
        optionsDiv.appendChild(button);
    });
    
    updateGateDisplay();
    
    document.getElementById('hero').classList.add('blink');
    setTimeout(() => {
        document.getElementById('hero').classList.remove('blink');
    }, 300);
}

function handleAnswer(selected, correct, damage, successImg, failImg) {
    const options = document.querySelectorAll('.option-btn');
    const hero = document.getElementById('hero');
    const villain = document.getElementById('villain');
    
    options.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    if(selected !== correct) {
        health -= damage;
        damageTaken += damage;
        document.getElementById('health').style.width = `${health}%`;
        options[selected].classList.add('incorrect');
        
        hero.classList.add('hurt');
        villain.classList.add('laugh');
        
        const speechBubble = document.getElementById('speech-bubble');
        speechBubble.textContent = failImg;
        speechBubble.style.fontSize = '3rem';
        speechBubble.style.textAlign = 'center';
        
        setTimeout(() => {
            speechBubble.textContent = challenges[currentGate].question;
            speechBubble.style.fontSize = '';
            speechBubble.style.textAlign = '';
        }, 1000);
    } else {
        gatesCompleted++;
        options[correct].classList.add('correct');
        
        hero.classList.add('celebrate');
        villain.classList.add('hit');
        
        const speechBubble = document.getElementById('speech-bubble');
        speechBubble.textContent = successImg;
        speechBubble.style.fontSize = '3rem';
        speechBubble.style.textAlign = 'center';
        
        setTimeout(() => {
            speechBubble.textContent = challenges[currentGate].question;
            speechBubble.style.fontSize = '';
            speechBubble.style.textAlign = '';
        }, 1000);
    }
    
    setTimeout(() => {
        hero.className = 'hero';
        villain.className = 'villain';
    }, 1000);
    
    setTimeout(() => {
        if(health <= 0) {
            showResult("FORTRESS BREACHED!", "☠️", `You fell at Gate ${currentGate + 1}!\nThe invaders caused ${damageTaken}% damage!`);
            return;
        }

        if(currentGate >= challenges.length - 1) {
            showResult("VICTORY!", "🏆", `You secured all ${gatesCompleted} gates!\nWith ${health}% health remaining!`);
            return;
        }

        currentGate++;
        animateNextGate();
    }, 1500);
}

function animateNextGate() {
    const currentGateElement = document.getElementById(`gate${currentGate}`);
    if(currentGateElement) {
        currentGateElement.classList.remove('active');
        currentGateElement.classList.add('breached');
    }
    
    startChallenge(currentGate);
}

function showResult(title, emoji, stats) {
    const resultScreen = document.getElementById('result');
    document.getElementById('result-text').textContent = title;
    document.getElementById('result-image').textContent = emoji;
    document.getElementById('result-stats').textContent = stats;
    
    if(health <= 0) {
        resultScreen.classList.add('failure');
    } else {
        resultScreen.classList.add('success');
    }
    
    resultScreen.classList.remove('hidden');
}

function resetGame() {
    currentGate = 0;
    health = 100;
    gatesCompleted = 0;
    damageTaken = 0;
    
    document.getElementById('health').style.width = "100%";
    document.getElementById('result').classList.add('hidden');
    document.getElementById('result').className = 'result-overlay';
    
    document.querySelectorAll('.gate').forEach(gate => {
        gate.className = 'gate';
        if(parseInt(gate.textContent) === 1) {
            gate.classList.add('active');
        }
    });
    
    updateGateDisplay();
    startChallenge(currentGate);
}

function updateGateDisplay() {
    document.getElementById('gate-counter').textContent = `${currentGate + 1}/${challenges.length}`;
}

const style = document.createElement('style');
style.textContent = `
    .jump {
        animation: jump 0.5s;
    }
    
    @keyframes jump {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-30px); }
    }
    
    .shake {
        animation: shake 0.5s;
    }
    
    .blink .eye {
        animation: blink 0.3s;
    }
    
    @keyframes blink {
        0%, 100% { height: 20px; }
        50% { height: 5px; }
    }
    
    .hurt {
        animation: hurt 0.5s;
    }
    
    @keyframes hurt {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-20px); }
        75% { transform: translateX(20px); }
    }
    
    .laugh .evil {
        animation: laugh 0.5s;
    }
    
    @keyframes laugh {
        0%, 100% { height: 20px; }
        50% { height: 30px; width: 30px; }
    }
    
    .celebrate {
        animation: celebrate 0.5s;
    }
    
    @keyframes celebrate {
        0%, 100% { transform: rotate(0); }
        25% { transform: rotate(15deg); }
        75% { transform: rotate(-15deg); }
    }
    
    .hit {
        animation: hit 0.5s;
    }
    
    @keyframes hit {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(30px); }
    }
    
    .failure .result-content {
        border-color: var(--secondary);
        background-color: #2a1a1a;
    }
    
    .success .result-content {
        border-color: var(--health);
        background-color: #1a2a1a;
    }
`;
document.head.appendChild(style);
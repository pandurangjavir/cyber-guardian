const questions = [
    {
        question: "Which password is the strongest?",
        options: ["password123", "Winter2023!", "P@ssw0rd#2024", "12345678"],
        correct: 2,
        learning: "Strong passwords combine uppercase, lowercase, numbers, and special characters."
    },
    {
        question: "What should you do if you receive a suspicious email?",
        options: ["Click links to verify", "Delete immediately", "Forward to friends", "Reply with personal info"],
        correct: 1,
        learning: "Never interact with suspicious emails - delete them immediately."
    },
    {
        question: "What is two-factor authentication?",
        options: ["A type of password", "An extra security layer", "A virus scanner", "A network protocol"],
        correct: 1,
        learning: "2FA adds an extra verification step beyond just a password."
    },
    {
        question: "Which of these is a phishing attack?",
        options: ["A fake website", "A strong password", "A firewall", "A VPN"],
        correct: 0,
        learning: "Phishing attacks use fake websites or emails to steal information."
    },
    {
        question: "What does HTTPS stand for?",
        options: ["HyperText Transfer Protocol Secure", "HyperText Transfer Protocol Standard", "HyperText Transfer Protocol System", "HyperText Transfer Protocol Service"],
        correct: 0,
        learning: "HTTPS ensures secure communication over the internet."
    },
    {
        question: "What is a VPN used for?",
        options: ["To hide your IP address", "To increase internet speed", "To block ads", "To scan for viruses"],
        correct: 0,
        learning: "A VPN encrypts your connection and hides your IP address."
    },
    {
        question: "What is malware?",
        options: ["A type of hardware", "A security protocol", "Malicious software", "A type of firewall"],
        correct: 2,
        learning: "Malware is malicious software designed to harm or exploit devices."
    },
    {
        question: "What is the purpose of a firewall?",
        options: ["To block unauthorized access", "To speed up your internet", "To store passwords", "To encrypt emails"],
        correct: 0,
        learning: "A firewall monitors and controls incoming and outgoing network traffic."
    },
    {
        question: "What is a brute force attack?",
        options: ["Guessing passwords repeatedly", "Sending phishing emails", "Creating fake websites", "Stealing hardware"],
        correct: 0,
        learning: "Brute force attacks try every possible password combination."
    },
    {
        question: "What is social engineering?",
        options: ["A type of hardware", "Manipulating people to gain access", "A type of malware", "A network protocol"],
        correct: 1,
        learning: "Social engineering tricks people into revealing sensitive information."
    },
    {
        question: "What is the best way to secure your Wi-Fi?",
        options: ["Use WPA3 encryption", "Use no password", "Use WEP encryption", "Share your password publicly"],
        correct: 0,
        learning: "WPA3 is the most secure Wi-Fi encryption standard."
    },
    {
        question: "What is a data breach?",
        options: ["A type of malware", "Unauthorized access to sensitive data", "A strong password", "A type of firewall"],
        correct: 1,
        learning: "A data breach occurs when sensitive data is accessed without authorization."
    },
    {
        question: "What is ransomware?",
        options: ["A type of firewall", "Malware that encrypts files for ransom", "A type of VPN", "A phishing attack"],
        correct: 1,
        learning: "Ransomware locks your files and demands payment to unlock them."
    },
    {
        question: "What is the purpose of a password manager?",
        options: ["To store and generate strong passwords", "To block malware", "To encrypt emails", "To hide your IP address"],
        correct: 0,
        learning: "Password managers securely store and generate strong passwords."
    },
    {
        question: "What is a zero-day vulnerability?",
        options: ["A known and patched vulnerability", "A vulnerability unknown to the vendor", "A type of malware", "A phishing attack"],
        correct: 1,
        learning: "Zero-day vulnerabilities are unknown to the vendor and have no patch."
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let userAnswers = [];

function startQuiz() {
    document.querySelector('.instruction-screen').classList.remove('active');
    document.querySelector('.quiz-screen').classList.add('active');
    userAnswers = [];
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('questionNumber').textContent = `Q${currentQuestion + 1}`;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('score').textContent = `Score: ${score}`;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option-item';
        optionElement.innerHTML = `
            <span class="option-letter">${String.fromCharCode(65 + index)})</span>
            ${option}
        `;
        optionElement.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionElement);
    });
}

function selectAnswer(selectedIndex) {
    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option-item');
    let isCorrect = selectedIndex === question.correct;
    
    userAnswers.push(isCorrect);
    
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if(index === question.correct) {
            option.style.background = 'rgba(0, 184, 148, 0.2)';
            option.style.borderColor = '#00b894';
        } else if(index === selectedIndex) {
            option.style.background = 'rgba(255, 71, 87, 0.2)';
            option.style.borderColor = '#ff4757';
        }
    });

    if(isCorrect) {
        score += 10;
        document.getElementById('score').textContent = `Score: ${score}`;
    }

    setTimeout(() => {
        currentQuestion++;
        if(currentQuestion < questions.length) {
            resetTimer();
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timerBar').style.width = `${(timeLeft/30)*100}%`;
        
        if(timeLeft <= 0) {
            clearInterval(timer);
            userAnswers.push(false); // Mark as incorrect
            currentQuestion++;
            if(currentQuestion < questions.length) {
                resetTimer();
                loadQuestion();
            } else {
                showResults();
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById('timerBar').style.width = '100%';
    startTimer();
}

function showResults() {
    clearInterval(timer);
    document.querySelector('.quiz-screen').classList.remove('active');
    document.querySelector('.result-screen').classList.add('active');
    
    const correctCount = userAnswers.filter(answer => answer).length;
    const incorrectCount = questions.length - correctCount;
    
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('incorrectAnswers').textContent = incorrectCount;
    document.getElementById('totalScore').textContent = correctCount * 10;
    
    const learningsList = document.getElementById('learningsList');
    learningsList.innerHTML = '';
    questions.forEach((q, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="q-number">Q${index + 1}:</span> ${q.learning}`;
        li.classList.add(userAnswers[index] ? 'correct-learning' : 'incorrect-learning');
        learningsList.appendChild(li);
    });
}
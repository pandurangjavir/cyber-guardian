class PasswordCitadel {
    constructor() {
        this.level = 1;
        this.password = "password";
        this.strength = 10;
        this.integrity = 100;
        this.attackers = [];
        this.learnings = new Set();
        
        this.modifiers = document.querySelectorAll('.mod-card');
        this.init();
    }

    init() {
        this.modifiers.forEach(mod => 
            mod.addEventListener('click', () => this.upgradePassword(mod.dataset.mod)));
        
        document.getElementById('reboot-btn').addEventListener('click', () => location.reload());
        document.getElementById('back-btn').addEventListener('click', () => 
            window.location.href = 'index.html');
        
        this.updateDisplay();
        this.startWave();
    }

    upgradePassword(type) {
        const transformations = {
            length: () => this.password += this.randomChar(),
            uppercase: () => this.password = this.password.replace(/[a-z]/,
                c => Math.random() > 0.5 ? c.toUpperCase() : c),
            numbers: () => this.password = this.password.replace(/[a-z]/i,
                () => Math.floor(Math.random() * 10)),
            symbols: () => this.password = this.password.replace(/[a-z]/i,
                () => '!@#$%^&*'[Math.floor(Math.random() * 8)])
        };
        
        transformations[type]();
        this.calculateStrength();
        this.updateDisplay();
        this.addLearning(type);
        this.playSound('click');
    }

    calculateStrength() {
        const strengthFactors = {
            length: Math.min(this.password.length / 12, 1),
            uppercase: (this.password.match(/[A-Z]/g) || []).length / 3,
            numbers: (this.password.match(/[0-9]/g) || []).length / 2,
            symbols: (this.password.match(/[^A-Za-z0-9]/g) || []).length
        };
        
        this.strength = Object.values(strengthFactors).reduce((a,b) => a + b) * 25;
        document.documentElement.style.setProperty('--strength', `${this.strength}%`);
    }

    startWave() {
        this.attackInterval = setInterval(() => {
            if(this.integrity <= 0) this.gameOver();
            
            this.spawnAttacker();
            this.damageCalculation();
            this.updateDisplay();
        }, 2000 - (this.level * 100));
    }

    spawnAttacker() {
        const bot = document.createElement('div');
        bot.className = 'hacker-bot';
        bot.style.top = `${Math.random() * 250}px`;
        bot.style.setProperty('--hue', Math.random() * 360);
        document.getElementById('attack-wave').appendChild(bot);
        
        setTimeout(() => bot.remove(), 5000);
        this.playSound('attack');
    }

    damageCalculation() {
        const baseDamage = 10;
        let damage = baseDamage - (this.strength / 10);
        
        if(this.strength > 75) {
            damage = -5;
            this.showEffect('repair');
        }
        
        this.integrity = Math.min(Math.max(this.integrity - damage, 0), 150);
        this.integrity = Math.round(this.integrity * 10) / 10;
        
        if(damage > 0) {
            this.showEffect('damage');
        }
    }

    showEffect(type) {
        const vault = document.getElementById('vault');
        vault.classList.remove('damage-effect', 'repair-effect');
        
        if(type === 'damage') {
            vault.classList.add('damage-effect');
            this.playSound('attack');
        } 
        else if(type === 'repair') {
            vault.classList.add('repair-effect');
            this.playSound('repair');
        }
        
        this.createParticles(type === 'repair' ? '🛡️' : '💥');
    }

    createParticles(emoji) {
        const particles = document.createElement('div');
        particles.className = 'particles';
        
        for(let i = 0; i < 10; i++) {
            const particle = document.createElement('span');
            particle.textContent = emoji;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 0.5 + 's';
            particles.appendChild(particle);
        }
        
        document.body.appendChild(particles);
        setTimeout(() => particles.remove(), 1000);
    }

    updateDisplay() {
        document.getElementById('password-display').textContent = this.password;
        document.getElementById('integrity').textContent = 
            `${Math.round(this.integrity)}%`;
        document.getElementById('level').textContent = this.level;
    }

    addLearning(type) {
        const lessons = {
            length: "Longer passwords are harder to crack",
            uppercase: "Mix uppercase letters for complexity",
            numbers: "Numbers increase possible combinations",
            symbols: "Special characters boost security"
        };
        this.learnings.add(lessons[type]);
    }

    gameOver() {
        clearInterval(this.attackInterval);
        document.getElementById('final-level').textContent = this.level;
        document.getElementById('learnings-list').innerHTML = 
            [...this.learnings].map(l => `<li>${l}</li>`).join('');
        document.getElementById('result-screen').classList.remove('hidden');
        this.playSound('game-over');
    }

    playSound(type) {
        const sound = document.getElementById(`${type}-sound`);
        if(sound) {
            sound.currentTime = 0;
            sound.play();
        }
    }
}

// Start game
new PasswordCitadel();
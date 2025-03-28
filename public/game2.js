const scenarios = [
    {
        from: "security@paypa1.com",
        subject: "URGENT: Account Verification Required!",
        body: "Dear user, we detected suspicious activity. Click here to verify: http://paypa1-secure.xyz",
        phish: true,
        hints: ["Misspelled domain (paypa1 instead of paypal)", "Suspicious link (http instead of https)"]
    },
    {
        from: "noreply@amazon.com",
        subject: "Your Order #12345 Has Shipped",
        body: "Track your package: https://amazon.com/tracking/12345",
        phish: false
    },
    {
        from: "support@apple-id.net",
        subject: "iCloud Lock Detected!",
        body: "Your account has been locked. Verify now: http://apple-id-restore.net",
        phish: true,
        hints: ["Fake domain (apple-id.net)", "Unsecure link (http)"]
    },
    {
        from: "Netflix <billing@netflix.com>",
        subject: "Payment Update Required",
        body: "Update your payment method: https://netflix.com/account",
        phish: false
    },
    {
        from: "security@yourbank.xyz",
        subject: "Immediate Action Required!",
        body: "Your account will be suspended. Verify now: http://yourbank-secure.xyz",
        phish: true,
        hints: ["Fake domain (yourbank.xyz)", "Urgent language to pressure you"]
    },
    {
        from: "Google <no-reply@google.com>",
        subject: "Security Alert: New Sign-In",
        body: "Was this you? Review activity: https://myaccount.google.com",
        phish: false
    },
    {
        from: "DHL <tracking@dh1-parcel.com>",
        subject: "Package Held at Customs",
        body: "Pay $5.90 to release: http://dhl-customs-payment.net",
        phish: true,
        hints: ["Fake domain (dh1 instead of dhl)", "Request for payment"]
    },
    {
        from: "Facebook <security@facebookmail.com>",
        subject: "Login Alert from New Device",
        body: "Secure your account: https://facebook.com/security",
        phish: false
    },
    {
        from: "IRS <tax-refund@irs-gov.us>",
        subject: "Tax Refund Pending",
        body: "Claim your $892 refund: http://tax-refund-claim-ir5.com",
        phish: true,
        hints: ["Fake domain (irs-gov.us)", "Too good to be true offer"]
    },
    {
        from: "WhatsApp <support@whatsapp.com>",
        subject: "Account Verification Required",
        body: "Verify now: https://whatsapp.com/verify",
        phish: false
    },
    {
        from: "eBay <security@ebay-buyer-protection.com>",
        subject: "Account Restricted",
        body: "Confirm recent purchases: http://ebay-account-recovery.xyz",
        phish: true,
        hints: ["Fake domain (ebay-buyer-protection.com)", "Suspicious link"]
    },
    {
        from: "Apple <support@appleid-apple.com.xyz>",
        subject: "Billing Update Required",
        body: "Your subscription will be canceled: http://apple-billing-update.net",
        phish: true,
        hints: ["Fake domain (appleid-apple.com.xyz)", "Urgent language"]
    },
    {
        from: "PayPal <security@paypal-secure.com.ru>",
        subject: "Limited Account Access",
        body: "Confirm recent transactions: http://paypal-confirm-transaction.xyz",
        phish: true,
        hints: ["Fake domain (paypal-secure.com.ru)", "Suspicious link"]
    },
    {
        from: "Instagram <security@instagram.com>",
        subject: "Copyright Violation",
        body: "Appeal within 24 hours: https://instagram.com/support",
        phish: false
    },
    {
        from: "UPS <tracking@ups-parcel-delivery.com>",
        subject: "Delivery Exception",
        body: "Confirm delivery address: http://ups-address-confirmation.net",
        phish: true,
        hints: ["Fake domain (ups-parcel-delivery.com)", "Suspicious link"]
    }
];

let currentScenario = 0;
let score = 0;
const MAX_SCORE = scenarios.length * 100;

document.getElementById('phish-btn').addEventListener('click', checkPhish);
document.getElementById('safe-btn').addEventListener('click', checkSafe);

function loadScenario() {
    const scenario = scenarios[currentScenario];
    document.querySelector('[data-type="sender"] .content').textContent = scenario.from;
    document.querySelector('[data-type="subject"] .content').textContent = scenario.subject;
    document.querySelector('[data-type="body"] .content').textContent = scenario.body;
    document.getElementById('hint').textContent = "";
}

function checkPhish() {
    analyzeEmail(true);
}

function checkSafe() {
    analyzeEmail(false);
}

function analyzeEmail(userChoice) {
    const isPhish = scenarios[currentScenario].phish;
    const hintElement = document.getElementById('hint');
    
    if(userChoice === isPhish) {
        score += 100;
        hintElement.innerHTML = `✅ CORRECT! ${isPhish ? 'Phishing detected!' : 'Legitimate email!'}`;
        if(scenarios[currentScenario].hints) {
            hintElement.innerHTML += `<br>🚨 ${scenarios[currentScenario].hints.join(' • ')}`;
        }
    } else {
        hintElement.textContent = `❌ WRONG! This was ${isPhish ? 'PHISHING' : 'SAFE'}`;
    }

    updateProgress();
    
    setTimeout(() => {
        currentScenario++;
        if(currentScenario < scenarios.length) {
            loadScenario();
            hintElement.textContent = '';
        } else {
            endGame();
        }
    }, 2000);
}

function updateProgress() {
    const progress = (currentScenario / scenarios.length) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;
    document.getElementById('score').textContent = 
        `🔒 SECURITY: ${Math.round((score/MAX_SCORE)*100)}%`;
}

function endGame() {
    document.querySelector('.analysis-tools').remove();
    document.getElementById('hint').innerHTML = `
        <h2>GAME OVER</h2>
        <p>Final Security Score: ${Math.round((score/MAX_SCORE)*100)}%</p>
        <p>${score >= 1200 ? '🌐 CYBERSECURITY MASTER!' : '⚠️ NEED MORE TRAINING!'}</p>
        <h3>What You Learned:</h3>
        <ul>
            <li>✅ Always check the sender's email address for misspellings</li>
            <li>✅ Look for suspicious links (http instead of https)</li>
            <li>✅ Be cautious of urgent language or too-good-to-be-true offers</li>
            <li>✅ Verify links by hovering over them before clicking</li>
            <li>✅ Legitimate companies use official domains (e.g., @paypal.com)</li>
        </ul>
    `;
}

// Initialize game
loadScenario();
document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
});
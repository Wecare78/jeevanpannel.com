// Dashboard system for transaction simulation and account management
class DashboardSystem {
    constructor() {
        this.earnings = 0;
        this.transactions = [];
        this.commissionRate = 0.039;
        this.init();
    }

    init() {
        this.checkAuth();
        this.loadData();
        this.renderDashboard();
    }

    checkAuth() {
        const user = localStorage.getItem("currentUser");
        if (!user) {
            window.location.href = "login.html";
        }
    }

    loadData() {
        const stored = localStorage.getItem("transactions");
        if (stored) {
            this.transactions = JSON.parse(stored);
            this.earnings = this.transactions.reduce((a, b) => a + b.amount, 0);
        }
    }

    saveData() {
        localStorage.setItem("transactions", JSON.stringify(this.transactions));
    }

    renderDashboard() {
        // This is now handled by main.js loadDashboardData function
    }

    logout() {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".dashboard-container") || document.querySelector(".running-panel-container")) {
        window.dashboard = new DashboardSystem();
    }
});
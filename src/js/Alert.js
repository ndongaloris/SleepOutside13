export default class Alert {
    constructor() {
        this.alerts = [];
    }

    async loadAlerts() {
        try {
          const response = await fetch("../json/alerts.json");
          const alertsData = await response.json();
          this.alerts = alertsData;
        } catch (error) {
          console.error("Error loading alerts:", error);
        }
    }

      createAlertElements() {
        const alertListSection = document.createElement("section");
        alertListSection.classList.add("alert-list");

        this.alerts.forEach(alert => {
          const alertParagraph = document.createElement("p");
          alertParagraph.textContent = alert.message;
          alertParagraph.style.background = alert.background;
          alertParagraph.style.color = alert.color;
          alertListSection.appendChild(alertParagraph);
        });

        return alertListSection;
    }

      async displayAlerts() {
        await this.loadAlerts();
        const alertListSection = this.createAlertElements();
        document.querySelector("main").prepend(alertListSection);
    }
}
// Class definition for Alert
export default class Alert {
  constructor() {
      this.alerts = [];
  }

  // Asynchronously load alerts data from JSON file
  async loadAlerts() {
      try {
          // Fetch alerts data from JSON file
          const response = await fetch("../json/alerts.json");
          // Parse JSON data
          const alertsData = await response.json();
          // Store alerts data in class property
          this.alerts = alertsData;
      } catch (error) {
          // Log error if fetching or parsing data fails
          console.error("Error loading alerts:", error);
      }
  }

  // Create HTML elements for each alert message
  createAlertElements() {
      // Create a section element to contain the alert messages
      const alertListSection = document.createElement("section");
      alertListSection.classList.add("alert-list");

      // Iterate through each alert object and create a paragraph element for each
      this.alerts.forEach(alert => {
          // Create a paragraph element for the alert message
          const alertParagraph = document.createElement("p");
          // Set the text content of the paragraph to the alert message
          alertParagraph.textContent = alert.message;
          // Apply background color and text color styles from the alert object
          alertParagraph.style.background = alert.background;
          alertParagraph.style.color = alert.color;
          // Append the paragraph element to the section
          alertListSection.appendChild(alertParagraph);
      });

      // Return the section element containing all alert messages
      return alertListSection;
  }

  // Display the alert messages on the page
  async displayAlerts() {
      // Asynchronously load alerts data
      await this.loadAlerts();
      // Create HTML elements for each alert message
      const alertListSection = this.createAlertElements();
      // Prepend the alert section to the main content of the page
      document.querySelector("main").prepend(alertListSection);
  }
}

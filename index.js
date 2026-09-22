const weatherApi = "https://api.weather.gov/alerts/active?area=";


function fetchWeatherAlerts(state) {
  return fetch(`${weatherApi}${state}`)
    .then(response => {
      if (!response.ok) throw new Error("Could not fetch weather alerts");
      return response.json();
    })
    .then(data => {
      displayAlerts(data);
    })
    .catch(error => {
      displayError(error.message);
    });
}


function displayAlerts(data) {
  const container = document.getElementById("alerts-display");
  const errorBox = document.getElementById("error-message");

 
  container.innerHTML = "";
  errorBox.textContent = "";
  errorBox.classList.add("hidden");

  const alerts = data.features;

  
  const summary = document.createElement("h2");
  summary.textContent = `There are ${alerts.length} active alerts for this state.`;
  container.appendChild(summary);

  
  alerts.forEach(alert => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    container.appendChild(p);
  });
}


function displayError(message) {
  const errorBox = document.getElementById("error-message");
  const container = document.getElementById("alerts-display");

  container.innerHTML = ""; // clear alerts
  errorBox.textContent = `Error: ${message}`;
  errorBox.classList.remove("hidden");
}


document.getElementById("fetch-alerts").addEventListener("click", () => {
  const state = document.getElementById("state-input").value.trim().toUpperCase();

  if (state.length !== 2) {
    displayError("Please enter a valid 2‑letter state abbreviation.");
    return;
  }

  fetchWeatherAlerts(state);
});

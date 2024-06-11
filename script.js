document.addEventListener("DOMContentLoaded", function () {
    const feedUrl = "https://www.weather.com.au/rss/forecast/";

    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            const data = JSON.parse(result.contents);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const items = xmlDoc.querySelectorAll("item");

            const forecastsContainer = document.getElementById("forecasts");

            items.forEach(item => {
                const title = item.querySelector("title").textContent;
                const description = item.querySelector("description").textContent;

                const forecastItem = document.createElement("div");
                forecastItem.classList.add("forecast-item");
                forecastItem.innerHTML = `<strong>${title}</strong><br>${description}`;

                forecastsContainer.appendChild(forecastItem);
            });
        })
        .catch(error => {
            console.error("Error fetching weather forecasts:", error);
        });
});

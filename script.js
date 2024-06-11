document.addEventListener("DOMContentLoaded", function () {
    const feedUrl = "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Frss.weather.com.au%2Fnsw%2Fsydney";

    fetch(feedUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            const items = result.items;

            const forecastsContainer = document.getElementById("forecasts");

            items.forEach(item => {
                const title = item.title;
                const description = item.description;

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

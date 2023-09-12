const GREEN = "#0ab264";
const BLUE = "#0095ff";
const API_URL = "http://51.16.156.1:5000/summarize";

async function summarize(url, apiKey, organizationId) {
    const requestBody = { url, apiKey, organizationId };
    return fetch(API_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });
}

const intervalFunction = () => {
    if (summarizeButton.innerText === "Loading...") {
        summarizeButton.innerText = "Loading.";
    } else {
        summarizeButton.innerText += ".";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const summarizeButton = document.getElementById("summarizeButton");
    summarizeButton.onclick = () => {
        summarizeButton.disabled = true;
        const apiKey = document.getElementById("apiKey").value;
        const organizationId = document.getElementById("organizationId").value;
        summarizeButton.innerText = "Loading.";
        const loadingInterval = setInterval(intervalFunction, 1000);
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            summarize(tabs[0].url, apiKey, organizationId).then((response) => {
                summarizeButton.disabled = false;
                clearInterval(loadingInterval);
                if (response.ok) {
                    response.json().then((json) => {
                        chrome.storage.local.set({ "data": json["data"] });
                        summarizeButton.innerText = "View";
                        summarizeButton.style.backgroundColor = GREEN;
                        summarizeButton.onclick = () => {
                            summarizeButton.innerText = "Summarize Policy";
                            summarizeButton.style.backgroundColor = BLUE;
                            chrome.tabs.create({ url: "src/results.html" });
                        }
                    })
                } else {
                    summarizeButton.innerText = "Summarize Policy";
                    response.text().then(error => alert(error));
                }
            })
        });
    };
});

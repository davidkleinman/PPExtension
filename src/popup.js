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
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 404) {
            return null;
        } else {
            throw new Error("Failed to summarize the given privacy policy")
        }
    })
    .then((data) => {
        return data ? data["data"] : null;
    });
}

async function handleSummarizedPolicy(summarizedPolicy, loadingInterval) {
    clearInterval(loadingInterval);
    if (summarizedPolicy !== null) {
        chrome.storage.local.set({ "data": summarizedPolicy });
        summarizeButton.innerText = "View";
        summarizeButton.style.backgroundColor = GREEN;
        summarizeButton.onclick = () => {
            summarizeButton.innerText = "Summarize Policy";
            summarizeButton.style.backgroundColor = BLUE;
            chrome.tabs.create({ url: "src/results.html" });
        }
    } else {
        summarizeButton.innerText = "Summarize Policy";
        alert("The webpage does not contain a privacy policy");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const summarizeButton = document.getElementById("summarizeButton");
    summarizeButton.onclick = () => {
        summarizeButton.disabled = true;
        const apiKey = document.getElementById("apiKey").value;
        const organizationId = document.getElementById("organizationId").value;
        summarizeButton.innerText = "Loading...";
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            const loadingInterval = setInterval(() => {
                if (summarizeButton.innerText === "Loading...") {
                    summarizeButton.innerText = "Loading.";
                } else {
                    summarizeButton.innerText += ".";
                }
            }, 1000);
            summarize(tabs[0].url, apiKey, organizationId)
                .then((summarizedPolicy) => {
                    summarizeButton.disabled = false;
                    handleSummarizedPolicy(summarizedPolicy, loadingInterval)
                })
                .catch((error) => {
                    summarizeButton.disabled = false;
                    clearInterval(loadingInterval);
                    summarizeButton.innerText = "Summarize Policy";
                    alert(error);
                });
        });
    };
});

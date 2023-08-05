async function summarize(url) {
    return fetch(`http://localhost:9000/summarize?url=${url}`, {method: "GET"})
        .then((response) => {return response.json()})
        .then((data) => {return data["data"]});
}

document.addEventListener("DOMContentLoaded", () => {
    const summarizeButton = document.getElementById("summarizeButton");
    summarizeButton.onclick = () => {
        summarizeButton.innerText = "Loading...";
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            summarize(tabs[0].url)
                .then((summarizedPolicy) => {
                    chrome.storage.local.set({ "data": summarizedPolicy });
                    summarizeButton.innerText = "View";
                    summarizeButton.onclick = () => {
                        summarizeButton.innerText = "Summarize Policy";
                        chrome.tabs.create({ url: "src/results.html" });
                    }
                })
                .catch((error) => {
                    summarizeButton.innerText = "Summarize Policy";
                    alert(`Failed to summarize the given privacy policy - ${error}`);
                });
        });
    };
});

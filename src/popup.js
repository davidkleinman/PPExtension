async function summarize(url) {
    return fetch(`http://localhost:9000/summarize?url=${url}`, {method: "GET"})
        .then((response) => {return response.json()})
        .then((data) => alert(data["data"]))
        .catch((e) => {alert(e)})
}

document.addEventListener("DOMContentLoaded", () => {
    const summarizeButton = document.getElementById("summarizeButton");
    summarizeButton.addEventListener("click", () => {
        summarizeButton.innerText = "Loading...";
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            await summarize(tabs[0].url);
            summarizeButton.innerText = "Summarize Policy";
        });
    });
});

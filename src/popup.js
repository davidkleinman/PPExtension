async function summarize(url) {
    return fetch(`http://localhost:9000/summarize?url=${url}`, {method: "GET"})
        .then((response) => {return response.json()})
        .then((data) => {return data["data"]})
        .catch((e) => {alert(e)})
}

document.addEventListener("DOMContentLoaded", () => {
    const summarizeButton = document.getElementById("summarizeButton");
    summarizeButton.onclick = () => {
        summarizeButton.innerText = "Loading...";
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            const summarizedPolicy = await summarize(tabs[0].url);
            chrome.storage.local.set({ "data": summarizedPolicy });
            summarizeButton.innerText = "View";
            summarizeButton.onclick = () => {
                chrome.tabs.create({ url: "src/results.html" });
            }
        });
    };
});

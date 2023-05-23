chrome.storage.local.get("data").then((result) => {
    const resultsParagraph = document.createElement("p");
    const resultsNode = document.createTextNode(result.data);
    resultsParagraph.appendChild(resultsNode);
    document.body.appendChild(resultsParagraph);
    chrome.storage.local.remove("data");
});

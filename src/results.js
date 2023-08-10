function addElementToPage(title, element) {
    const titleElement = document.createElement("h2");
    const titleNode = document.createTextNode(title);
    titleElement.appendChild(titleNode);
    document.body.appendChild(titleElement);

    const dataElement = document.createElement("p");
    const dataNode = document.createTextNode(element);
    dataElement.appendChild(dataNode);
    document.body.appendChild(dataElement);
}

chrome.storage.local.get("data").then((result) => {
    const dataArray = result.data;
    addElementToPage("What personal information is being collected?", dataArray[0]);
    addElementToPage("Why is my personal information collected?", dataArray[1]);
    addElementToPage("How is my personal information collected?", dataArray[2]);
    addElementToPage("Is my personal information shared with third parties?", dataArray[3]);
    addElementToPage("What security measures are being taken to secure my personal information?", dataArray[4]);
    addElementToPage("How long is my personal information kept?", dataArray[5]);
    addElementToPage("Can I delete stored personal information?", dataArray[6]);
    chrome.storage.local.remove("data");
});

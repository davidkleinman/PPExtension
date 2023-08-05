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
    addElementToPage("What types of personal information are collected?", dataArray[0]);
    addElementToPage("How is personal information collected from users?", dataArray[1]);
    addElementToPage("What is the purpose for collecting user data?", dataArray[2]);
    addElementToPage("Is the collected data shared with third parties?", dataArray[3]);
    addElementToPage("What methods are used for data storage and security?", dataArray[4]);
    chrome.storage.local.remove("data");
});

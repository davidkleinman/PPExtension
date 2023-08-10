function addElementToPage(title, element) {
    const newAccordionButton = document.createElement('button');
    newAccordionButton.className = 'accordion';
    newAccordionButton.textContent = title;
    
    const newPanel = document.createElement('div');
    newPanel.className = 'panel';
    newPanel.innerHTML = `<p>${element}</p>`;
    newPanel.style.display = 'none';

    document.body.append(newAccordionButton);
    document.body.append(newPanel);
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

    const scriptButton = document.createElement('script')
    scriptButton.src = 'accordion.js'
    document.body.append(scriptButton);

    const image = document.createElement('img')
    image.className = "privacy_policy_image"
    image.src = '../assets/privacy_policy_hero.svg'
    document.body.append(image);

    chrome.storage.local.remove("data");
});

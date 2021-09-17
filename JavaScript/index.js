import { GetContent }  from "./Services/GetTemplatesService.js"

document.addEventListener("DOMContentLoaded", OnLoadAndUrlChange);
window.addEventListener('popstate', OnLoadAndUrlChange);

async function OnLoadAndUrlChange() {
    let currentUrl = document.URL;
	let urlParts = currentUrl.split('#');
    let anchor = (urlParts.length > 1) ? urlParts[1] : null;
    
    await ChangeContent(anchor);
}

async function ChangeContent(anchor) {
    let contentElement = document.getElementById('mainContent');

    contentElement.innerHTML = await GetContent(anchor);
}


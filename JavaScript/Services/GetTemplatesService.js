export async function  GetContent(anchor){
    let json = await fetch('./Data/Text.json')
                .then(response => response.json());
    
    if (anchor === '' || anchor == null) 
        return GetResultString('default', json);
    else if (json[anchor] != undefined)
        return GetResultString(anchor, json);
    else
        return `<h1>No content here</h1>`;
}

function GetResultString(anchor, json){
    let data = json[anchor];
    let result = `<h1>${data.title}</h1>`;
    data.content.forEach(paragraph => {
        let startLinkReplacementIndex = paragraph.indexOf("{{");
        
        while (startLinkReplacementIndex != -1) {
            let endLinkReplacementIndex = paragraph.indexOf("}}");
            let linkWord = paragraph.substring(startLinkReplacementIndex + 2, endLinkReplacementIndex);

            let link = data.links[linkWord];
            paragraph = paragraph.replace(`{{${linkWord}}}`, `<a href="${link}"  target="_blank">${link}</a>`)
            startLinkReplacementIndex = paragraph.indexOf("{{");
        }

        result += `<p>${paragraph}</p>`;
    });
    return result;
}
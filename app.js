const puppeteer = require('puppeteer')

// Título do último vídeo postado no canal
var last_video

// Entrando no canal e pegando o nome do vídeo
async function startApp(){
    function getTitle(page, selector){
        var title = page.$eval(selector, title => title.innerText)
        return title
    }

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('https://www.youtube.com/c/DiegoFaustino68/videos')
    last_video = await getTitle(page, '#video-title')
    
    browser.close()
    
    console.log(last_video)
}

//Chamando função
startApp();
//Function que faz a repetição do startApp()
setInterval(() => startApp(), 5000);
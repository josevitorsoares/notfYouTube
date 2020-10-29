const puppeteer = require('puppeteer')
var nodemailer = require('nodemailer');

// Título do último vídeo postado no canal
var last_video = 'MINHA SILVERADO TRANSFORMOU ! FICOU LINDA DEMAIS'

// Entrando no canal e pegando o nome do vídeo
async function startApp(){
    function getTitle(page, selector){
        var title = page.$eval(selector, title => title.innerText)
        return title
    }

    function getLink(page, selector){
        var link = page.$eval(selector, link => link.href)
        return link
    }

    function sendEmail(link_video){
        var sender = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: 'capitaocaverna012@gmail.com',
                pass: 'qualquercoisa'
            }
        });

        var emailToSend = {
            from: 'jose.vitor.clashbr@gmail.com',
            to: 'jose.vitor.clashbr@gmail.com',
            subject: 'Vídeo novo do Diego Faustino',
            text: 'Esse é o link para o novo vídeo do Diego Faustino: \n' + link_video
        };

        sender.sendMail(emailToSend, function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado com sucesso!');
            }
        });
    }

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('https://www.youtube.com/c/DiegoFaustino68/videos')

    var new_video = await getTitle(page, '#video-title')
    
    if(new_video == last_video){
        browser.close()
        console.log("Sem vídeo novo!")    
    } else{
        var link = await getLink(page, '#video-title') 
        sendEmail(link)
        last_video = new_video
        browser.close()
        console.log('Video novo: ' + new_video)
    }
}

//Chamando função
startApp();

//Function que faz a repetição do startApp() a cada 2 minutos (120000)
setInterval(() => startApp(), 120000);
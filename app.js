const nodemailer = require('nodemailer')
const puppeteer = require('puppeteer')
const http = require('http')

//Código para utilização da porta 5000 e resolução do erro no Heroku
handle = (req, res) => res.end('hit')
server = http.createServer(handle)
server.listen(process.env.PORT || 5000)

//Var de controle
var last_video = 'video'

//Function para obter o título do video
function getTitle(page, selector) {
    var title = page.$eval(selector, title => title.innerText)
    return title
}

//Function para obter o link do video
function getLink(page, selector) {
    var link = page.$eval(selector, link => link.href)
    return link
}

//Function para o envio de emails
function sendEmail(link_video) {
    var sender = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 587,
        secure: true,
        auth: {
            user: 'capitaocaverna012@gmail.com',
            pass: 'venTilador658'
        }
    });

    var emailToSend = {
        from: 'capitaocaverna012@gmail.com',
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

// Function principal que executa o que é proposto pelo robô
async function startAppJS() {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreDefaultArgs : [ '--disable-extensions' ] ,
    });

    const page = await browser.newPage();
    
    await page.goto('https://www.youtube.com/c/DiegoFaustino68/videos')

    var new_video = await getTitle(page, '#video-title')

    if (last_video == 'video') {
        last_video = await getTitle(page, '#video-title')
    } else if(new_video != last_video){
        var link = await getLink(page, '#video-title')

        last_video = new_video
        sendEmail(link);
        console.log('Video novo: ' + new_video)      
    } else{
        console.log('Sem vídeo novo!')
    }

    browser.close()
}

//Iniciando a function principal
startAppJS();

//Function que faz a repetição da execução do startAppJS() a cada 2 minutos (120000)
setInterval(() => startAppJS(), 120000);
const jimp = require('jimp');

async function main() {

    let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
    let mask = await jimp.read('./image/mascara.png');
    let avatar = await jimp.read('./image/avatar.png');
    let background = await jimp.read('./image/fundo.png');

    avatar.resize(130, 130);
    mask.resize(130,130);
    avatar.mask(mask);
    background.print(fonte, 170, 175, 'Cloves aqui');
    background.composite(avatar, 40, 90).write('beta.png');
    
    /*Jimp.read('http://www.example.com/path/to/lenna.jpg')
    .then(avatar => {
        avatar.resize(130, 130);
        mask.resize(130,130);
        avatar.mask(mask);
        background.print(fonte, 170, 175, 'Pintinho');
        background.composite(avatar, 40, 90).write('beta.png');
    })
    .catch(err => {
        console.log("Erro ao carregar a imagem")
    });
    */
}
main();
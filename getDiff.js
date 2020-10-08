const compareImages = require('resemblejs/compareImages');
const fs = require('mz/fs');

async function getDiff(){
    const options = {
        output: {
            errorColor: {
                red: 255,
                green: 0,
                blue: 255
            },
            errorType: 'movement',
            transparency: 0.3,
            largeImageThreshold: 1200,
            useCrossOrigin: false,
            outputDiff: true
        },
        scaleToSameSize: true,
        ignore: ['nothing', 'less', 'antialiasing', 'colors', 'alpha'],
    };

    // The parameters can be Node Buffers
    // data is the same as usual with an additional getBuffer() function
    const data = await compareImages(
        await fs.readFile('cypress/screenshots/color_palette_screenshot.spec.js/test_1602122135.png'),
        await fs.readFile('cypress/screenshots/color_palette_screenshot.spec.js/base_1602122135.png'),
        options
    );
    console.log(data);
    await fs.writeFile('output.png', data.getBuffer());
}

getDiff();

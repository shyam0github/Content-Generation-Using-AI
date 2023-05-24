const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey('d54edfd1-e974-4676-b598-ff468113088c');

(async function() {
    var resp = await deepai.callStandardApi("text-generator", {
            text: "Football is one of the most popular sports in the world.",
    });
    console.log(resp);
})()
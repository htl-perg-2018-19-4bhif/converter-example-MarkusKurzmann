//Before starting the program, run 'npm start' for installing the wolfram-alpha-api
const errorMessage = 'Invalid parameters\n';
if (process.argv.length == 7) {
    var number = process.argv.slice(3, 4);
    var unitFrom = process.argv.slice(4, 5);
    var unitTo = process.argv.slice(6, 7);
    const WolframAlphaAPI = require('wolfram-alpha-api'), waApi = WolframAlphaAPI('AV3U27-L246TPAW73')
    const converterString = "convert " + number + " " + unitFrom + " to " + unitTo;
    waApi.getFull(converterString).then((queryresult) => {
        const pods = queryresult.pods, result = "", output = pods.map((pod) => {
            const subpodContent = pod.subpods.map(subpod => {
                if (pod.title == "Result"){
                    var beginDesc = subpod.img.alt.indexOf("(");
                    var resultString = subpod.img.alt.slice(0,beginDesc);
                    console.log("Information: " + converterString)
                    console.log( number + " " + unitFrom + " are " + resultString);
                }
            }).join('\n');
        }).join('\n');
    }).catch(console.log("Processing information, Please Wait..."));
} else {
    console.log(errorMessage);
}
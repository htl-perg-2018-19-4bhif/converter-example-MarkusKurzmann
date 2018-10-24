//Before starting the program, run 'npm start' for installing the wolfram-alpha-api
const errorMessage = 'Invalid parameters\n';
//Check if the right amount of arguments were inputted
if (process.argv.length == 6) {
    //Save the arguments to variables
    var number = process.argv.slice(2, 3);
    var unitFrom = process.argv.slice(3, 4);
    var unitTo = process.argv.slice(5, 6);

    //initialize the Wolfram-Alpha-Api with my Key
    const WolframAlphaAPI = require('wolfram-alpha-api'), waApi = WolframAlphaAPI('AV3U27-L246TPAW73')
    const converterString = "convert " + number + " " + unitFrom + " to " + unitTo;
    waApi.getFull(converterString).then((queryresult) => {
        if(queryresult == null || queryresult.pods == null){
            console.log(errorMessage);
            return;
        }else{
            const pods = queryresult.pods, result = "", output = pods.map((pod) => {
                const subpodContent = pod.subpods.map(subpod => {
                    if (pod.title == "Result"){
                        var beginDesc = subpod.img.alt.indexOf(" ");
                        var resultString = subpod.img.alt.slice(0,beginDesc);
                        //console.log("Information: " + converterString)
                        console.log( number + " " + unitFrom + " are " + resultString + " " + unitTo);
                    }
                }).join('\n');
            }).join('\n');
        }
        
    }).catch();
} else {
    console.log(errorMessage);
}
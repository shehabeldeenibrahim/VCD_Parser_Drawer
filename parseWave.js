 function parse(vcd_path)
{
    var fs = require('fs');
    path = vcd_path;
    var file = fs.readFileSync(path, "utf8");
    const VCDParser = require('vcd-parser');
    let a = VCDParser.parse(file).then(parsedData => {
            //console.log(parsedData);
            return parsedData;
            //json = JSON.stringify(parsedData);
            
        
        })
        .catch(err => {
            console.error(err);
        });
       return a; 

}

function getEndingDuration(signalsArray, line)
{
    var largest;
    if(line != undefined)
    {
        largest = line;
    }
    else
    {
        largest = -1;
    }
    for(signal of signalsArray)
    {
        for(arr of signal.wave)
        {
            if(Number(arr[0]) > largest)
            {
                largest = Number(arr[0]);
            }
        }
    }
    return largest;
}

function generateDots(num)
{

    var dots = "";
    for( var x = 0; x < num-1; x++)
    {
        dots = dots + ".";
    }
    return dots;
}

function generateSignal(arr, endingDuration)
{
    if(endingDuration<=99)
    {
        factor = 1;
    }
    else if(endingDuration <=999)
    {
        factor = 10;
    }
    else if(endingDuration <=9999)
    {
        factor = 100;
    }
    else if(endingDuration <=99999)
    {
        factor = 1000;
    }
    else
    {
        factor = 10000;
    }
    durations_array = []
    //factor = 1000;
    //factor = 1;
    for(i in arr.wave)
    {
        var index = Number(i);
        if(index == arr.wave.length-1)
        {
            durations_array[index] = [arr.wave[index][1] , (endingDuration - arr.wave[index][0])/factor] ;
            break;
        }
        da = Number(arr.wave[index+1][0]);
        db = Number(arr.wave[index][0]);
        durations_array.push( [arr.wave[index][1], (da-db)/factor] );
    }
    if(arr.size == 1)
    {   
        var generated_wave = "";
        for(signal_change of durations_array)
        {
            var dots = generateDots(signal_change[1]);
            generated_wave = generated_wave + signal_change[0] + dots;
            generated_wave = generated_wave.replace("1","h");
            generated_wave = generated_wave.replace("0","l");
        }
        return {'name': arr.signalName , 'wave': generated_wave};
    }
    else
    {
        var generated_wave = "";
        var data = [];
        for(signal_change of durations_array)
        {
            var dots = generateDots(signal_change[1]);
            generated_wave = generated_wave + "5" + dots;
            data.push(signal_change[0]);
        }
        console.log("")
        return {'name': arr.signalName , 'wave': generated_wave, 'data': data};
    }
    console.log("")

    
}
////////////////////////////////////////main/////////////////////////////////////////////////

  var vcd_path;
   process.argv.forEach(function (path_) {
   vcd_path = path_;
       console.log(path_);
     });
  parse(vcd_path).then(parsedData=>{
    const readLastLines = require('read-last-lines');
    var temp;
    var lines = readLastLines.read(path = vcd_path, 2).then(function (line)
     {
    var dict = [];
    signals_array = parsedData.signal;
    if(line[0] == '#')
    {
        var temp = line.substring(1,line.length);
        var endingDuration = getEndingDuration(signals_array, Number(temp));
    }
    else
    {
        var endingDuration = getEndingDuration(signals_array);
    }
    for(arr of signals_array)
    {

        generated_signal = generateSignal(arr, endingDuration);
        dict.push(generated_signal);
    }
    var wavedrom_signal = {signal: dict};
    var wavedrom_str = JSON.stringify(wavedrom_signal);
    var fs = require('fs');
    path = "parsed_json.txt";
    fs.writeFileSync(path, wavedrom_str);
    console.log(wavedrom_str)


});
});


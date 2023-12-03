const apikey = "907f78e09fc06bf8215e62e8f8e43629";
const baseUrl = "https://api.openweathermap.org/data/3.0";

/*https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}*/





const country = document.getElementById("top1");
const detailbox = document.getElementById("bottom");
const map = document.getElementById("maps");




function iframeUpdate(latitude,longitude){
    const element1 = document.createElement("iframe");
    element1.className = "map";
/*<iframe src="https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed"></iframe>*/
    element1.src = `https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed`;
    element1.width = 900;
    element1.height = 370;
    element1.frameBorder = 0;
    element1.style.border = 0;

    map.appendChild(element1);
}





function locationOutput(){
    navigator.geolocation.getCurrentPosition((success) => {
        let {latitude, longitude} = success.coords;

        findLocation(latitude,longitude);
        iframeUpdate(latitude,longitude);
    });
}


/*https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={longitude}&appid={apikey}*/



async function fetchUVIndex(latitude,longitude){
    const endPoint = `${baseUrl}/onecall?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
    try{
        const response = await fetch(endPoint, { mode: 'cors'});
        const output = await response.json();

        console.log(output);
    }catch(error){
        console.log("error occured");
    }
}



// wind-direction
function wind(angle){
    if(angle == 0){
        return "North";
    }
    if(angle == 90){
        return "East";
    }
    if(angle == 180){
        return "South";
    }
    if(angle == 270){
        return "West";
    }
    if(angle > 0 && angle < 90){
        return "North-East";
    }
    if(angle > 90 && angle < 180){
        return "South-East";
    }
    if(angle > 180 && angle < 270){
        return "South-West";
    }
    if(angle > 180 && angle < 360){
        return "North-West";
    }
}




// kelvin to celcius
function convertTemp(temp){  
    return temp - 273.15;
}





function topUI(data){
    const element2 = document.createElement("div");
    element2.className = "lon-lat";

    element2.innerHTML = `
    <h4>Lat : ${data.coord.lat}</h4>
    <h4>Long : ${data.coord.lon}</h4>`;

    country.appendChild(element2);
}




function bottomUI(data) {
    const element3 = document.createElement("div");
    element3.className = "details";

    element3.innerHTML = `
    <h5>Location: ${data.name}</h5>
    <h5>Wind Speed: ${data.current.wind_speed} kmph</h5>
    <h5>Humidity : ${data.current.humidity} %</h5>
    <h5>Time Zone : GMT + 5 : 30</h5>
    <h5>Pressure: ${data.current.pressure} mbar</h5>
    <h5>Wind Direction : ${wind(data.current.wind_deg)}</h5>
    <h5>UV Index : ${data.current.uvi}</h5> <!-- Update this line -->
    <h5>Feels like: ${Math.floor(convertTemp(data.current.feels_like))}°</h5>`;

    detailbox.appendChild(element3);
}




async function findLocation(latitude,longitude){
    const endPoint = `${baseUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;

    try{
        const response = await fetch(endPoint);
        const output = await response.json();

        console.log(output);
        topUI(output);
        bottomUI(output);
    }
    catch(error){
        console.log("Something went wrong");
    }
}
locationOutput();


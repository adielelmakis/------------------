//jshint esversion:8
var d = new Date();
var weekDays = ["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"];


document.querySelector("button").addEventListener("click", async function locationSearch(event) {
  var location = document.getElementsByName("search")[0].value;
  const response = await fetch(`http://localhost:3000/api/location/search/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      location: location
    })
  });

  const data = await response.json();
  generatePage(data);
});


function generatePage(data) {
  var titleArr = document.querySelectorAll(".Column h3");
  var clssArr = document.getElementsByClassName("temp-cont");
  var wImgArr = document.getElementsByClassName("wImg");
  var clssArrLen = clssArr.length;

  for (var i = 0; i < clssArrLen; i++) {
    var temp = Math.round(data[i].the_temp);
    var icon = data[i].weather_state_abbr;

    var day = "";
    if(i === 0){
      day = "היום";
    }else if(i === 1){
      day ="מחר";
    }else{
      day = weekDays[d.getDay()+i];
    }

    titleArr[i].innerText = day;
    clssArr[i].innerText = temp + " °C";
    wImgArr[i].src = `https://www.metaweather.com/static/img/weather/ico/${icon}.ico`;
  }
}

//generatePage();
//https://www.metaweather.com/static/img/weather/ico/lr.ico

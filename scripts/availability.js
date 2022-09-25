let database = firebase.database().ref();

const button = document.querySelector(".submitButton");

var url = document.location.href,
  params = (url.split("?")[1] ?? "").split("&"),
  data = {},
  tmp;
for (var i = 0, l = params.length; i < l; i++) {
  tmp = params[i].split("=");
  data[tmp[0]] = tmp[1];
}

const bars = document.querySelectorAll("li");
var string = "";
function submitAvailability() {
  bars.forEach((bar) => {
    if (bar.style.backgroundColor == "lightgreen") {
      string += "1";
    } else {
      string += "0";
    }
  });
  return string;
}

button.onclick = function updateDB(event) {
  event.preventDefault(); //stop refreshing
  let park = decodeURI(data.name);
  let date = document.getElementsByClassName("date_div")[0].value;
  let sequence = submitAvailability();
  //Update database here
  let value = {
    PARK: park,
    DATE: date,
    SEQUENCE: sequence,
  };
  database.push(value);
};

function padString(str, length) {
  if (str.length < length) {
    for (var i = 0; i <= length - str.length; i++) {
      str = "0" + str;
    }
  }
  return str;
}

let database = firebase.database().ref();
let currentAvailability = document.querySelector(".current-av");
const button = document.querySelector(".submitButton");
const dateDiv = document.querySelector(".date_div");
let response;

async function getData() {
  await database.on("value", (dataResponse) => {
    response = dataResponse.val();
    updateAval();
    dateDiv.onmouseover = function () {
      updateAval();
    }
  });
}

getData();

var url = document.location.href,
  params = (url.split("?")[1] ?? "").split("&"),
  data = {},
  tmp;
for (var i = 0, l = params.length; i < l; i++) {
  tmp = params[i].split("=");
  data[tmp[0]] = tmp[1];
}

function updateAval() {
  let colorValues = [];
  let park = decodeURI(data.name);
  if (park) {
    for (element in response) {
      if (response[element].PARK == park
        && document.getElementsByClassName("date_div")[0].value == response[element].DATE) {
        colorValues.push(response[element].SEQUENCE.slice(0, 12));
      }
    }
  }

  let ops = colorValues.length == 0 ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : getOpacities(colorValues);
  let avalChildren = currentAvailability.children;

  for (let i = 0; i < avalChildren.length; i++) {
    avalChildren.item(i).style.backgroundColor = `rgba(0, 255, 0, ${ops[i]})`;
  }
}

const bars = document.querySelectorAll("li");
function submitAvailability() {
  let string = "";
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

function getOpacities(arr) {
  var sum = 0;
  for (var element in arr) {
    sum = sum + parseInt(arr[element], 10);
  }
  finalSum = padString(sum.toString(), 12);
  const opacities = [];
  for (var i = 0; i < finalSum.length; i++) {
    opacities.push(finalSum[i] / arr.length);
  }
  return opacities;
}

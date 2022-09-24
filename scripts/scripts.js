let database = firebase.database().ref();

const button = document.querySelector("#submitButton");

button.onclick = function updateDB(event) {
  event.preventDefault(); //stop refreshing
  let username = "TEST";
  let message = "testing";
  //Update database here
  let value = {
    NAME: username,
    MESSAGE: message
  }
  database.push(value);
}
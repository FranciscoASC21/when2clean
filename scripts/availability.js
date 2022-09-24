let database = firebase.database().ref();

// database.on("value", updateAvailability);
const button = document.querySelector(".submitButton");
// var eventsRef = database.collection("events").doc("PlantTrees");

button.onclick = function updateDB(event) {
  event.preventDefault(); //stop refreshing
  //Update database here
  let value = {
    SEQUENCES: ["1010110101011", "0010001001011", "0011000100001"],
  };
  database.push(value);
};

// function updateAvailability(rowData) {
// current user input = avail, take other user's avail from db, once avail is finalized allow
// pull the bit sequences from the db, for each bit we want to divide opacity entered 1s/total entries
// it can return an array with the set of opacities, probably send back as json
function padString(str, length) {
  if (str.length < length) {
    for (var i = 0; i <= length - str.length; i++) {
      str = "0" + str;
    }
  }
  return str;
}

database.once("value", function (snapshot) {
  var sum = 0;
  for (var key in snapshot.val()) {
    var currSequence = snapshot.val()[key].SEQUENCES;
    console.log(currSequence);
    for (var element in currSequence) {
      console.log(currSequence[element]);
      sum = sum + parseInt(currSequence[element], 10);
    }
    finalsum = padString(sum.toString(), 13);
    const arr = [];
    for (var i = 0; i < finalsum.length; i++) {
      arr.push(finalsum[i] / currSequence.length);
    }
    console.log(arr);
  }
});

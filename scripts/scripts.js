const buttons = document.querySelectorAll(".borough-button");
const logo = document.querySelector(".logo");
const mapContent = document.querySelector(".map-content");
const boroughContent = document.querySelector(".borough-content");
const bImage = document.querySelector(".b-image");
const bMap = document.querySelector(".b-map");
const parkList = document.querySelector(".park-list");

const bImages = ["brooklyn", "bronx", "manhattan", "queens", "staten_island"];
const parks = [["Prospect Park", "Fort Greene Park", "Canarsie Park", "Sunset Park", "Kaiser Park"], ["Bronx Park", "Crotona Park", "Van Cortlandt Park", "Soundview Park", "Claremont Park"], ["Central Park", "Marcus Garvey Park", "Inwood Hill Park"], ["Kissena Park", "Forest Park", "Astoria Park", "Alley Pond Park", "Hook Creek Park"], ["Brookfield Park", "Bloomingdale Park", "Great Kills Park", "Clove Lakes Park"]];
const parkCoords = [[[-40, 27], [-42, 14.5], [-17.5, 41.5], [-51, 32.5], [-47.5, 61]], [[-40, 32], [-49, 40], [-44, 10], [-39, 52], [-53.5, 38]], [[-23, 35], [-16, 23.7], [-10.5, -1.5]], [[-35, 17], [-46, 33], [-68, 3.5], [-18, 18], [-18, 54]], [[-43, 32], [-60, 48], [-30, 40], [-25, 9]]]

logo.onclick = () => {
  mapContent.style.display = "flex";
  boroughContent.style.display = "none";
};

buttons.forEach((button, index) => {
  button.onclick = (event) => {
    event.preventDefault();
    mapContent.style.display = "none";
    boroughContent.style.display = "flex";
    bImage.src = `../images/${bImages[index % 5]}.png`;
    populateList(index % 5);
    createMarkers(index % 5);
  }
});

function createMarkers(index) {
  while (bMap.children.length != 1) {
    bMap.removeChild(bMap.lastChild);
  }
  for (let i = 0; i < parkCoords[index].length; i++) {
    let marker = document.createElement("img");
    marker.src = "../images/marker.png";
    marker.className = "marker";
    marker.style.transform = `translate(${parkCoords[index][i][0]}vh, ${parkCoords[index][i][1]}vh)`;
    marker.style.width = "8.5vh";
    marker.style.filter = "invert(88%) sepia(24%) saturate(1000%) hue-rotate(287deg) brightness(99%) contrast(106%)";
    bMap.appendChild(marker);

    marker.onmouseover = function () {
      marker.style.transform = `translate(${parkCoords[index][i][0]-1.5}vh, ${parkCoords[index][i][1]-2}vh)`;
      marker.style.width = "11.9vh";
      marker.style.filter = "invert(88%) sepia(24%) saturate(1000%) hue-rotate(287deg) brightness(60%) contrast(106%)";
    };

    marker.onmouseout = function () {
      marker.style.transform = `translate(${parkCoords[index][i][0]}vh, ${parkCoords[index][i][1]}vh)`;
      marker.style.width = "8.5vh";
      marker.style.filter = "invert(88%) sepia(24%) saturate(1000%) hue-rotate(287deg) brightness(99%) contrast(106%)";
    };

    marker.onclick = () => {
      window.location.href = `../main/grass.html?name=${parks[index][i]}`;
    };
  }
};

function selectPark(park) {
  selectedPark = park;
}

function populateList(index) {
  parkList.innerHTML = "";

  for (let i = 0; i < parks[index].length; i++) {
    let parkContainer = document.createElement("div");
    let listItem = document.createElement("p");

    let parkImg = document.createElement("img");
    parkImg.src = "../images/park_holder.webp";
    listItem.innerHTML = parks[index][i];
    parkContainer.onclick = () => {
      window.location.href = `../main/grass.html?name=${parks[index][i]}`;
    };
    parkContainer.appendChild(parkImg);
    parkContainer.appendChild(listItem);
    parkList.appendChild(parkContainer);

    parkContainer.onmouseover = function () {
      parkContainer.style.backgroundColor = "#fcd6d6"
      listItem.style.color = "#c12664";
      listItem.style.fontWeight = "bold";
      parkContainer.style.cursor = "pointer";
    };

    parkContainer.onmouseout = function () {
      parkContainer.style.backgroundColor = "#ebebeb"
      listItem.style.color = "black";
      listItem.style.fontWeight = "none";
      parkContainer.style.cursor = "none";
    };
  }
}

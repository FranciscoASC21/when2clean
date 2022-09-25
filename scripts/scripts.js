const buttons = document.querySelectorAll(".borough-button");
const logo = document.querySelector(".logo");
const mapContent = document.querySelector(".map-content");
const boroughContent = document.querySelector(".borough-content");
const bImage = document.querySelector(".b-image");
const parkList = document.querySelector(".park-list");

const bImages = ["brooklyn", "bronx", "manhattan", "queens", "staten_island"];
const parks = [
    [
        "Prospect Park",
        "Walk Whitman Park",
        "Marine Park",
        "Fort Greene Park",
        "Canarsie Park",
        "Sunset Park",
        "Kaiser Park",
    ],
    [
        "Crotona Park",
        "Franz Sigel Park",
        "Ferry Point Park",
        "Mullaly Park",
        "Soundview Park",
        "Mill Pond Park",
    ],
    [
        "Central Park",
        "Washington Square Park",
        "Battery Park",
        "Bryant Park",
        "Isham Park",
    ],
    [
        "Kissena Park",
        "Forest Park",
        "Elmhust Park",
        "Travers Park",
        "Astoria Park",
        "Bowne Park",
    ],
    [
        "High Rock Park",
        "Silver Lake Park",
        "Brookfield Park",
        "Ocean Breeze Park",
        "Tappen Park",
        "Willowbrook Park",
    ],
];

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
    };
});

function populateList(index) {
    parkList.innerHTML = "";

    for (let i = 0; i < parks[index].length; i++) {
        let parkContainer = document.createElement("div");
        let listItem = document.createElement("p");

        let parkImg = document.createElement("img");
        parkImg.src = "../images/park_holder.webp";
        listItem.innerHTML = parks[index][i];
        parkContainer.setAttribute(
            "onclick",
            `selectPark("${parks[index][i]}")`
        );

        parkContainer.appendChild(parkImg);
        parkContainer.appendChild(listItem);
        parkList.appendChild(parkContainer);
    }
}

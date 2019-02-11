const config = {
  apiKey: "AIzaSyDViZuxZUWi1YCsnh4vSyeBYoqim4INDZ4",
  authDomain: "develop-roadmap-2019.firebaseapp.com",
  databaseURL: "https://develop-roadmap-2019.firebaseio.com",
  projectId: "develop-roadmap-2019",
  storageBucket: "develop-roadmap-2019.appspot.com",
  messagingSenderId: "288470035711"
};
firebase.initializeApp(config);

const $htmlDiv = document.querySelector("#html");
const $cssDiv = document.querySelector("#css");
const $jsDiv = document.querySelector("#js");
const $othersDiv = document.querySelector("#others");
const $progressBar = document.querySelector("#progress-bar");

const getData = () => {
  firebase
    .database()
    .ref("/")
    .ref.on("value", function(snapshot) {
      changeProgressBar(snapshot.val());
      render(snapshot.val());
    });
};

const htmlList = list => {
  return list
    .map(
      item =>
        `<li class="${item.status ? "checked" : ""}">
            ${item.title}    
        </li>`
    )
    .join("");
};

const changeProgressBar = data => {
  const allTopics = Object.values(data);
  const totalOfTopics = [].concat(...allTopics).length;
  const percentValue = 100 / totalOfTopics;
  const progressBarWidth =
    [].concat(...allTopics).filter(item => item.status === true).length *
    percentValue;

  $progressBar.style.width = `${progressBarWidth}%`;
};

const render = data => {
  $htmlDiv.innerHTML += `<ul>${htmlList(data.html)}</ul>`;
  $cssDiv.innerHTML += `<ul>${htmlList(data.css)}</ul>`;
  $jsDiv.innerHTML += `<ul>${htmlList(data.javascript)}</ul>`;
  $othersDiv.innerHTML += `<ul>${htmlList(data.others)}</ul>`;
};

getData();

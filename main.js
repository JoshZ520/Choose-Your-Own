// Choose your own adventure

let data = [];

async function StartGame() {
  await GetStory();
  let dataPage = data["Page1"];

  DisplayPage(dataPage);
  changeBackground(dataPage);
}

async function GetStory() {
  const response = await fetch("story.json");
  data = await response.json();
}

function DisplayPage(dataPage) {
  document.querySelector("#story").textContent = dataPage.Text;
  document.querySelector(".storyContainer").style.background =
    dataPage.Background;
  // console.log(dataPage.Background);
  document.querySelector("#Option1").textContent = dataPage.Options[0].Text;
  document.querySelector("#Option2").textContent = dataPage.Options[1].Text;
  document.querySelector("#Option3").textContent = dataPage.Options[2].Text;
  // document.querySelector("#Option4").textContent = dataPage.Options[3].Text;
  // document.querySelector("#Option5").textContent = dataPage.Options[4].Text;

  let html = dataPage.Options.map(MakeButton).join("");
  document.querySelector("#buttonholder").innerHTML = html;
}

function buttonHandle(page) {
  dataPage = data[page];
  DisplayPage(dataPage);
}

function changeBackground(page) {
  const image = page.Background;
  const storyContainer = document.querySelector(".storyContainer");
  storyContainer.style.background = `--background-image: url("${image}")`;
  console.log(storyContainer.style.background);
}

function MakeButton(button) {
  return `<button value= ${button.Page} onclick="buttonHandle(value); changeBackground(value)">Go to ${button.Page}</button>`;
}

StartGame();

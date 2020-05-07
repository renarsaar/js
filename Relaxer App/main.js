// Ui vars
const container = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 5500;
const breatheTime = (totalTime / 4.5) * 2;
const holdTime = totalTime / 9;

function breatheAnimation() {
  text.innerText = "Fully In!";
  container.className = "container grow";

  setTimeout(() => {
    text.innerText = "";

    setTimeout(() => {
      text.innerText = "Let it go...";
      container.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}

breatheAnimation();

setInterval(breatheAnimation, totalTime);

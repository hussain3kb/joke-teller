const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Toggle Button
function toggleButton() {
  button.hidden = !button.hidden;
}
function speechJoke(joke) {
  VoiceRSS.speech({
    key: "8d0a5080e9e44f4a9f55c9b28373b5a2",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from joke api
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming,Dark?blacklistFlags=nsfw,religious,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery} `;
    } else {
      joke = data.joke;
    }
    // Text to speech
    speechJoke(joke);
    // disable button
    toggleButton();
  } catch (error) {
    console.log("Whoops:", error);
  }
}
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);

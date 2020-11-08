console.log("Client side javascript starting");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      messageOne.textContent = "";
      messageTwo.textContent = "";
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          //prendo dall'api node js che fa il punto res.send
          messageOne.textContent = data.locations;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});

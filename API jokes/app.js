// variables
document.querySelector(".get-jokes").addEventListener("click", generateJokes);

function generateJokes(e) {
  const number = document.getElementById("number").value;

  const xhr = new XMLHttpRequest();

  xhr.open("GET", `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function() {
    if (this.status === 200) {
      // JSON.PARSE = STRING INTO OBJECT AND THEN LOOP THROUGH
      const response = JSON.parse(this.responseText);

      let output = "";

      if (response.type === "success") {
        // VALUE!! each api is diff
        // OATH for authentication
        response.value.forEach(function(joke) {
          output += `
          <li>${joke.joke}</li>
          `;
        });
      } else {
        output += "<li>Error</li>";
      }
      document.querySelector(".jokes").innerHTML = output;
    }
  };

  xhr.send();

  e.preventDefault();
}

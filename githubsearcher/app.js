// Init Github
const github = new Github();
// Init UI
const ui = new UI();

// Search input
const searchUser = document.getElementById("searchUser");

// Search input event listener
searchUser.addEventListener("keyup", e => {
  // Get input text
  const userText = e.target.value;

  if (userText !== "") {
    // Make HTTP call. Pass in userText from form
    github.getUser(userText).then(data => {
      if (data.profile.message === "Not Found") {
        // Show alert from UI
        ui.showAlert("User not found", "alert alert-danger");
      } else {
        // Show the profile from UI
        ui.showProfile(data.profile); // This is returned from github.js
        ui.showRepos(data.repo);
      }
    });
  } else {
    // Clear profile if input is empty
    ui.clearProfile();
  }
});

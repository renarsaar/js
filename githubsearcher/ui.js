// ES6 classes
class UI {
  constructor() {
    this.profile = document.getElementById("profile");
  }

  // Show user data
  showProfile(user) {
    this.profile.innerHTML = `
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-3">
          <img class="img-fluid mb-2" src ="${user.avatar_url}">
          <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-3">View Profile</a>
        </div>
        <div class="col-md-9">
          <span class="badge badge-primary">Public repos: ${user.public_repos}</span>
          <span class="badge badge-secondary">Public gists: ${user.public_gists}</span>
          <span class="badge badge-success">Followers: ${user.followers}</span>
          <span class="badge badge-info">Following: ${user.following}</span>
          <br><br>
          <ul class = "list-group">
            <li class="lists-group-item">Company: ${user.company}</li>
            <li class="lists-group-item">Website/Blog: ${user.blog}</li>
            <li class="lists-group-item">Location: ${user.location}</li>
            <li class="lists-group-item">Member since: ${user.created_at}</li>
          </ul>
        </div>  
      </div>
    </div>
    <h3 class = "page-heading mb-3">Latest Repos</h3>
    <div id ="repos"></div>
    `;
  }

  // Show Repos
  showRepos(repo) {
    let output = "";

    repo.forEach(function(repo) {
      output += `
      <div class="card card-body mb-2">
        <div class="row">
          <div class="col-md-6">
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          </div>
          <div class="col-md-6">
            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
            <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
            <span class="badge badge-success">Forks: ${repo.forks_count}</span>
          </div>
        </div>
      </div>`;
    });

    // Output the repos
    document.getElementById("repos").innerHTML = output;
  }

  // Show Alert
  showAlert(msg, className) {
    // Clear any remaining alerts
    this.cleaAlert();

    // Create div
    const div = document.createElement("div");

    // Add class to div
    div.className = className;

    // Add text
    div.appendChild(document.createTextNode(msg));

    // Get parent
    const container = document.querySelector(".searchContainer");

    // Get search box
    const search = document.querySelector(".search");

    // Insert alert
    container.insertBefore(div, search);

    // Timeout after 3 sec
    setTimeout(() => {
      this.cleaAlert();
    }, 3000);
  }

  // Clear Alert
  cleaAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  // Clear Profile if input empty
  clearProfile(user) {
    this.profile.innerHTML = "";
  }
}

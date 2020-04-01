class UI {
  constructor() {
    // Output div
    this.workout = document.querySelector("#workouts");
    // Live div
    this.live = document.querySelector("#live");

    // Form Data
    this.workoutName = document.querySelector("#name");
    this.workoutActivity = document.querySelector("#activity");
    this.workoutDate = document.querySelector("#date");
    this.workoutTime = document.querySelector("#time");
    this.workoutDistance = document.querySelector("#distance");
    this.workoutDuration = document.querySelector("#duration");
    this.workoutNotes = document.querySelector("#notes");

    // ID value
    this.idInput = document.querySelector("#id");

    // Submit button
    this.submit = document.querySelector(".workout-submit");
    this.liveWorkout = document.querySelector(".live-workout");
    this.liveStart = document.querySelector(".live-start");
    this.back = document.querySelector(".back");

    // Default state, add a workout
    this.formState = "add";
  }

  //
  // List all workouts in document
  showWorkouts(workouts) {
    let output = "";

    workouts.forEach(workout => {
      output += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${workout.name}</h4>
          <hr>
          <h5 class="card-text mb-4">${workout.activity}</h5>
          
          <div class="d-flex">
            <p class="card-text">${workout.date} </p><p class="card-text ml-5">${workout.time}</p>
          </div>
          
          <div class="d-flex">
          <p class="card-text mr-4">${workout.distance} </p><p class="card-text m-0 mb-3">${workout.duration}</p>
          </div>
          <p class="card-text">${workout.notes}</p>


          <a href="#" class="edit card-link" data-id="${workout.id}"><i class="fa fa-pencil mr-1"></i></a>
          <a href="#" class="delete card-link" data-id="${workout.id}"><i class="fa fa-remove mr-1"></i></a>
        </div>
      </div>`;
      this.workout.innerHTML = output;
    });
  }

  //
  // Show alert message
  showAlert(message, className) {
    this.clearAlert();

    // Create div
    const div = document.createElement("div");
    // Add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent element of alert div
    const container = document.querySelector(".workoutContainer");
    // Get Workouts
    const live = document.querySelector("#live");
    // Insert alert before parent element of div
    container.insertBefore(div, live);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  //
  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  //
  // Clear Input
  clearFields() {
    this.workoutName.value = "";
    this.workoutActivity.value = "";
    this.workoutDate.value = "";
    this.workoutTime.value = "";
    this.workoutDistance.value = "";
    this.workoutDuration.value = "";
    this.workoutNotes.value = "";
  }

  //
  // Disable fields
  disableFields() {
    // Input fields
    this.workoutName.disabled = true;
    this.workoutActivity.disabled = true;
    this.workoutDistance.disabled = true;
    this.workoutNotes.disabled = true;

    // Buttons
    // "Back" btn
    document.querySelector(".back").disabled = true;

    // "Live start" btn
    document.querySelector(".live-start").disabled = true;

    // Disable Edit, Delete
    const cardLinks = document.querySelectorAll(".card-link");
    cardLinks.forEach(function(a) {
      a.style.pointerEvents = "none";
    });
  }

  //
  // Enable fields
  enableFields() {
    // Input fields
    this.workoutName.disabled = false;
    this.workoutActivity.disabled = false;
    this.workoutDistance.disabled = false;
    this.workoutNotes.disabled = false;

    // Buttons
    // "Back" btn
    document.querySelector(".back").disabled = false;

    // "Live start" btn
    document.querySelector(".live-start").disabled = false;

    // Remove whole div with content
    document.querySelector(".live").remove();

    // Enable Edit, Delete
    const cardLinks = document.querySelectorAll(".card-link");
    cardLinks.forEach(function(a) {
      a.style.pointerEvents = "auto";
    });
  }

  //
  // Fill form on edit state with data
  fillForm(data) {
    // Workout value data.date conversion to yyyy-MM-dd
    // Convert input to Date
    const dateValue = new Date(data.date),
      // Convert date to ISOString and splice
      date = dateValue.toISOString().substring(0, 10);

    this.workoutName.value = data.name;
    this.workoutActivity.value = data.activity;
    this.workoutDate.value = date;
    this.workoutTime.value = data.time;
    this.workoutDistance.value = data.distance;
    this.workoutDuration.value = data.duration;
    this.workoutNotes.value = data.notes;

    // Hidden #id
    this.idInput.value = data.id;

    this.changeFormState("edit");
  }

  //
  // Clear ID input
  clearIdInput() {
    this.idInput.value = "";
  }

  //
  // Edit button scroll up
  scrollup() {
    window.scrollTo(0, 0);
  }

  //
  // Change to "Live Workout" state
  changeLiveState(type) {
    if (type === "live") {
      // Remove duplicate buttons
      if (document.querySelector(".live-workout")) {
        document.querySelector(".live-workout").remove();
      }

      // Submit button text
      this.submit.textContent = "Start!";
      this.submit.classList = "live-start mr-3 btn background";

      // Disable Data and Time input
      document.querySelector("#date").disabled = true;
      document.querySelector("#time").disabled = true;
      document.querySelector("#duration").disabled = true;

      // Make "Back" btn
      const back = document.createElement("button");
      back.className = "back mr-3 btn background";
      back.appendChild(document.createTextNode("Back"));

      // Get parent
      const changeBtn = document.querySelector(".change-live");

      // Get element to insert before
      const add = document.querySelector(".add");

      // Insert new "Back" button
      changeBtn.insertBefore(back, add);
    } else {
      // Delete duplicate "Live Workout buttons"
      if (document.querySelector(".live-workout")) {
        document.querySelector(".live-workout").remove();
      }
      // Remove "back" btn
      if (document.querySelector(".back")) {
        document.querySelector(".back").remove();
      }
      // Enable input fields
      document.querySelector("#date").disabled = false;
      document.querySelector("#time").disabled = false;
      document.querySelector("#duration").disabled = false;

      // Change submit text
      this.submit.textContent = "Add to tracker";
      this.submit.classList = "workout-submit mr-3 btn background";

      // Make "Live Workout" btn
      const liveBtn = document.createElement("button");
      liveBtn.className = "live-workout mr-3 btn background";
      liveBtn.appendChild(document.createTextNode("Live Workout"));

      // Get parent
      const changeBtn = document.querySelector(".change-live");

      // Get element to insert before
      const add = document.querySelector(".add");

      // Insert new "Live Workout" button
      changeBtn.insertBefore(liveBtn, add);
    }
  }

  //
  // Output Live Workout do document
  workoutLive() {
    // Data variables
    const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -1);
    // => 'yyyy-MM-ddTmm:ss:msms'

    const curTime = localISOTime.substring(11, 16);
    const curDate = localISOTime.substring(0, 10);

    // Output to html
    const output = `
  <div class="card mb-3 live">
    <div class="card-body live-data">
      <h4 class="card-title live-name">${this.workoutName.value}</h4>
      <hr>
      <h5 class="card-text mb-4">${this.workoutActivity.value}</h5>
      
      <div class="d-flex">
        <p class="card-text">${curDate}</p><p class="card-text ml-5">${curTime}</p>
      </div>
      
      <div class="d-flex">
      <p class="card-text mr-4">${this.workoutDistance.value} </p><p class="card-text m-0 mb-3"></p>
      </div>
      <p class="card-text">${this.workoutNotes.value}</p>
      <button class="finish mr-3 btn btn-block background">Finish</button>
      <button class="cancel mr-3 btn btn-block bg-light">Cancel</button>
      </div>
  </div>
  `;

    this.live.innerHTML = output;
  }

  //
  // Edit Workout state
  changeFormState(type) {
    if (type === "edit") {
      this.scrollup();

      // Disable "Live Workout"
      if (document.querySelector(".live-workout")) {
        document.querySelector(".live-workout").disabled = true;
      }

      // Edit "Add to tracker" button
      this.submit.textContent = "Update Workout";
      this.submit.classList = "workout-submit btn btn-warning btn-block";

      // Create cancel button
      const button = document.createElement("button");
      button.className = "workout-cancel btn btn-light btn-block";
      button.appendChild(document.createTextNode("Cancel edit"));

      // Get parent
      const cardForm = document.querySelector(".card-form");

      // Get element to insert before
      const formEnd = document.querySelector(".form-end");

      // Delete duplicate "cancel edit" buttons
      if (document.querySelector(".workout-cancel")) {
        document.querySelector(".workout-cancel").remove();
      }

      // Insert new "cancel" button
      cardForm.insertBefore(button, formEnd);
    } else {
      // Add state
      // Edit button back
      this.submit.textContent = "Add to tracker";
      this.submit.classList = "workout-submit btn background btn-block";

      // Remove cancel button if it is there
      if (document.querySelector(".workout-cancel")) {
        document.querySelector(".workout-cancel").remove();
      }

      // Clear ID from hidden field
      this.clearIdInput();

      // Clear input fields
      this.clearFields();
    }
  }
}

export const ui = new UI();

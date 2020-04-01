import { http } from "./http";
import { ui } from "./ui";

// Get workouts on dom load
document.addEventListener("DOMContentLoaded", getWorkouts);

//
// Get workouts
function getWorkouts() {
  http
    .get("http://localhost:3000/workouts")
    .then(data => ui.showWorkouts(data))
    .catch(() =>
      // Error message
      ui.showAlert("Failed. Please try again later", "alert alert-danger")
    );
}

//
// Listen for live Workout
document.querySelector(".card-form").addEventListener("click", liveWorkout);

function liveWorkout(e) {
  if (e.target.classList.contains("live-workout")) {
    ui.changeLiveState("live");
  } else if (e.target.classList.contains("back")) {
    ui.changeLiveState("back");
  }
  e.preventDefault();
}

//
// Listen for submit workouts
document.querySelector(".card-form").addEventListener("click", submitWorkout);

//
// Submit workouts / Live Workout
function submitWorkout(e) {
  if (e.target.classList.contains("live-start")) {
    // Form variables
    const name = ui.workoutName.value,
      activity = ui.workoutActivity.value;

    // Validation
    if (name === "" || activity === "") {
      // Alert
      ui.showAlert("Please fill in required fields", "alert alert-danger");
    } else {
      // Alert
      ui.showAlert(
        "Workout started",
        "alert alert-success fas fa-chevron-down d-flex"
      );

      // Input data
      ui.workoutLive();

      // Clear fields
      ui.clearFields();

      // Disable input fields & buttons
      ui.disableFields();

      // Cancel || Finish
      document.querySelector(".live-data").addEventListener("click", e => {
        if (e.target.classList.contains("finish")) {
          // Time zone offset in milliseconds
          const tzoffset = new Date().getTimezoneOffset() * 60000;
          // 'yyyy-MM-ddTmm:ss:msms'
          const localISOTime = new Date(Date.now() - tzoffset)
            .toISOString()
            .slice(0, -1);

          // current date
          const curDate = new Date();
          // current Hours
          const hours = curDate.getHours();
          // Current Minutes
          const minutes = curDate.getMinutes();

          // Starting Hours
          const startHours = parseInt(
              e.target.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.textContent.substring(
                0,
                2
              )
            ),
            // Starting Minutes
            startMinutes = parseInt(
              e.target.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.textContent.substring(
                3,
                5
              )
            );

          // Difference between hours
          let diffHours = Math.abs(startHours - hours);
          // Add leading zeros
          if (diffHours < 10) {
            diffHours = `0${diffHours}`;
          }

          // difference between minutes
          let diffMinutes = Math.abs(startMinutes - minutes);
          // Add leading zeros
          if (diffMinutes < 10) {
            diffMinutes = `0${diffMinutes}`;
          }

          const timeValue = `${diffHours}:${diffMinutes}`,
            // Data variables
            name = e.target.parentElement.firstElementChild.textContent,
            activity =
              e.target.parentElement.firstElementChild.nextElementSibling
                .nextElementSibling.textContent,
            // "yyyy-MM-dd" from localISOTime
            date = localISOTime.substring(0, 10),
            // Current time - start time = duration
            time = localISOTime.substring(11, 16),
            // "hh:mm" from localISOTime
            duration = timeValue,
            distance =
              e.target.previousElementSibling.previousElementSibling
                .firstElementChild.textContent,
            notes = e.target.previousElementSibling.textContent,
            id = ui.idInput.value,
            data = {
              name,
              activity,
              date,
              time,
              distance,
              duration,
              notes
            };

          http
            .post("http://localhost:3000/workouts", data)
            .then(data => {
              // Show alert
              ui.showAlert("Workout added", "alert alert-success");

              // Enable fields, remove div
              ui.enableFields();

              // Call workouts including the new one
              getWorkouts();
            })
            .catch(() => {
              // Error message
              ui.showAlert(
                "Failed. Please try again later",
                "alert alert-danger"
              );
            });
        } else if (e.target.classList.contains("cancel")) {
          // Alert
          ui.showAlert("Workout Cancelled", "alert alert-success");

          // Enable fields, remove div
          ui.enableFields();
        }
      });
    }
  }

  // Submit Workout
  else if (e.target.classList.contains("workout-submit")) {
    // Form variables
    const name = ui.workoutName.value,
      activity = ui.workoutActivity.value,
      date = ui.workoutDate.value,
      time = ui.workoutTime.value,
      distance = ui.workoutDistance.value,
      duration = ui.workoutDuration.value,
      notes = ui.workoutNotes.value,
      id = ui.idInput.value,
      data = {
        name,
        activity,
        date,
        time,
        distance,
        duration,
        notes
      };

    // Validate Form data
    if (name === "" || activity === "" || date === "" || time === "") {
      // Alert
      ui.showAlert("Please fill in required fields", "alert alert-danger");
    } else {
      // Check for hidden ID input value
      if (id === "") {
        // Post request
        http
          .post("http://localhost:3000/workouts", data)
          .then(data => {
            // Show alert
            ui.showAlert("Workout added", "alert alert-success");

            // Clear fields
            ui.clearFields();

            // Call workouts including the new one
            getWorkouts();

            // Enable "Live Workout"
            document.querySelector(".live-workout").disabled = false;
          })
          .catch(() => {
            // Error message
            ui.showAlert(
              "Failed. Please try again later",
              "alert alert-danger"
            );
          });
      } else {
        // Edit post // Put request
        http
          .put(`http://localhost:3000/workouts/${id}`, data)
          .then(data => {
            // Show alert
            ui.showAlert("Workout edited", "alert alert-success");

            // Change the state back to "add"
            ui.changeFormState("add");

            // Call workouts including the new one
            getWorkouts();

            // Enable buttons
            document.querySelector(".live-workout").disabled = false;
          })
          .catch(() => {
            // Show error alert
            ui.showAlert(
              "Failed. Please try again later",
              "alert alert-danger"
            );
          });
      }
    }
  }

  e.preventDefault();
}

//
// Listen for Delete workout
document.querySelector("#workouts").addEventListener("click", deleteWorkout);

// Delete Workout
function deleteWorkout(e) {
  e.preventDefault();

  if (e.target.parentElement.classList.contains("delete")) {
    // dataset = data-id
    const id = e.target.parentElement.dataset.id;
    if (confirm("Are You Sure?")) {
      http
        .delete(`http://localhost:3000/workouts/${id}`)
        .then(data => {
          // Show Alert
          ui.showAlert("Workout Deleted", "alert alert-success");

          // Call workouts including the new one
          getWorkouts();
        })
        .catch(() => {
          ui.showAlert("Error, please try again later", "alert alert-danger");
        });
    }
  }
}

//
// Listen for edit state
document.querySelector("#workouts").addEventListener("click", enableEdit);

// Edit Workout state
function enableEdit(e) {
  e.preventDefault();

  if (e.target.parentElement.classList.contains("edit")) {
    // dataset = data - id;
    // Get workout data
    const id = e.target.parentElement.dataset.id,
      name = e.target.parentElement.parentElement.firstElementChild.textContent,
      activity =
        e.target.parentElement.parentElement.firstElementChild
          .nextElementSibling.nextElementSibling.textContent,
      date =
        e.target.parentElement.previousElementSibling.previousElementSibling
          .previousElementSibling.firstElementChild.textContent,
      time =
        e.target.parentElement.previousElementSibling.previousElementSibling
          .previousElementSibling.firstElementChild.nextElementSibling
          .textContent,
      distance =
        e.target.parentElement.previousElementSibling.previousElementSibling
          .firstElementChild.textContent,
      duration =
        e.target.parentElement.previousElementSibling.previousElementSibling
          .firstElementChild.nextElementSibling.textContent,
      notes = e.target.parentElement.previousElementSibling.textContent;

    // Data variable
    const data = {
      id,
      name,
      activity,
      date,
      time,
      distance,
      duration,
      notes
    };

    ui.changeLiveState("back");

    // Fill form with current workout data
    ui.fillForm(data);
  }
}

//
// Listen for cancel edit
document.querySelector(".card-form").addEventListener("click", cancelEdit);

function cancelEdit(e) {
  if (e.target.classList.contains("workout-cancel")) {
    ui.changeFormState("add");

    document.querySelector(".live-workout").disabled = false;
  }
  e.preventDefault();
}

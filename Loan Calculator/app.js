// Listen for Submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  // Hide results
  document.getElementById("results").style.display = "none";

  // Show loader
  document.getElementById("loading").style.display = "block";

  // Call results after 2 sec
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  // UI variables
  const amount = document.getElementById("amount");
  const intrest = document.getElementById("intrest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalIntrest = document.getElementById("total-intrest");

  // parseFloat = turn into decimal
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(intrest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  // Compute monhly payment
  // Pow = 2*<sup>3<sup> = 8
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    // 2 decimal points
    // .value to insert
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalIntrest.value = (monthly * calculatedPayment - principal).toFixed(2);

    // Show results after 2 sec
    document.getElementById("results").style.display = "block";

    // Hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    // If not finite
    // Show error
    showError("Please check your numbers");
  }
}

// showError
function showError(error) {
  // Hide loader & results
  document.getElementById("loading").style.display = "none";
  document.getElementById("results").style.display = "none";

  // Create a div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  // Create text node & append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert errorDiv before heading
  card.insertBefore(errorDiv, heading);

  // Clear errorDiv after 3 sec
  setTimeout(clearError, 3000);
}

// Clear errorDiv
function clearError() {
  document.querySelector(".alert").remove();
}

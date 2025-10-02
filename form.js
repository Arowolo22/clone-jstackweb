// Modal functionality
// Function to open the application form modal
function openApplicationForm() {
  document.getElementById("applicationModal").style.display = "block";
}

// Function to close the application form modal
function closeApplicationForm() {
  document.getElementById("applicationModal").style.display = "none";
}

// Event listener to close modal when clicking outside
// This creates a better user experience by allowing users to click outside to close
window.onclick = function (event) {
  const modal = document.getElementById("applicationModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Form submission handling
// This code runs when the user submits the application form
document
  .getElementById("applicationForm")
  .addEventListener("submit", async function (e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Collect form data into an object
    const formData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      reason: document.getElementById("reason").value,
    };

    try {
      // Send POST request to the server
      const response = await fetch("/submit-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Parse the server's response
      const data = await response.json();

      if (response.ok) {
        // If successful:
        alert("Application submitted successfully!");
        closeApplicationForm();
        document.getElementById("applicationForm").reset();
      } else {
        // If server returns an error:
        alert(
          data.message || "Error submitting application. Please try again."
        );
      }
    } catch (error) {
      // If there's a network error or other issue:
      console.error("Error:", error);
      alert("Error submitting application. Please try again.");
    }
  });

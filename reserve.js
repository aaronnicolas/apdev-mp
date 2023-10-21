
var datePicker = document.getElementById("datePicker");
var toggleButtons = document.querySelectorAll(".toggle-button");
var contents = document.querySelectorAll(".content");
var selectedFormattedDate = document.getElementById("selectedFormattedDate"); // Add this line

datePicker.addEventListener("change", function() {
    const selectedDateValue = datePicker.value;
    const dateObject = new Date(selectedDateValue);
    
    // Extract the month, day, and year
    const month = dateObject.toLocaleString('default', { month: 'long' });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();

    // Format the date as "Month Day, Year"
    const formattedDate = `${month} ${day}, ${year}`;

    // Display the formatted date
    selectedFormattedDate.textContent = formattedDate;
});


function toggleSeatStatus(chairElement) {
    // Find the status message and chair image in the same seat column
    const seatColumn = chairElement.parentElement;
    const statusMessage = seatColumn.querySelector(".status-message");
    const chairImage = seatColumn.querySelector(".chairIcon");

    // Check the current status
    if (statusMessage.textContent === "Status: Available") {
        // Change to reserved status and image
        statusMessage.textContent = "Status: Reserved";
        chairImage.src = "iconChairReserved.png";
    } else {
        // Change to available status and image
        statusMessage.textContent = "Status: Available";
        chairImage.src = "iconChairAvailable.png";
    }
}

// Add a click event listener to all chair images
const chairIcons = document.querySelectorAll(".chairIcon");
chairIcons.forEach(chairIcon => {
    chairIcon.addEventListener("click", () => {
        toggleSeatStatus(chairIcon);
    });
});

toggleButtons.forEach(function(button, index) {
    button.addEventListener("click", function() {
        if (contents[index].style.display === "none" || contents[index].style.display === "") {
            contents[index].style.display = "block";
        } else {
            contents[index].style.display = "none";
        }
    });
});
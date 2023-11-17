var datePicker = document.getElementById("datePicker");
var toggleButtons = document.querySelectorAll(".toggle-button");
var contents = document.querySelectorAll(".content");
var selectedFormattedDate = document.getElementById("selectedFormattedDate");
var accountNameElement = document.getElementById("account-name");
var accountName = accountNameElement.textContent;

let dropUpMenu = document.getElementById("drop-up-account-menu");
    
function toggleDropUpMenu(){
    dropUpMenu.classList.toggle("open-menu");
}

datePicker.addEventListener("change", function() {
    const selectedDateValue = datePicker.value;

    if (selectedDateValue) {
        const dateObject = new Date(selectedDateValue);
        const month = dateObject.toLocaleString('default', { month: 'long' });
        const day = dateObject.getDate();
        const year = dateObject.getFullYear();
        const formattedDate = `${month} ${day}, ${year}`;
        selectedFormattedDate.textContent = formattedDate;
    } else {
        // Display an error message in a pop-up window
        alert("You must pick a date first!");
    }
});

function toggleSeatStatus(chairElement) {
    // Check if a date has been selected
    const selectedDateValue = datePicker.value;

    if (!selectedDateValue) {
        // Display an error message in a pop-up window
        alert("You must pick a date first!");
        return;
    }

    // Rest of the code to toggle seat status
    const seatColumn = chairElement.parentElement;
    const statusMessage = seatColumn.querySelector(".status-message");
    const chairImage = seatColumn.querySelector(".chairIcon");

    if (statusMessage.textContent === "Status: Available") {
        statusMessage.textContent = "Status: Reserved by " + accountName;
        chairImage.src = "../images/reserve/iconChairReserved.png";
    } else if (statusMessage.textContent === "Status: Reserved by " + accountName) {
        statusMessage.textContent = "Status: Available";
        chairImage.src = "../images/reserve/iconChairAvailable.png";
    }
}

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

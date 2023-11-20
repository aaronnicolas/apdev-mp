var datePicker = document.getElementById("datePicker");
var toggleButtons = document.querySelectorAll(".toggle-button");
var contents = document.querySelectorAll(".content");
var selectedFormattedDate = document.getElementById("selectedFormattedDate");
var accountNameElement = document.getElementById("account-name");
var accountName = accountNameElement.textContent;
var reservedSeats = [];
var selectedDate;
const labNameElement = document.getElementById("labName");
const labName = labNameElement.textContent.trim();

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

        selectedDate = formattedDate;
    } else {
        // Display an error message in a pop-up window
        alert("You must pick a date first!");
    }
});

function toggleSeatStatus(chairElement, seatNumber, timeFrame) {
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
    const seatIndex = reservedSeats.findIndex(seat => seat.number === seatNumber);

    if (statusMessage.textContent === "Status: Available") {
        statusMessage.textContent = "Status: Selected";
        chairImage.src = "/static/images/reserve/iconChairSelected.png";
        reservedSeats.push({ number: seatNumber, time: timeFrame });
    } else if (statusMessage.textContent === "Status: Selected") {
        statusMessage.textContent = "Status: Available";
        chairImage.src = "/static/images/reserve/iconChairAvailable.png";
        reservedSeats.splice(seatIndex, 1);
    }
}

function reserveSelectedSeats() {
    if (reservedSeats.length === 0) {
        alert("No seats selected for reservation.");
    } else {
        reservedSeats.forEach(seat => {
            const seatColumns = document.querySelectorAll(`.seat-column[data-time="${seat.time}"]`);
            
            seatColumns.forEach(seatColumn => {
                const seatNumberDiv = seatColumn.querySelector("div");
                if (seatNumberDiv && seatNumberDiv.textContent.trim() === seat.number) {
                    const statusMessage = seatColumn.querySelector(".status-message");
                    const chairImage = seatColumn.querySelector(".chairIcon");

                    statusMessage.textContent = "Status: Reserved by " + accountName;
                    chairImage.src = "/static/images/reserve/iconChairReserved.png";
                }
            });
        });

        // Organize reserved seats by time frame
        const seatsByTime = reservedSeats.reduce((acc, seat) => {
            if (!acc[seat.time]) {
                acc[seat.time] = [];
            }
            acc[seat.time].push(seat.number);
            return acc;
        }, {});

        // Create confirmation message
        const confirmationMessage = Object.keys(seatsByTime).map(time => {
            const seatNumbers = seatsByTime[time].join(", ");
            return `Time: ${time}
            Seats: ${seatNumbers}
            Reserved by: ${accountName}
            `;
        }).join("\n");

        alert("Reserved seats:\nDate: " + selectedDate + "\nLab: " + labName + "\n" + confirmationMessage);


        // Reset the reservedSeats array
        reservedSeats = [];
    }
}


var reserveButton = document.getElementById("reserveButton");
reserveButton.addEventListener("click", reserveSelectedSeats);

const chairIcons = document.querySelectorAll(".chairIcon");

chairIcons.forEach((chairIcon) => {
    chairIcon.addEventListener("click", () => {
        const seatColumn = chairIcon.parentElement;
        const seatNumber = seatColumn.querySelector("div").textContent.trim();
        const timeFrame = seatColumn.dataset.time;

        toggleSeatStatus(chairIcon, seatNumber, timeFrame);
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

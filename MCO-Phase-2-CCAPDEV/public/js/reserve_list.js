var Reservation = function(labNum, roomNum, date, time, seatNum) {
    this.labNum = labNum;
    this.roomNum = roomNum;
    this.date = date;
    this.time = time;
    this.seatNum = seatNum;
}

var contents = document.querySelectorAll(".content");
var reservedSeats = [];

let reservations = [];
let num_reservations = 5;
let currentOption = "view";
let currentLab;

document.addEventListener("DOMContentLoaded", function() {
    // Find all elements with the class "lab-reservations"
    var labReservationElements = document.querySelectorAll('.lab-reservations');

    // Add a click event listener to each element
    labReservationElements.forEach(function(labReservationElement) {
        labReservationElement.addEventListener('click', function(event) {
            
            // Store the clicked reservation
            clickedReservationElement = labReservationElement;

            labReservationElements.forEach(function (element) {
                element.classList.remove('clicked');
            });

            labReservationElement.classList.add('clicked');

            if (currentOption === "view") {
                var labNumElement = event.target.querySelector('.labNum');
                var labNumber = labNumElement ? labNumElement.textContent : null;
                if (labNumber) {
                    goToLab(labNumber);
                }
            }

            else if (currentOption === "edit") {
                var editReservation = document.querySelector('.edit-reservation');
                var labReservation = document.querySelector('.lab-reservation-container');
                var options = document.querySelector('.options-container');
                document.querySelector('#center-pane').style.marginLeft = '15%';
                document.querySelector('.filler-text').style.display = 'none';
                editReservation.style.display = 'block';
                labReservation.style.display = 'none';
                options.style.display = 'none';
                document.documentElement.scrollTop = 0;

                var labNumElement = clickedReservationElement.querySelector('.labNum');
                var roomNumElement = clickedReservationElement.querySelector('.roomNum');
                var dateElement = clickedReservationElement.querySelector('.reserveDate');
                var timeElement = clickedReservationElement.querySelector('.reserveTime');
                var seatNumElement = clickedReservationElement.querySelector('.seatNum');

                // Accessing the text content from the extracted elements
                var labNumber = labNumElement ? labNumElement.textContent : null;
                var roomNumber = roomNumElement ? roomNumElement.textContent : null;
                var date = dateElement ? dateElement.textContent : null;
                var time = timeElement ? timeElement.textContent : null;
                var seatNumber = seatNumElement ? seatNumElement.textContent : null;

                switchLab(labNumber);
                const formattedDate = new Date(date);
                $("#datePicker").val(formatDate(formattedDate, 1));
                $("#tab-1").prop('checked', true);
            }

            else if (currentOption === "delete") {
                event.currentTarget.remove();
                num_reservations -= 1;
            }
                
            if (num_reservations === 0) {
                document.querySelector('.filler-text').style.display = 'none';
                displayNoReservationsMessage();
            }
        });
    });

    const chairIcons = document.querySelectorAll(".chairIcon");
    
    chairIcons.forEach((chairIcon) => {
        chairIcon.addEventListener("click", () => {
            const seatColumn = chairIcon.parentElement;
            const seatNumber = seatColumn.querySelector("div").textContent.trim();
            const timeFrame = seatColumn.dataset.time;

            toggleSeatStatus(chairIcon, seatNumber, timeFrame);
        });
    });

    function goToLab(number) {
        path = "reserveSystem/reserveLab" + number + ".html"
        window.location.href = path;
    }

    function displayNoReservationsMessage() {
        // Creating image element
        var imgElement = document.createElement("img");
        imgElement.setAttribute("id", "comp-sleep");
        imgElement.setAttribute("src", "images/homepage/sleeping-laptop.png");

        // Creating paragraph element
        var pElement = document.createElement("p");
        pElement.setAttribute("class", "filler-text");
        pElement.setAttribute("id", "no-reserve");
        var textNode = document.createTextNode("You haven't made any reservations in any of the labs yet!");
        pElement.appendChild(textNode);

        // Appending elements to the body
        document.body.appendChild(imgElement);
        document.body.appendChild(pElement);
    }

    // Function to convert the formatted date to "yyyy-MM-dd" format
    function formatDate(setDate, option) {
        var formattedDate;

        if (option === 1) {
            var month = (setDate.getMonth() + 1).toString().padStart(2, '0');
            var day = setDate.getDate().toString().padStart(2, '0');
            var year = setDate.getFullYear().toString();
            formattedDate = year + '-' + month + '-' + day;
        }
        else if (option === 2) {
            // Parse the date string into a Date object
            const dateObj = new Date(setDate);

            // Array of month names
            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            // Get the month, day, and year from the date object
            const month = monthNames[dateObj.getMonth()];
            const day = dateObj.getDate();
            const year = dateObj.getFullYear();

            // Construct the formatted date string
            formattedDate = `${month} ${day}, ${year}`;
        }
        return formattedDate;
    }

    function toggleSeatStatus(chairElement, seatNumber, timeFrame) {
        // Rest of the code to toggle seat status
        const seatColumn = chairElement.parentElement;
        const statusMessage = seatColumn.querySelector(".status-message");
        const chairImage = seatColumn.querySelector(".chairIcon");
        const seatIndex = reservedSeats.findIndex(seat => seat.number === seatNumber);
    
        if (statusMessage.textContent === "Status: Available") {
            statusMessage.textContent = "Status: Selected";
            chairImage.src = "/static/images/reserve/iconChairSelected.png";
            reservedSeats.push({ number: seatNumber, time: timeFrame });
        } 
        else if (statusMessage.textContent === "Status: Selected") {
            statusMessage.textContent = "Status: Available";
            chairImage.src = "/static/images/reserve/iconChairAvailable.png";
            reservedSeats.splice(seatIndex, 1);
        }
        console.log(reservedSeats);
    }
    
    function reserveSelectedSeats() {
        if (reservedSeats.length === 0) {
            alert("No seats selected for reservation.");
        } 
        else {
            reservedSeats.forEach(seat => {
                const seatColumns = document.querySelectorAll(`.seat-column[data-time="${seat.time}"]`);
                
                seatColumns.forEach(seatColumn => {
                    const seatNumberDiv = seatColumn.querySelector("div");
                    if (seatNumberDiv && seatNumberDiv.textContent.trim() === seat.number) {
                        const chairImage = seatColumn.querySelector(".chairIcon");
                        const statusMessage = seatColumn.querySelector(".status-message");
                        chairImage.src = "/static/images/reserve/iconChairReserved.png";
                        statusMessage.textContent = "Status: Reserved";
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
                `;
            }).join("\n");
    
            alert("Reserved seats:\n" + "\n\n" + confirmationMessage);

            // Add a new .time-seat-reservations div with the reserved data
            const timeSeatContainer = document.querySelector('.time-seat-container');

            Object.keys(seatsByTime).forEach(time => {
                const seatNumbers = seatsByTime[time].join(", ");

                // Create new elements
                const timeSeatReservations = document.createElement('div');
                timeSeatReservations.classList.add('time-seat-reservations');

                const timeElement = document.createElement('p');
                timeElement.innerHTML = `Time: <span class="reserveTime">${time}</span>`;

                const seatNumElement = document.createElement('p');
                seatNumElement.innerHTML = `Seat Number: <span class="seatNum">${seatNumbers}</span>`;

                // Append elements to the new div
                timeSeatReservations.appendChild(timeElement);
                timeSeatReservations.appendChild(seatNumElement);

                // Append the new div to the container
                timeSeatContainer.appendChild(timeSeatReservations);
            });
    
            // Reset the reservedSeats array
            reservedSeats = [];
            saveChanges();
        }
    }

    // Function to save changes
    function saveChanges() {
        // Get the selected values from the form
        let newLabNumber = currentLab;
        let newRoomNumber;
        
        if (newLabNumber === 1) {
            newRoomNumber = '101';
        } 
        else if (newLabNumber === 2) {
            newRoomNumber = '102';
        } 
        else if (newLabNumber === 3) {
            newRoomNumber = '103';
        }

        let newDate = $("#datePicker").val();
        newDate = formatDate(newDate, 2);

        // Update the content of the selected .lab-reservations div in reservation.html
        $(".lab-reservations.clicked .labNum").text(newLabNumber);
        $(".lab-reservations.clicked .roomNum").text(newRoomNumber);
        $(".lab-reservations.clicked .reserveDate").text(newDate);

        var editReservation = document.querySelector('.edit-reservation');
        var labReservation = document.querySelector('.lab-reservation-container');
        var options = document.querySelector('.options-container');
        document.querySelector('#center-pane').style.marginLeft = '30%';
        document.querySelector('.filler-text').style.display = 'flex';
        editReservation.style.display = 'none';
        labReservation.style.display = 'block';
        options.style.display = 'flex';
        document.documentElement.scrollTop = 0;
    }

    var reserveButton = document.getElementById("reserveButton");
    reserveButton.addEventListener("click", reserveSelectedSeats);
});

// Function to handle switching options
function switchOptions(option, button) {
    currentOption = option;

    // Remove 'clicked' class from all buttons
    document.querySelectorAll('.options').forEach(function (btn) {
        btn.classList.remove('clicked');
    });

    // Add 'clicked' class to the clicked button
    button.classList.add('clicked');
}

function switchLab(labNumber) {
    const labImages = document.querySelectorAll('.laboratory-picture');
    
    // Deselect all lab buttons
    labImages.forEach((labImage, index) => {
        labImage.classList.remove('clicked');
    });

    // Select the clicked lab button and set it as the current lab
    labImages[labNumber - 1].classList.add('clicked');
    currentLab = labNumber;
}
var Reservation = function(labNum, roomNum, date, time, seatNum) {
	this.labNum = labNum;
    this.roomNum = roomNum;
    this.date = date;
    this.time = time;
    this.seatNum = seatNum;
}

let reservations = [];
let num_reservations = 5;
let currentOption = "view";
let errorDate = "Date cannot be left unset.";

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
                var labNumber = labNumElement.textContent;
                goToLab(labNumber);
            }

            else if (currentOption === "edit") {
                var formContainer = document.querySelector('.form-container');
                var submitBtn = document.getElementById('submitBtn');

                formContainer.style.display = 'flex';
                submitBtn.style.display = 'block';

                // Populate the form with existing data
                var labNumElement = labReservationElement.querySelector('.labNum');
                var roomNumElement = labReservationElement.querySelector('.roomNum');
                var dateElement = labReservationElement.querySelector('.reserveDate');
                var timeElement = labReservationElement.querySelector('.reserveTime');
                var seatNumElement = labReservationElement.querySelector('.seatNum');

                document.getElementById('lab').value = labNumElement.textContent;
                document.getElementById('date').value = dateElement.textContent;
                document.getElementById('time').value = timeElement.textContent;
                document.getElementById('seat').value = seatNumElement.textContent;
            }

            else if (currentOption === "delete") {
                event.currentTarget.remove();
                num_reservations -= 1;
                
                if (num_reservations === 0) {
                    displayNoReservationsMessage();
                }
            }
        });
    });

    // Function to handle form submission
    document.getElementById('submitBtn').addEventListener('click', function () {
        if (clickedReservationElement) {
            var labNum = document.getElementById('lab').value;
            var date = document.getElementById('date').value;
            var time = document.getElementById('time').value;
            var seatNum = document.getElementById('seat').value;
    
            if (validateFields(date)) {
                var roomNum = (labNum === '1') ? '101' : ((labNum === '2') ? '102' : '103');
                var formattedDate = formatDate(date); // Format the date
                var updatedReservation = new Reservation(labNum, roomNum, formattedDate, time, seatNum);
        
                clickedReservationElement.innerHTML = `
                    <p>Lab Number: <span class="labNum">${updatedReservation.labNum}</span></p>
                    <p>Room Number: <span class="roomNum">${updatedReservation.roomNum}</span></p>
                    <p>Date: <span class="reserveDate">${updatedReservation.date}</span></p>
                    <p>Time: <span class="reserveTime">${updatedReservation.time}</span></p>
                    <p>Seat Number: <span class="seatNum">${updatedReservation.seatNum}</span></p>
                `;
        
                document.getElementById('editForm').reset();
                document.querySelector('.form-container').style.display = 'none';
                document.getElementById('submitBtn').style.display = 'none';
            }
        }
    });

    function validateFields(date) {
        let isValid = true;
        document.getElementById('errorText').style.display = "none";
        
        if (date === "") {
            document.getElementById('errorText').style.display = "flex";
            showError(errorDate)
            isValid = false;
        }

        return isValid;
    }

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

    // Function to format the date as "Month Day, Year"
    function formatDate(inputDate) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var formattedDate = new Date(inputDate).toLocaleDateString(undefined, options);
        return formattedDate;
    }

    function showError(errorText) {
		document.querySelector("#errorText").innerHTML = errorText;
	}
});

// Function to handle switching options
function switchOptions(option) {
    currentOption = option;
    var formContainer = document.querySelector('.form-container');
    var submitBtn = document.getElementById('submitBtn');

    if (currentOption === "edit") {
        formContainer.style.display = 'flex';
        submitBtn.style.display = 'none';
    }
    else {
        formContainer.style.display = 'none';
        submitBtn.style.display = 'none';
    }
}
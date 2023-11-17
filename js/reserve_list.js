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

document.addEventListener("DOMContentLoaded", function() {
    // Find all elements with the class "lab-reservations"
    var labReservationElements = document.querySelectorAll('.lab-reservations');

    // Add a click event listener to each element
    labReservationElements.forEach(function(labReservationElement) {
        labReservationElement.addEventListener('click', function(event) {
            
            if (currentOption === "view") {
                var labNumElement = event.target.querySelector('.labNum');
                var labNumber = labNumElement.textContent;
                goToLab(labNumber);
            }

            else if (currentOption === "edit") {
                // Iterate over child elements and edit the values within <span> tags
                labReservationElement.querySelectorAll('span').forEach(function(spanElement) {
                    editData(spanElement);
                });
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

    function goToLab(number) {
        path = "reserveSystem/reserveLab" + number + ".html"
        window.location.href = path;
    }

    function editData(spanElement) {
        var label = spanElement.parentNode.textContent.replace(spanElement.textContent, '').trim();
        var newValue = prompt("Enter the new value for " + label);
        if (newValue !== null) {
            spanElement.textContent = newValue;
        }
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

});

function switchOptions(option) {
    currentOption = option;
}
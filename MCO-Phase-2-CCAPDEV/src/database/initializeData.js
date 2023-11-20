import Lab from "../models/Lab.js";
import Reservation from "../models/Reservations.js";

// Define an array of lab data
const labDataArray = [
  {
    id: "laboratory-one",
    imageSrc: "images/homepage/laboratory-1.jpg",
    name: "Laboratory 1",
    room: "Room 101",
  },
  {
    id: "laboratory-two",
    imageSrc: "images/homepage/laboratory-2.jpg",
    name: "Laboratory 2",
    room: "Room 102",
  },
  {
    id: "laboratory-three",
    imageSrc: "images/homepage/laboratory-3.jpg",
    name: "Laboratory 3",
    room: "Room 103",
  },
  {
    id: "laboratory-four",
    imageSrc: "images/homepage/laboratory-1.jpg",
    name: "Laboratory 4",
    room: "Room 104",
  },
  {
    id: "laboratory-five",
    imageSrc: "images/homepage/laboratory-2.jpg",
    name: "Laboratory 5",
    room: "Room 105",
  },
];

const reservationsData = [
  {
    id: 0,
    labNum: 1,
    roomNum: 101,
    reserveDate: "November 13, 2023",
    timeSeatReservations: [
      { reserveTime: "12:00pm to 12:30pm", seatNum: "5, 6, 8" },
      { reserveTime: "1:30pm to 2:00pm", seatNum: "1, 5, 10" }
    ]
  },
  {
    id: 1,
    labNum: 2,
    roomNum: 102,
    reserveDate: "November 17, 2023",
    timeSeatReservations: [
      { reserveTime: "12:00pm to 12:30pm", seatNum: "5, 6, 8" },
      { reserveTime: "12:30pm to 1:00pm", seatNum: "2, 7" }
    ]
  },
  {
    id: 2,
    labNum: 3,
    roomNum: 103,
    reserveDate: "November 25, 2023",
    timeSeatReservations: [
      { reserveTime: "12:30pm to 1:00pm", seatNum: "2, 7" },
    ]
  },
  {
    id: 3,
    labNum: 4,
    roomNum: 104,
    reserveDate: "December 5, 2023",
    timeSeatReservations: [
      { reserveTime: "12:00pm to 12:30pm", seatNum: "5, 6, 8" },
      { reserveTime: "12:30pm to 1:00pm", seatNum: "2, 7" },
      { reserveTime: "1:30pm to 2:00pm", seatNum: "1, 5, 10" }
    ]
  },
  {
    id: 4,
    labNum: 5,
    roomNum: 105,
    reserveDate: "December 17, 2023",
    timeSeatReservations: [
      { reserveTime: "12:00pm to 12:30pm", seatNum: "5, 6, 8" },
      { reserveTime: "12:30pm to 1:00pm", seatNum: "2, 7" },
      { reserveTime: "1:00pm to 1:30pm", seatNum: "4, 5" },
      { reserveTime: "1:30pm to 2:00pm", seatNum: "1, 5, 10" }
    ]
  },
];


// Insert the data into the Lab collection
const initializeData = async () => {
  try {
    const labs = await Lab.insertMany(labDataArray);
    console.log("Lab data initialized successfully:", labs);

    const reservations = await Reservation.insertMany(reservationsData);
    console.log("Reservations data initialized successfully:", reservations);
  } catch (err) {
    // Check if the error is due to duplicate key (replication)
    if (err.code === 11000) {
      console.log("Data already exists in the database. Skipped insertion.");
    } else {
      console.error("Error initializing data:", err);
    }
  }
};

export default initializeData;
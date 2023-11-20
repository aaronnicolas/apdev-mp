import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define the reservation schema
const reservationSchema = new Schema({
    id: { type: String, unique: true },
    labNum: Number,
    roomNum: Number,
    reserveDate: String,
    timeSeatReservations: [
        {
            reserveTime: String,
            seatNum: String,
        },
    ],
});

// Create the Reservation model
const Reservation = model('Reservation', reservationSchema);

export default Reservation;

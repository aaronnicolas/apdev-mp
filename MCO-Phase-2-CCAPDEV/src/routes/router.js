import express from 'express';
import Lab from '../models/Lab.js';
import Reservation from '../models/Reservations.js';


const routes = express.Router();

// Define your routes here
routes.get("/", async function (req, res) {
    try {
        const laboratories = await Lab.find();
        const data = {
            title: "ReservaLab",
            username: "Crinkle Joe",
            style: "index.css",
            laboratories: laboratories.map(lab => ({
                id: lab._id,
                link: "/lab/" + lab._id,
                imageSrc: lab.imageSrc,
                name: lab.name,
                room: lab.room
            }))
        };
        res.render("index", data);
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        res.status(500).send('Something went wrong!');
    }
});

routes.get("/login", function(req, res) {
    var data = {
        style: "login.css"
    }
    res.render("login", data);
});

routes.get("/profile", function(req, res) {
    var data = {
        username: "Crinkle Joe",
        style: "profile.css"
    }
    res.render("profile", data);
});

routes.get("/reservelist", async function(req, res) {

    const reservations = await Reservation.find();
    var data = {
        username: "Crinkle Joe",
        style: "style-reservation.css",
        tabs: [
            {
                tabNum: 1,
                time: "12:00pm to 12:30pm",
                checked: true,
                seats: [
                    { seatName: "Seat 1", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 2", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 3", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 4", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 5", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 6", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 7", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 8", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 9", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 10", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                ]
            },
            {
                tabNum: 2,
                time: "12:30pm to 1:00pm",
                checked: false,
                seats: [
                    { seatName: "Seat 1", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 2", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 3", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 4", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 5", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 6", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 7", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 8", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 9", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 10", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                ]
            },
            {
                tabNum: 3,
                time: "1:00pm to 1:30pm",
                checked: false,
                seats: [
                    { seatName: "Seat 1", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 2", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 3", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 4", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 5", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 6", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 7", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 8", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 9", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 10", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                ]
            },
            {
                tabNum: 4,
                time: "1:30pm to 2:00pm",
                checked: false,
                seats: [
                    { seatName: "Seat 1", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 2", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 3", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 4", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 5", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 6", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 7", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 8", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 9", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    { seatName: "Seat 10", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                ]
            },
        ],
        reservations: reservations.map(reserve => ({
            id: reserve.id,
            labNum: reserve.labNum,
            roomNum: reserve.roomNum,
            reserveDate: reserve.reserveDate,
            timeSeatReservations: reserve.timeSeatReservations.map(timeSeat => ({
                reserveTime: timeSeat.reserveTime,
                seatNum: timeSeat.seatNum.split(',').map(num => num.trim()), // Convert seatNum to an array
            })),
        }))
    }
    res.render("reservation", data);
});

routes.route("/lab/:id").get(async function (req, res) {
    try {
        const lab = await Lab.findById(req.params.id);
        const data = {
            style: "reserve.css",
            username: "Crinkle Joe",
            lab: {
                id: lab._id,
                imageSrc: lab.imageSrc,
                name: lab.name,
                room: lab.room
            },
            tabs: [
                {
                    tabNum: 1,
                    time: "12:00pm to 12:30pm",
                    checked: true,
                    seats: [
                        { seatName: "Seat 1", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 2", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 3", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 4", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 5", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 6", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 7", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 8", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 9", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 10", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    ]
                },
                {
                    tabNum: 2,
                    time: "12:30pm to 1:00pm",
                    checked: false,
                    seats: [
                        { seatName: "Seat 1", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 2", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 3", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 4", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 5", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 6", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 7", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 8", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 9", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 10", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    ]
                },
                {
                    tabNum: 3,
                    time: "1:00pm to 1:30pm",
                    checked: false,
                    seats: [
                        { seatName: "Seat 1", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 2", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 3", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 4", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 5", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 6", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 7", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 8", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 9", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 10", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    ]
                },
                {
                    tabNum: 4,
                    time: "1:30pm to 2:00pm",
                    checked: false,
                    seats: [
                        { seatName: "Seat 1", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 2", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 3", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 4", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 5", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 6", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 7", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 8", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 9", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                        { seatName: "Seat 10", image: "/static/images/reserve/iconChairAvailable.png", status: "Available" },
                    ]
                },
            ]
        };
        res.render("reserveLab", data);
    } catch (error) {
        console.error("Error fetching lab data from MongoDB:", error);
        res.status(500).send('Something went wrong!');
    }
});

routes.route("/lab/:id").get(function (req, res) {
    Lab.findById(req.params.id).then((lab) => {
        res.json(lab);
        res.end();
    });
});

routes.route("/labs").get(function (req, res) {
    Lab.find().then((labs) => {
        res.json(labs);
        res.end();
    });
});

routes.route("/labs").post(function (req, res) {
    const lab = new Lab({
        id: req.body.id,
        link: req.body.link,
        imageSrc: req.body.imageSrc,
        name: req.body.name,
        room: req.body.room
    });
    lab.save();
    res.json({ message: "Lab Saved" });
});

export default routes;
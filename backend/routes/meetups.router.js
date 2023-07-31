const express = require("express");
const meetupsRouter = express.Router();

const { MeetUpsmodel } = require("../models/meetups.model");
const { Usermodel } = require("../models/user.model");
const { authenticator } = require("../middlewares/authenticator.middleware");
const { authorizer } = require("../middlewares/authorizer.middleware");
const { sendMailFn } = require("../nodemailer/mailer");


meetupsRouter.post("/meetups", authenticator, authorizer(["freshman"]), async (req, res) => {
    const { senior_id, date, time_slot, userID } = req.body;
    try {
        const exist = await MeetUpsmodel.findOne({ senior_id, date, time_slot }) || await MeetUpsmodel.findOne({ patient_id: userID, date, time_slot });
        console.log(exist);
        if (exist) {
            res.status(409).json({ "msg": `Slot already Booked for date:${date} and time:${time_slot},\n Please choose any other slot` });
        } else {
            const user = await Usermodel.findOne({ _id: userID });
            const user_email = user.email;
            const subject = "MeetUps Confirmation";
            const text = `Dear ${user.name},\n\nThank you for booking your meetups. We are pleased to confirm your meetups on ${date} at ${time_slot}.\n\nPlease join 10 minutes before your scheduled time and bring any necessary questions penned down.\n\nIf you have any questions, please contact us at your earliest convenience.\n\nWe look forward to seeing you.\n\nBest regards,\nThe MeetUps Team`;            
            sendMailFn(user_email,subject,text);
            const meetups = new MeetUpsmodel({ senior_id, date, time_slot, freshman_id: userID });
            await meetups.save();
            res.status(202).json({ "msg": "meetups created successfully" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ "msg": "something went wrong while creating new meetup" });
    }
})



meetupsRouter.get("/meetups", authenticator, authorizer(["freshman", "senior"]), async (req, res) => {
    const { userID, userRole } = req.body;
    try {
        if (userRole == "senior") {
            const meetups = await MeetUpsmodel.find({ senior_id: userID }).populate("senior_id freshman_id");
            res.status(200).json({ "msg": "meetups fetched successfully", "data": meetups, userRole });
        } else if (userRole == "freshman") {
            const meetups = await MeetUpsmodel.find({ freshman_id: userID }).populate("senior_id freshman_id");
            res.status(200).json({ "msg": "meetups fetched successfully", "data": meetups, userRole });
        }

    } catch (error) {
        console.log(error.message);
        res.status(400).json({ "msg": "something went wrong while creating getting meetups" });
    }
})


meetupsRouter.delete("/meetups/:id", authenticator, authorizer(["freshman"]), async (req, res) => {
    const id = req.params.id;
    const{userID}=req.body;
    try {
        const user = await Usermodel.findOne({ _id: userID });
        const meetups=await MeetUpsmodel.findOne({_id:id});
        const user_email = user.email;
        const subject = "MeetUps Cancellation";
        const text = `Dear ${user.name},\n\nWe would like to inform you that your meetups on ${meetups.date} at ${meetups.time_slot} has been successfully cancelled as per your request.\n\nIf you have any questions or need further assistance, please don't hesitate to reach out to us.\n\nWe apologize for any inconvenience caused.\n\nBest regards,\nThe Meetups Team`;
        
        sendMailFn(user_email,subject,text);
        const deleted_appointment = await MeetUpsmodel.findByIdAndDelete(id);
        res.status(200).json({ "msg": 'MeetUps canceled successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ "msg": "something went wrong while canceling meetups" });
    }
})



module.exports = {
    meetupsRouter
}

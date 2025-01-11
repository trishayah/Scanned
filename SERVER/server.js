const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/Scanned';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('connected to db')
  })
  .catch((e) => {
    console.log(e)
  })

const schema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  dateOfBirth: String,
  placeOfBirth: String,
  contactNumber: String,
  email: String,
  sex: String,
  maritalStatus: String,
  religion: String,
  citizenship: String,
  height: String,
  weight: String,
  address: String,
  zipCode: String,
  MFname: String,
  MMname: String,
  MLname: String,
  MDOB: String,
  MPOB: String,
  MOccupation: String,
  MContact: String,
  MEmail: String,
  FFname: String,
  FMname: String,
  FLname: String,
  FDOB: String,
  FPOB: String,
  FOccupation: String,
  FContact: String,
  FEmail: String,
  image: String,
});

const dataModel = mongoose.model('HCI', schema, 'HCI');

app.post('/registration', async (req, res) => {
  try {
    const data = new dataModel({
      firstName: req.body.users.firstName,
      middleName: req.body.users.middleName,
      lastName: req.body.users.lastName,
      dateOfBirth: req.body.users.dateOfBirth,
      placeOfBirth: req.body.users.placeOfBirth,
      contactNumber: req.body.users.contactNumber,
      email: req.body.users.email,
      sex: req.body.users.sex,
      maritalStatus: req.body.users.maritalStatus,
      religion: req.body.users.religion,
      citizenship: req.body.users.citizenship,
      height: req.body.users.height,
      weight: req.body.users.weight,
      address: req.body.users.address,
      zipCode: req.body.users.zipCode,
      MFname: req.body.users.MFname,
      MMname: req.body.users.MMname,
      MLname: req.body.users.MLname,
      MDOB: req.body.users.MDOB,
      MPOB: req.body.users.MPOB,
      MOccupation: req.body.users.MOccupation,
      MContact: req.body.users.MContact,
      MEmail: req.body.users.MEmail,
      FFname: req.body.users.FFname,
      FMname: req.body.users.FMname,
      FLname: req.body.users.FLname,
      FDOB: req.body.users.FDOB,
      FPOB: req.body.users.FPOB,
      FOccupation: req.body.users.FOccupation,
      FContact: req.body.users.FContact,
      FEmail: req.body.users.FEmail,
      image: req.body.image,
    });
    console.log('Request received at /registration:', req.body);

    await data.save();
    res.status(200).json({
      message: 'Image and metadata uploaded successfully',
      data: data,
    });
  } catch (err) {
    console.error('Error saving data to MongoDB:', err);
    res.status(500).json({ message: 'Error saving data to MongoDB', error: err });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

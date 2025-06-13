const {
  createContact,
  getAllContact,
  getOneContact,
  deleteOneContact,
  deleteContact,
} = require("../controller/contact.controller");
const express = require('express').Router()

const contactRoute = express

contactRoute.post('/create-contact',createContact)
contactRoute.get('/get-contact',getAllContact)
contactRoute.get('/get-contact/:id',getOneContact)
contactRoute.delete('/delete-contact/:id',deleteOneContact)
contactRoute.delete('/create-contact',deleteContact)


module.exports = contactRoute
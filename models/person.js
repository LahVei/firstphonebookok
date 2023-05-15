require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI
console.log('connecting to', url)
console.log('connecting to', process.env.PORT)
//mongodb+srv://milky:felDB@milkyway.sgse8eg.mongodb.net/Phonebook?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://milky:felDB@milkyway.sgse8eg.mongodb.net/Phonebook?retryWrites=true&w=majority')
.then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})
//muokataan kannasta haettavilla olioilla olevan toJSON-metodin palauttamaa muotoa
//poistetaan versio kenttä __v (todellisuudessa olio ei string)
//toJSON muuttaa sen merkkijonoksi 

const noteSchema = new mongoose.Schema({
  //mongoosen sisäänrakennettuja validointisääntöjä
    name:{ 
          type:String,
          minlength:3,
          required:true
    },
    number: String,
  })
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  })
//const Person = mongoose.model('Person', noteSchema)
module.exports = mongoose.model('Person', noteSchema)
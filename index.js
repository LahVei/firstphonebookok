const express = require('express')
const cors = require('cors')
const Person = require('./models/person')
const app = express()
 
app.use(express.static('build'))
app.use(express.json())

require('dotenv').config()
console.log('nyt backendissä ollaan')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
 
  console.log('---')
  next()
}

app.use(requestLogger)
 
app.get('/api/persons', (request, response,next) => {
console.log('tulee renderiin --> user app yritys haku db')
Person.find({})
.then(items => {
  response.json(items)
}) 
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})
app.get('/api/info', (request, response) => {
  Person.find({})
  .then(items => {
    const pituus = items.length
    const d = new Date();
    let time = d.toLocaleString();
    response.send(`<p>Phonebook has info for ${pituus} people</><p>${time}`)
  }) 
  .catch(error => {
    console.log(error)
    next(error)
  })
})
 
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})
// return axios.post(baseUrl,newPerson).then(res=>res.data)
//app.get('/api/persons', (request, response,next) => {
 app.post('/api/persons', (request, response) => {
  console.log('data lisäys tietokantaan')
  const body = request.body
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }
    const person = new Person({
      name: body.name,
      number: body.number,
    })
    
    person.save().then(savedPerson => {
      response.json(savedPerson )
    })
    .catch(error=>{
      console.log(error)
      next(error)
    })
  
})
app.put('/api/persons/:id', (request, response,next) => {
  const body = request.body
  const changedPerson = 
    {
      name:body.name,
      number:body.number,
    }
    Person.findByIdAndUpdate(request.params.id, changedPerson, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT||3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


//app.use(cors())

  //Expressiin sisäänrakennettua middlewarea static näyttää
//staattista sisältöä eli sivun index.html ja sen lataaman JavaScriptin 
//tarkistaa build kansiosta index.html

//Expressenin middleware muuttaa post pyynnöissä mukana olevan JSON-muotoisen 
//datan JavaScript-olioksi ja sijoittaa sen request olion kenttään body.
//Middlewaret ovat funktioita, joiden avulla voidaan käsitellä request- ja response-olioita

// tulostaa konsoliin palvelimelle tulevien pyyntöjen perustietoja.
// json-parseri tulee ottaa käyttöön ennen middlewarea requestLogger, 
//muuten request.body ei ole vielä alustettu loggeria suoritettaessa!

 //console.log('headers:  ', request.headers)

 //tämä middleware tulee ottaa käyttöön ennen routeja

 //Mongo haetaan data tietokannasta ja tulostetaan konsoliin
/*
Person.find({}).then(result => {
  result.forEach(item => {
    console.log(item)
  }) 
})
*/
/*
const person = new Person({
  name: 'Samuli',
  number: '34566'
})
person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})
 */

  //kutsuu jokaiselle tietokannasta luettavalle muistiinpanolle 
  //automaattisesti metodia toJSON muodostaessaan vastausta.
  //const Person = mongoose.model('Person', noteSchema)

    //virhetilanteen käsittelyä siirretään eteenpäin funktiolla next

       
  /*app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  */

      
    //person.forEach(item => {
     // console.log(item)
   // })
   
    //mongoose.connection.close()
  //})

    /*if (person) {
      response.json(person)
    } else {
    //metodia end ilmoittamaan siitä, että pyyntöön tulee vastata ilman dataa.
      response.status(404).end()
      /*Lisätään routen jälkeen middleware, jonka 
      ansiosta saadaan routen käsittelemättömästä virhetilanteesta 
      JSON-muotoinen virheilmoitus: 
    }*/

         //persons = persons.filter(item => item.id !== id)

     //returnin kutsuminen on tärkeää. Ilman kutsua koodi jatkaisi suoritusta metodin 
    //loppuun asti, ja virheellinen muistiinpano tallettuisi!

        /*if(persons.find(item=>item.name === body.name)){
        return response.status(400).json({ 
          error: 'name must be unique' 
        })
      }*/

       //persons = persons.concat(person)

         // numeron vaihto

             //persons = persons.filter(item => item.id != id)
    //persons = persons.concat(changedPerson)
    //response.json(changedPerson)

      //routejen käsittelemättömistä virhetilanteista palautetaan JSON-muotoinen virheilmoitus

          //Jos funktion next kutsussa annetaan parametri, siirtyy käsittely 
    //virheidenkäsittelymiddlewarelle, muuten siirtyy seuraavalle routelle tai middlewarelle

      // tämä tulee kaikkien muiden middlewarejen rekisteröintien jälkeen!

      /*app.listen(PORT)
console.log(`Server running on port ${PORT}`)*/
//Ympäristömuuttja

//DB
//mongodb+srv://fellow90:<password>@milkyway.r8adrjm.mongodb.net/?retryWrites=true&w=majority

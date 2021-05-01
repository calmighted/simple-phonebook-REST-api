console.log("hello rest!")
const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()


app.use(express.json())


let persons = [
    {
        id:1,
        name:"Arto Hellas",
        number:"0642962786"
    },
    {
        id:2,
        name:"Ada Lovelace",
        number:"98-34-986-734"
    },
    {
        id:3,
        name:"Dan Abramov",
        number:"89736487638"
    },
    {
        id:4,
        name:"Mary poppendick",
        number:"87964876733"
    },
    
]


app.get('/',(req,res) => {
    res.send('<h1>Phone Book </h1>')
})

app.get('/api/persons',(req,res) => {
    res.send(persons)
})

app.get('/info',(req,res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
        ${new Date()}
    `)
})



app.get('/api/persons/:id',(req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id',(req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})





const userExists = (name) => {
    return persons.some(function(el) {
      return el.name === name;
    });

}

app.post('/api/persons',(req,res) => {
    const body = req.body.person
    console.log(body)


    if(userExists(body.name)){
        return res.status(400).json({
            error:"name must be unique"
        })
    }


    if(!body.name){
        return res.status(400).json({
            error:'Name is missing'
        })
    }
    else if(!body.number){
        return res.status(400).json({
            error:'Number is missing'
        })
    }

   const person = {
       name:body.name,
       number:body.number,
       id: uuidv4()
    }

    persons = persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT,() => {
    console.log(`server is running at port ${PORT}`)
})
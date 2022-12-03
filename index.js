const express = require('express')
const app = express()
var cors = require('cors')
const fs = require('fs');
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const books = require("./db")
const items = require("./products")
const sizes = require("./size")

const saveBook = (data) => {
    let results = JSON.stringify(data);
    fs.writeFileSync("db.json", results)
}

app.get('/books', (req, res) => {
    books.map(x => {
        x.name = items.find(f=> f.id == x.productsId)?.name
    })
    res.send(books)
})

app.get('/books/:id', (req, res) => {
    res.send(books.find(x => x.id == req.params.id))
})

app.post('/books', (req, res) => {
    req.body.id = Math.max(...books.map(o => o.id), 0) + 1;
    books.push(req.body)
    saveBook(books)
    res.status(201).json(req.body)
})

app.put('/books/:id', (req, res) => {
    const updateIndex = books.findIndex(x => x.id == req.params.id)
    Object.assign(books[updateIndex], req.body)
    saveBook(books)
    res.status(200).json(req.body)
})

app.delete('/books/:id', (req, res) => {
    const deletedIndex = books.findIndex(book => book.id == req.params.id)
    if (deletedIndex > -1)
        books.splice(deletedIndex, 1)
    saveBook(books)
    res.status(204).send()
})



app.get('/items', (req, res) => {
    res.send(items)
})

app.get('/items/:id', (req, res) => {
    res.send(items.find(x => x.id == req.params.id))
})

app.post('/items', (req, res) => {
    req.body.id = Math.max(...items.map(o => o.id), 0) + 1;
    items.push(req.body)
    saveBook(items)
    res.status(201).json(req.body)
})

app.put('/items/:id', (req, res) => {
    const updateIndex = items.findIndex(x => x.id == req.params.id)
    Object.assign(items[updateIndex], req.body)
    saveBook(items)
    res.status(200).json(req.body)
})

app.delete('/items/:id', (req, res) => {
    const deletedIndex = items.findIndex(items => items.id == req.params.id)
    if (deletedIndex > -1)
        items.splice(deletedIndex, 1)
    saveBook(items)
    res.status(204).send()
})








app.get('/size', (req, res) => {
    res.send(sizes)
})

app.get('/size/:id', (req, res) => {
    res.send(sizes.find(x => x.id == req.params.id))
})

app.post('/size', (req, res) => {
    req.body.id = Math.max(...sizes.map(o => o.id), 0) + 1;
    sizes.push(req.body)
    saveBook(sizes)
    res.status(201).json(req.body)
})

app.put('/size/:id', (req, res) => {
    const updateIndex = sizes.findIndex(x => x.id == req.params.id)
    Object.assign(sizes[updateIndex], req.body)
    saveBook(sizes)
    res.status(200).json(req.body)
})

app.delete('/size/:id', (req, res) => {
    const deletedIndex = sizes.findIndex(sizes => sizes.id == req.params.id)
    if (deletedIndex > -1)
        sizes.splice(deletedIndex, 1)
    saveBook(sizes)
    res.status(204).send()
})
app.listen(3000, () => {
    console.log('Start server at port 3000.')
})



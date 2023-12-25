// Create web server
// Import express
const express = require('express')
const app = express()

// Import body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Import cors
const cors = require('cors')
app.use(cors())

// Import mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true })

// Create model
const Comment = mongoose.model('comment', {
    name: String,
    message: String,
    date: String
})

// Get all comments
app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find()
        res.send(comments)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Get comment by id
app.get('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        res.send(comment)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Add new comment
app.post('/comments', async (req, res) => {
    try {
        const comment = new Comment(req.body)
        await comment.save()
        res.send(comment)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Update comment by id
app.patch('/comments/:id', async (req, res) => {
    try {
        await Comment.findByIdAndUpdate(req.params.id, req.body)
        await Comment.save()
        res.send(comment)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Delete comment by id
app.delete('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id)
        if (!comment) res.status(404).send('No item found')
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// Listen to port
app.listen(3000, () => {
    console.log('Server is running')
})

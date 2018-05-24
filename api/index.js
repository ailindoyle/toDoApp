const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;

app.use(express.json())
app.use(express.urlencoded())

//mongo stuff
const url = 'mongodb://localhost:27017/toDo'

app.get('/api/tasks', function(req, res) {

    MongoClient.connect(url, function(err, client) {
        let db = client.db('toDo')
        getTasksFromDb(db)
    })

    let getTasksFromDb = function (db) {
        let tasksCollection = db.collection('tasks')
        tasksCollection.find({}).toArray(function (err, docs) {
            res.json(docs)
        })
    }

})

app.post('/api/task', function(req, res) {

    MongoClient.connect(url, function(err, client) {
        let db = client.db('toDo')
        insertTaskToDb(db, newTask)
    })

    let newTask = req.body.task

    let insertTaskToDb = function(db, newTask) {
        let tasksCollection = db.collection('tasks')
        tasksCollection.insertOne({ "task" : newTask }, function(err, result) {
            res.json({"success" : "true", "msg" : "Task has saved successfully", "data" : []})
        })
    }

})

app.put('/api/task', function(req, res) {

    MongoClient.connect(url, function(err, client) {
        let db = client.db('toDo')
        updateTaskInDb(db, id, task, completeFlag)
    })

    let id = req.body._id
    let task = req.body.task
    let completeFlag = req.body.completed

    let updateTaskInDb = function(db, id, task, completeFlag) {
        let tasksCollection = db.collection('tasks')
        tasksCollection.updateOne(
            { _id : ObjectID(id) },
            { $set :
                    {
                    task : task,
                    completed : completeFlag
                    }
            },
            function (err, result) {
                // res.json(result)
                res.json({"success" : "true", "msg" : "Task has updated successfully", "data" : []})
        })
    }

})

app.delete('/api/task', function(req, res) {

    MongoClient.connect(url, function(err, client) {
        let db = client.db('toDo')
        removeTaskFromDb(db, id, deleteFlag)
    })

    let id = req.body._id
    let deleteFlag = req.body.deleted

    let removeTaskFromDb = function(db, id, deleteFlag) {
        let tasksCollection = db.collection('tasks')
        tasksCollection.updateOne(
            { _id : ObjectID(id) },
            { $set:
                    {
                        deleted : deleteFlag
                    }
            },
            function (err, result) {
                //res.json(result)
                res.json({"success" : "true", "msg" : "Task has been deleted", "data" : []})
        })
    }

})

app.listen(3000, () => console.log('Listening on port 3000'))
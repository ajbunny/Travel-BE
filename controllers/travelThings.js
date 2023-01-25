const express = require('express');
const router = express.Router();
const Travel = require('../models/travelThingsdb.js');


//INDEX
router.get('/', (req, res) =>{
    Travel.find({}, (err, foundTravel) =>{
        res.json(foundTravel);
    });
});

//New will be handled by React applications
//DELETE
router.delete('/:id',(req, res) =>{
    Travel.findByIdAndRemove(req.params.id, (err, deletedTravel)=>{
            res.json(deletedTravel);
        });
    });

//UPDATE
router.put('/:id', (req, res)=>{
    Travel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTravel)=>{
        res.json(updatedTravel);
    });
});
// CREATE
router.post('/', (req, res)=>{
    Travel.create(req.body, (err, createdTravel)=>{
        res.json(createdTravel); //.json() will send proper headers in response so client knows it's json coming back
    });
});
// EDIT - Will be handled by React application
// Show
router.get('/:id', (req, res)=>{
    Travel.findById(req.params.id, (err, foundTravel)=>{
        res.json(foundTravel);
    });
});


module.exports = router;
const router = require('express').Router();

// User model
const User = require('../models/User');

// GET
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({error: error});
    };
});

// POST
router.post('/', async (req, res) => {
    try {
        if (!req.body.name || !req.body.salary || req.body.approved === null) {
            res.status(422).json({error: 'invalid param'});
            return;
        } else {
            const {name, salary, approved} = req.body;
    
            const user = {
                name,
                salary,
                approved
            };
            
            await User.create(user);
            res.status(201).json({message: 'user created'});
        }
    } catch (error) {
        res.status(500).json({error: error});
    };
});

// GET by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});

        if (!user) {
            res.status(404).json({error: 'user not found'});
            return;
        } else {
            res.status(200).json({user});
        }
    } catch (error) {
        res.status(500).json({error: error});
    };
});

// PUT
router.put('/:id', async (req, res) => {
    try {
        const isPresent = await User.findOne({_id: req.params.id});

        if (!isPresent) {
            res.status(404).json({error: 'user not found'});
            return;
        } else if (!req.body.name || !req.body.salary || req.body.approved === null) {
            res.status(422).json({error: 'invalid param'});
            return;
        } else {
            const {name, salary, approved} = req.body;
    
            const user = {
                name,
                salary,
                approved
            };

            const updateUser = await User.updateOne({_id: req.params.id}, user);
            res.status(200).json({user});
        }
    } catch (error) {
        res.status(500).json({error: error});
    };
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});

        if (!user) {
            res.status(404).json({error: 'user not found'});
            return;
        } else {
            await User.deleteOne({_id: req.params.id});
            res.status(200).json({message: 'user deleted'});
        }
    } catch (error) {
        res.status(500).json({error: error});
    };
});

// export router
module.exports = router;
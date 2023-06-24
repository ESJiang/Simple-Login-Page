const express = require('express');
const router = express.Router();
const user = { name: 'Jack', password: '123456' };
router.post('/login', (req, res) => {
    //res.send(req.body); respond to front end
    const response = req.body;
    console.log('success', response); // print in terminal
    if (response.name === user.name && response.password === user.password) {
        res.status(200).json({
            msg: response.name + ' ' + 'login successfully',
        });
    } else {
        res.status(400).json({
            msg: 'username or password incorrect',
        });
    }
});

module.exports = router;

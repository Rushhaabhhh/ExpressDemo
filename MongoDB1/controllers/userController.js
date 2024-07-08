const User = require('../models/usersModel');

exports.get = ('/', async (req, res) => {
    const Users = await User.find({});
    return res.json(Users);
});

exports.get = ('/:username', async (req, res) => {
    const username = req.params.username;
    const User = await User.findByusername(username);
    return res.json(User);
});

exports.post = ('/', async (req, res) => {
    const User = new User({
        UserName: req.body.UserName,
        email: req.body.email,
        passowrd: req.body.passowrd,
        createdAt: req.body.createdAt
    });
    await User.save();
    res.json(User);
});

exports.put = ('/:username', async (req, res) => {
    const updatedUser = await User.findByusernameAndUpdate(req.params.username, req.body, {new: true});
    return res.json(updatedUser);
});

exports.delete = ('/:username', async (req, res) => {    
    const username = req.params.username;
    await User.findByusernameAndDelete(username);
    return res.json({message: 'User deleted successfully'});
});
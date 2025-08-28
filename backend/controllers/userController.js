const User = require('../models/User');

exports.createOrGetStudent = async (req, res) => {
    try {
        const { name, tabId } = req.body;
        if (!name || !tabId) {
            return res.status(400).json({ message: 'Name and tabId are required' });
        }
        let user = await User.findOne({ name, tabId, role: 'student' });
        if (!user) {
            user = new User({ name, tabId, role: 'student' });
            await user.save();
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTeacher = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        let user = await User.findOne({ name, role: 'teacher' });
        if (!user) {
            user = new User({ name, role: 'teacher' });
            await user.save();
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

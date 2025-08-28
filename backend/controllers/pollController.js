const Poll = require('../models/Poll');
const Question = require('../models/Question');

exports.createPoll = async (req, res) => {
    try {
        const { title, teacherId, timeLimitSeconds } = req.body;
        if (!title || !teacherId) {
            return res.status(400).json({ message: 'Title and teacherId are required' });
        }
        const poll = new Poll({
            title,
            teacher: teacherId,
            timeLimitSeconds: timeLimitSeconds || 60,
        });
        await poll.save();
        res.status(201).json(poll);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPollsByTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const polls = await Poll.find({ teacher: teacherId }).populate('questions');
        res.json(polls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

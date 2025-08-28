const Poll = require('../models/Poll');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

exports.createQuestion = async (req, res) => {
    try {
        const { pollId, questionText, options } = req.body;
        if (!pollId || !questionText || !options || options.length < 2) {
            return res.status(400).json({ message: 'PollId, questionText and at least 2 options required' });
        }

        const poll = await Poll.findById(pollId).populate('questions');
        if (!poll) return res.status(404).json({ message: 'Poll not found' });

        // Check if any active question exists
        const activeQuestion = poll.questions.find(q => q.isActive);
        if (activeQuestion) {
            // Check if all students answered 
            const allAnswered = await Answer.exists({ question: activeQuestion._id,});  
            if (!allAnswered) {
                return res.status(400).json({ message: 'Previous question still active or unanswered by some students' });
            }
            activeQuestion.isActive = false;
            await activeQuestion.save();
        }

        // Create new question
        const question = new Question({
            poll: pollId,
            questionText,
            options,
            isActive: true,
        });
        await question.save();

        poll.questions.push(question._id);
        await poll.save();

        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getActiveQuestion = async (req, res) => {
    try {
        const { pollId } = req.params;
        const question = await Question.findOne({ poll: pollId, isActive: true });
        if (!question) return res.status(404).json({ message: 'No active question found' });
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

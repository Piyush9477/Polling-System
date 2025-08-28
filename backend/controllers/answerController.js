const Answer = require('../models/Answer');


exports.submitAnswer = async (req, res) => {
    try {
        const { studentId, questionId, selectedOption } = req.body;
        if (!studentId || !questionId || !selectedOption) {
            return res.status(400).json({ message: 'studentId, questionId and selectedOption required' });
        }

        const existingAnswer = await Answer.findOne({ student: studentId, question: questionId });
        if (existingAnswer) {
            existingAnswer.selectedOption = selectedOption;
            await existingAnswer.save();
            return res.json(existingAnswer);
        }

        const answer = new Answer({
            student: studentId,
            question: questionId,
            selectedOption,
        });
        await answer.save();
        res.status(201).json(answer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAnswersByQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        const answers = await Answer.find({ question: questionId }).populate('student', 'name');
        res.json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

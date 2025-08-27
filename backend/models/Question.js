const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    poll: {type: mongoose.Schema.Types.ObjectId, ref: 'Poll', required: true},
    questionText: {type: String, required: true},
    options: [{type: String, required: true}],
    isActive: {type: Boolean, default: false},
    allAnswered: {type: Boolean, default: false}
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);

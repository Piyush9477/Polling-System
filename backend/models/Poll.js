const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    title: {type: String, required: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    isActive: {type: Boolean, default: true},
    timeLimitSeconds: {type: Number, default: 60},
}, { timestamps: true });

module.exports = mongoose.model('Poll', pollSchema);

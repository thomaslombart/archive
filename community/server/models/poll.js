import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    answers: {
        type: Array,
        required: true
    },
    date: Date,
    author: String,
    voters: Array,
    totalVotes: Number
}, {
        // https://github.com/Automattic/mongoose/issues/5574#issuecomment-332290518
        usePushEach: true
    });

pollSchema.methods.calculateVotes = (answers) => {
    let counter = 0;
    for (let i = 0; i < answers.length; i++) {
        counter += answers[i].vote;
    }
    return counter;
}

export default mongoose.model('Poll', pollSchema);
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Document (Model)
const thoughtSchema = new Schema(
    // Subdocuments
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            // Current timestamp
            default: Date.now(),
        },
        // The user that created this thought
        username: {
            type: String,
            required: true,
        },
        // These are like replies
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// Create a virtual property called `reactionCount` that retrieves the length of the user's `reactions` array field on query 
thoughtSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return this.reactions.length
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
const { Schema } = require('mongoose');

// Document (Model)
const reactionSchema = new Schema(
    // Subdocuments
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            // Current timestamp
            default: Date.now(),
            // Remember to use a getter method to format the timestamp on query
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// Schema ONLY; NO model

module.exports = reactionSchema;
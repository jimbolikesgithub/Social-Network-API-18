const { Schema, model } = require('mongoose');

// Email validation fuction
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// Document (Model)
const userSchema = new Schema(
    // Subdocuments
    {
        username: {
            type: String,
            unique: true,
            required: true,
            // Removes spaces between quotes
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

// Create a virtual property called `friendCount` that retrieves the length of the user's `friends` array field on query 
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return this.friends.length
    });

const User = model('user', userSchema);

module.exports = User;
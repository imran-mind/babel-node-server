const mongoose = require('mongoose');
const { Schema } =require('mongoose');
// import uuidv4 from 'uuid/v4';
const moment = require('moment');

const schema = Schema({
    courseName: {
        type: String
    },
    fees: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Number,
        default: moment().valueOf()
    },
    updatedAt: {
        type: Number,
        default: moment().valueOf()
    }
});

export const CourseModel = mongoose.model('courses', schema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;// import uuidv4 from 'uuid/v4';
const moment = require('moment');

const studentSchema = Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    mobile: {
        type: String
    },
    joiningDate: {
        type: Number
    },
    // course: {
    //     type: Schema.Types.ObjectId,
    //     ref: "courses"
    // },
    course: {
        type: String
    },
    feesPaid: {
        type: Number
    },
    feesDue: {
        type: Number
    },
    imageUrl:{
        type: Object
    },
    emailMessageId:{
        type: String
    },
    SMSMessageId:{
        type: String
    },
    // courseDetail:{
    //     type: Object
    // },
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

const StudentModel = mongoose.model('students', studentSchema);
module.exports = StudentModel;
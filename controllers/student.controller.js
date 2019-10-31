import StudentModel from '../models/student.model';
import _ from 'lodash';
import {sendEmail} from '../utils/mail';
import { sendSMS } from '../utils/sms';
import { uploadImage } from '../utils/cloudary';
export const addStudent = async (studentInfo, req) => {
    try {
        const student = new StudentModel(studentInfo);
        const stdData = await student.save();
        const results = await Promise.all([uploadImage(req), sendEmail(stdData)])
        if(results && results.length > 1){
            stdData.imageUrl = results[0];
            stdData.emailMessageId = results[1];
        }
        await updateStudent(stdData._id,stdData);
        return stdData;
    } catch (studentError) {
        console.log('=> POST: studentError ', studentError);
        return studentError;
    }
}

export const getStudents = async () => {
    try {
        const students = await StudentModel.find({
            isDeleted: false
        }, {
            isDeleted: 0,
            __v: 0
        }).populate("course").exec(); // course (student schema field name)
        // it would not be the courses schema.
        const counts = await StudentModel.aggregate([
            {
                "$group": {
                    "_id": null, 
                    "male_students": {
                        "$sum": {
                            "$cond": [
                                { "$and": [ 
                                   { "$eq": [ "$gender", "MALE" ] },
                                   { "$eq": [ "$isDeleted", false ] }
                            ]},1, 0                     
                           ]
                        } 
                     },
                     "female_students": {
                        "$sum": {
                            "$cond": [
                                { "$and": [ 
                                   { "$eq": [ "$gender", "FEMALE" ] },
                                   { "$eq": [ "$isDeleted", false ] }
                            ]},1, 0                     
                           ]
                        }  
                      }
                }
            }
        ])
        return {students, counts};
    } catch (studentError) {
        console.log('=> POST: studentError ', studentError);
        return studentError;
    }
}

export const getStudentById = async (id) => {
    try {
        // const studentInfo = await StudentModel.findOne({
        //     _id: id,
        //     isDeleted: false
        // }, {
        //     isDeleted: 0,
        //     __v: 0
        // }).populate("course").exec(); // course (student schema field name)
        // it would not be the courses schema.

        const studentInfo = await StudentModel.findOne({
            _id: id,
            isDeleted: false
        }, {
            isDeleted: 0,
            __v: 0
        });
        console.log("------before-----",studentInfo.course);
        return studentInfo;
    } catch (studentError) {
        console.log('=> GET: studentError ', studentError);
        return studentError;
    }
}

export const updateStudent = async (id, studentInfo) => {
    try {
        let student= await StudentModel.findOne({
            _id: id,
            isDeleted: false
        }, {
            isDeleted: 0,
            __v: 0
        });
        if(student){
            student = await StudentModel.updateOne({_id: id}, studentInfo)  
        }
        return student;
    } catch (studentError) {
        console.log('=> PUT: studentError ', studentError);
        return studentError;
    }
}

export const deleteStudent = async (id) => {
    try {
        const updatedStudent = await StudentModel.updateOne({
            _id: id
        }, {
            isDeleted: true
        });
        return updatedStudent;
    } catch (deleteError) {
        console.log('=> DELETE: Student deleteError ', deleteError);
        return deleteError;
    }
}

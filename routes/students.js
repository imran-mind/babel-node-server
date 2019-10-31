const router = require('express').Router();
import {addStudent, getStudents, getStudentById, updateStudent, deleteStudent}
    from '../controllers/student.controller';
import { uploadImage } from '../utils/cloudary';

router.post('/',async (req, res) => {
    console.time('student registration time taken :');
    try {
        if(!req.body){
            return res.status(400).json({message: 'Bad Request'});
        }
        // strip off the data: url prefix to get just the base64-encoded bytes
        delete req.body._id;
        const students = await addStudent(req.body, req);
        console.timeEnd(`student registration time taken :`);
        return res.status(201).json({ status: 201, data: students, error: null });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ status: 500, data: null, error: error });
    }
});

router.get('/',async (req, res) => {
    console.log('---------------',req.projectBaseUrl)
    try {
        const students = await getStudents();
        return res.status(200).json({ status: 200, data: students, error: null });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ status: 500, data: null, error: error });
    }
});

router.get('/:id',async (req, res) => {
    try {
        if(!req.params.id){
            return res.status(500).jsonp({error: 'Id is required'});
        }
        const student = await getStudentById(req.params.id);
        return res.status(200).json({ status: 200, data: student, error: null });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ status: 500, data: null, error: error });
    }
});

router.put('/:id',async (req, res) => {
    if(!req.params.id){
        return res.status(500).jsonp({error: 'Id is required'});
    }
    if(!req.body){
        return res.status(400).json({message: 'Bad Request'});
    }
    try {
        if(req.body.imageData){
            let data = await uploadImage(req);
            req.body.imageUrl = data;
        }
        const updatedStudent = await updateStudent(req.params.id, req.body);
        return res.status(200).json({ data: updatedStudent, error: null });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ data: null, error: error });
    }
});

router.delete('/:id',async (req, res) => {
    try {
        if(!req.params.id){
            return res.status(500).jsonp({error: 'Id is required'});
        }
        const deletedStudent = await deleteStudent(req.params.id);
        return res.status(200).json({  status: 200, data: deletedStudent, error: null });
    } catch (error) {
        console.log(error);
        return res.status(200).json({  status: 200, data: null, error: error });
    }
});

module.exports= router;
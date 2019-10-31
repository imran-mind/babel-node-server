const router = require('express').Router();
import {createCourse, getCourses, getCourseById, deleteCourse, updateCourseById}
    from '../controllers/course.controller';

router.post('/',async (req, res) => {
    try {
        if(!req.body){
            return res.status(400).json({message: 'Bad Request'});
        }
        const courses = await createCourse(req.body);
        return res.status(201).json({ status: 201, data: courses, error: null });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ status: 500, data: null, error: error });
    }
});

router.get('/',async (req, res) => {
    try {
        const courses = await getCourses();
        return res.status(200).json({ status: 200, data: courses, error: null });
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
        const course = await getCourseById(req.params.id);
        return res.status(200).json({ status: 200, data: course, error: null });
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
        const courses = await updateCourseById();
        return res.status(200).json({ data: courses, error: null });
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
        const courses = await deleteCourse(req.params.id);
        return res.status(200).json({  status: 200, data: courses, error: null });
    } catch (error) {
        console.log(error);
        return res.status(200).json({  status: 200, data: null, error: error });
    }
});

module.exports= router;
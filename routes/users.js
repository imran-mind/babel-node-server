const router = require('express').Router();
// TODO need to  call controller 
const {CourseModel} = require('../models/course.model');
router.get('/',async (req, res) => {
    try {
        const courses = await CourseModel.find();
        return res.status(200).json({ data: courses, error: null });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ data: null, error: error });
    }
});
// cars.get('/:carId', single);

module.exports = router;
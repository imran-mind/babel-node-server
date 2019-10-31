import CourseModel from '../models/course.model';

export const createCourse = async (courseInfo) => {
    const course = new CourseModel(courseInfo);
    try{
        const success = await course.save();
        return success;
    } catch(courseError){
        console.log('=> POST: courseError ',courseError);
        return courseError;
    }
}

export const getCourses= async () => {
    try{
        const courses = await CourseModel.find({isDeleted: false}, {isDeleted: 0, __v: 0, createdAt:0, updatedAt: 0});
        return courses;
    } catch(coursesError){
        console.log('=> GET: coursesError ',coursesError);
        return coursesError;
    }
}

export const getCourseById= async (id) => {
    try{
        const courseInfo = await CourseModel.findOne({_id: id, isDeleted: false}, {isDeleted: 0, __v: 0});
        return courseInfo;
    } catch(courseInfoError){
        console.log('=> GET: courseInfoError ',courseInfoError);
        return courseInfoError;
    }
}


export const updateCourseById = async (id, courseInfo) => {
    try {
        let course= await CourseModel.findOne({
            _id: id,
            isDeleted: false
        }, {
            isDeleted: 0,
            __v: 0
        });
        if(course){
            course = await CourseModel.updateOne({_id: id}, courseInfo)  
        }
        return course;
    } catch (coursetError) {
        console.log('=> PUT: coursetError ', coursetError);
        return coursetError;
    }
}


export const deleteCourse = async(id) => {
    try{
        const updatedCourse = await CourseModel.updateOne({_id: id}, {isDeleted: true});
        return updatedCourse;
    } catch(deleteError){
        console.log('=> DELETE: deleteError ',deleteError);
        return deleteError;
    }
}

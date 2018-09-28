const router = require('express').Router();
// TODO need to  call controller 

router.get('/', (req, res) => {
    res.status(200).json({ message: "all cars" });
});
// cars.get('/:carId', single);

module.exports = router;
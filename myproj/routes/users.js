var express = require('express');
var router = express.Router();
var connection  = require('../database.js');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.use(express.json());

//Post Endpoint for submitting course review
router.post('/submitReview', function(req, res) {
  const { email, crn, year, semester, testimony, rating, difficulty, timeCommit } = req.body;

  // SQL Query to insert data
  const submit_sql = `
    INSERT INTO UserFeedback (Email, Year, CRN, Semester, Testimony, Rating, Difficulty, TimeCommit, Time_stamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `;

    connection.query(submit_sql, [email, year, crn, semester, testimony, rating, difficulty, timeCommit], function(err, results, fields){
      if (err) {
        // Handle any database errors
        console.error('Failed to insert data:', err);
        res.status(500).json({
            message: "Failed to submit review",
            error: err.message
        });
        return next(err);
      }
      res.json({
          message: "Review submitted successfully",
          data: req.body
      });
    });
});

router.delete('/deleteReview', function(req, res) {
  const { email, crn, year, semester} = req.body;

  // SQL Query to insert data
  const delete_sql = `
    DELETE FROM UserFeedback WHERE Email = ? AND CRN = ? AND Year = ? AND Semester = ?
  `;
  console.log(email);
  console.log(crn);
  console.log(year);
  console.log(semester);
    connection.query(delete_sql, [email, crn, year, semester], function(err, results, fields){
      if (err) {
        // Handle any database errors
        console.error('Failed to delete data:', err);
        res.status(500).json({
            message: "Failed to delete review",
            error: err.message
        });
        return next(err);
      }
      res.json({
          message: "Review deleted successfully",
          data: req.body
      });
    });
});

router.post('/updateReview', function(req, res) {
  const { email, crn, year, semester, testimony, rating, difficulty, timeCommit } = req.body;

  // SQL Query to insert data
  const sql = `
    UPDATE UserFeedback WHERE Email = ? AND CRN = ? AND Year = ? AND Semester = ?
  `;

    connection.query(sql, [email, year, crn, semester], function(err, results, fields){
      if (err) {
        // Handle any database errors
        console.error('Failed to delete data:', err);
        res.status(500).json({
            message: "Failed to delete review",
            error: err.message
        });
        return next(err);
      }
      res.json({
          message: "Review deleted successfully",
          data: req.body
      });
    });
});

module.exports = router;



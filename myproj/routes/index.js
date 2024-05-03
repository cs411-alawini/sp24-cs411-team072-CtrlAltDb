var express = require('express');
var router = express.Router();
var connection  = require('../database.js');

// Route to handle the search form submission and fetch data based on user-entered CRN
router.get('/search', function(req, res, next) {
  // Extract the CRN from the query string
  const { crn, deptcode, courseTitle, professorName, courseNum } = req.query;

  console.log(crn);
  console.log(deptcode);
  console.log(courseTitle);
  console.log(professorName);
  console.log(courseNum);
  console.log(req.query);

  // Construct the query
  const query = `
  SELECT CourseName, CRN, DepartmentCode, CourseNum, Avg_grade, Instructor, Semester, Year
  FROM GPAHistory
  WHERE (CRN = ? OR ? = '') AND
        (DepartmentCode LIKE ? OR ? ='') AND
        (CourseName LIKE ? OR ? = '') AND
        (Instructor LIKE ? OR ? = '') AND
        (CourseNum LIKE ? OR ? = '')
`; 

const queryParams = [
  crn, crn,
  `%${deptcode}%`, deptcode,
  `%${courseTitle}%`, courseTitle,
  `%${professorName}%`, professorName,
  `%${courseNum}%`, courseNum
];


  // Execute the query with the CRN parameter
  connection.query(query, queryParams, function(err, results) {
    if (err) {
      // Handle any database errors
      return next(err);
    }
    // Send the results back to the client
    if (!results || results.length === 0) {
      res.json([]);
      return;
    }
      // If no results found, send an appropriate response
    res.json(results);

  });
});

module.exports = router;
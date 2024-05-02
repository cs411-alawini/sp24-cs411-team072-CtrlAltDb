// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

var express = require('express');
var router = express.Router();
var connection  = require('../database.js');


/* GET home page. */
// router.get('/', function(req, res, next) {
	 
//  connection.query('SELECT * FROM users ORDER BY id desc',function(err,rows)     {

//         if(err){
//          req.flash('error', err); 
//          res.render('list',{page_title:"Users - Node.js",data:''});   
//         }else{
           
//             res.render('list',{page_title:"Users - Node.js",data:rows});
//         }
                           
//          });
       
//     });




// Route to handle the search form submission and fetch data based on user-entered CRN
router.get('/search', function(req, res, next) {
  // Extract the CRN from the query string
  const userCRN = req.query.CRN;
  const courseTitle = req.query.courseTitle || '';
  const professorName = req.query.professorName || '';

  // Validate that the CRN is a numeric value
  // if (!userCRN || isNaN(userCRN)) {
  //   return res.status(400).json({ message: 'A valid CRN is required' });
  // }

  // Construct the query
 const query = 'SELECT CourseName, CRN, CourseNum, Avg_Grade, Instructor, Semester, Year FROM GPAHistory WHERE CRN = ? and CourseName LIKE ? and Instructor LIKE ?';
 //Alawini, Abdussalam A
 //CRN = ? and CourseName LIKE ? and 
  const queryParams = [
        userCRN,
        `%${courseTitle}%`,
        `%${professorName}%`
    ];

  // Execute the query with the CRN parameter
  connection.query(query, queryParams, function(err, results) {
    if (err) {
      // Handle any database errors
      return next(err);
    }
    // Send the results back to the client
    if (results.length > 0) {
      res.render('list',{page_title:"Users - Node.js",data:results});
      //res.json(results);
    } else {
      // If no results found, send an appropriate response
      res.status(404).json({ message: 'No records found for the provided CRN' });
    }
  });
});

module.exports = router;
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
router.get('/', function(req, res, next) {
  // Extract the CRN from the query string
  const dept = req.query.DepartmentCode;
  const min_gpa = req.query.GPAFloor;
  const min_rating = req.query.CourseRatingFloor;
  const credit_hours = req.query.CreditHours;
  const intersect_union = req.query.IntersectOrUnion === "on" ? 1 : 0;


  // Validate that the CRN is a numeric value
  // if (!userCRN || isNaN(userCRN)) {
  //   return res.status(400).json({ message: 'A valid CRN is required' });
  // }

  // Construct the query
 const query = 'CALL UserCustomQuery(?,?,?,?,?)';
 //Alawini, Abdussalam A
 //CRN = ? and CourseName LIKE ? and 
  const queryParams = [
        dept, min_gpa, min_rating, credit_hours, intersect_union
    ];

  // Execute the query with the CRN parameter
  connection.query(query, queryParams, function(err, results) {
    if (err) {
      // Handle any database errors
      return next(err);
    }
    // Send the results back to the client
    if (results.length > 0) {
      res.render('list_topclasses',{page_title:"Top Classes",data:results[0]});
      //res.json(results);
    } else {
      // If no results found, send an appropriate response
      res.status(404).json({ message: 'No records found for the provided CRN' });
    }
  });
});

module.exports = router;
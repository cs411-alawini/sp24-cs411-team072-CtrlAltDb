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
  //const {dept, min_gpa, min_rating, credit_hours, intersect_union_raw} = req.query;
    const dept = req.query.deptcode;
    const min_gpa = req.query.GPA;
    const min_rating = req.query.CourseRating;
    const credit_hours = req.query.CreditHours;
    const intersect_union = req.query.Union === "true" ? 1 : 0;
    //const intersect_union = intersect_union_raw === "on" ? 1 : 0;
    console.log(intersect_union);

  // Construct the query
 const query = 'CALL UserCustomQuery(?,?,?,?,?)';

  const queryParams = [
        dept, min_gpa, min_rating, credit_hours, intersect_union
    ];

  // Execute the query with the CRN parameter
  connection.query(query, queryParams, function(err, results) {
    //console.log(results);
    if (err) {
        // Handle any database errors
        console.error('Failed to do custom query:', err);
        res.status(500).json({
            message: "Failed to do custom query",
            error: err.message
        });
        return next(err);
      }
    // Send the results back to the client
    res.json(results);
  });

});

module.exports = router;
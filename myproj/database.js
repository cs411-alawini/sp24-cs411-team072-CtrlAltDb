var mysql = require('mysql2');
// Database connection setup
var conn = mysql.createConnection({
    host: '34.173.61.66',  // GCP database host
    user: 'root',  //  database username
    password: 'acY5q*r0B+#g_u-U',  // database password
    database: 'uiuc_course_hub', // database name
    connectTimeout: 10000 
  });

conn.connect(function(err) {
  if (err) throw err;
  console.log('Server started on http://127.0.0.1:4000/');
});
module.exports = conn;
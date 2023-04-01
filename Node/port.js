   // add necessary modules 
   var http = require('http');
   var qs = require('querystring');
     
   // build a simple form
   var pageHTML = '<html>' +
     '<head>' +
       '<title>Add something</title>' +
       '<meta charset="utf-8">' +
     '</head>' + 
     '<body>' +
       '<form method="post" action="">' +
         '<div>' +
           '<label for="fname">First name:</label>' +
           '<input type="text" name="fname">' +  
         '</div>' +
         '<div>' +
           '<input type="submit" value="send it">' +
         '</div>' +
       '</form>' +
     '</body>' +
   '</html>';
     
   // create server and process data
   var server = http.createServer(function (req, res) {
     var requestData = '';
     
     // check HTTP method and show the right content
     if (req.method === "GET") {
       res.writeHead(200, {'Content-Type': 'text/html'});
       res.end(pageHTML); // serve our HTML code
     } else if (req.method === "POST") {
       req.setEncoding('utf-8');
     
       req.on('data', function(data) {
         requestData += data;
       });
     
       req.on('end', function() {
         var postData = qs.parse(requestData);
         res.writeHead(200, {'Content-Type': 'text/html'});
         res.end('<h1>Your nick: '+ postData.fname + '</h1>');
       });
     }
   });
    
   server.listen(3000,'127.0.0.1');
   console.log('Server running at http://127.0.0.1:<port>/');
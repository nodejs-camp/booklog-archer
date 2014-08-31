/**
 * Module dependencies.
 */

var express = require('../../lib/express');

// Path to our public directory

var pub = __dirname + '/public';

// setup middleware

var app = express();
app.use(express.static(pub));

// Optional since express defaults to CWD/views

app.set('views', __dirname + '/views');

// Set our default template engine to "jade"
// which prevents the need for extensions
// (although you can still mix and match)
app.set('view engine', 'jade');

function User(name, email) {
  this.name = name;
  this.email = email;
}

// Dummy users
var users = [
    new User('tj', 'tj@vision-media.ca')
  , new User('ciaran', 'ciaranj@gmail.com')
  , new User('aaron', 'aaron.heckmann+github@gmail.com')
];

app.get('/', function(req, res){
  res.render('users', { users: users });
});

var posts = [];
var count = 0;

app.all('*', function(req, res, next){
	console.log('Count: ' + count++); // 計算灠覽次數
	console.log(req);

	//if (req.headers.host === 'localhost:3000') {
		//console.log("Access denied.");
	//}else{
		//next(); // 告訴 express 符合此處後繼續往下比對路徑
	//}
	
	next(); // 告訴 express 符合此處後繼續往下比對路徑
});

app.get('/welcome', function(req, res){
	res.render('index'); // 從 views folder 中讀取 index.jade 檔案
});
app.get('/1/post', function(req, res){

	res.send(posts);
});

app.post('/1/post', function(req, res){
	var subject;// = req.body.subject;
	var content;// = req.body.content;

	if (typeof(req.body) === 'undefined') { // 型態與字串皆要相等
		subject = req.query.subject; // 從 request 中的 query 找到 key 為 subject
	    content = req.query.content; // 從 request 中的 query 找到 key 為 content
	}else{
		subject = req.body.subject; // 從 request 中的 body 找到 key 為 subject
	    content = req.body.content; // 從 request 中的 body 找到 key 為 subject
	}

	var post = {
		subject: subject, // key 可省略 "" 符號, 因為它是字串
		content: content // key 可省略 "" 符號, 因為它是字串
	};

	posts.push(post); // 將 post 的值放到 posts array 中
	//console.log(req);

	res.send({status: 'ok', posts: posts, count: count });

});

app.delete('/1/post', function(req, res){

	res.send("Delete a post");
});

app.put('/1/post/:postId', function(req, res){
	var id = req.params.postId;
	res.send("Put a post: " + id);
});


// change this to a better error handler in your code
// sending stacktrace to users in production is not good
app.use(function(err, req, res, next) {
  res.send(err.stack);
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}

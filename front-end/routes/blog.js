var express = require('express');
var router = express.Router();

var commonmark = require('commonmark');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';  // Connection URL
const dbName = 'BlogServer';
const collName = 'Posts';

let db = null;

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to MongDB server");
  db = client.db(dbName);
});

const getBlogs = function(db, username, callback) {
  db.collection(collName).find({"username": username}).toArray(function(err, posts) {
    callback(posts);
  });
}

const getBlog = function(db, username, postid, callback) {
  db.collection(collName).findOne({ "username": username, "postid": parseInt(postid) })
  .then(callback);
}

const markdownRender = function(post) {
  var reader = new commonmark.Parser();
  var writer = new commonmark.HtmlRenderer();
  var parsed = reader.parse(post.title);
  renderedTitle = writer.render(parsed);
  parsed = reader.parse(post.body);
  renderedBody = writer.render(parsed);
  return [renderedTitle, renderedBody]
}

// GET blog
router.get('/:username/:postid', function(req, res, next) {
  getBlog(db, req.params.username, req.params.postid, function(post) {
    if(post === null)
      res.render('blog',  { title: "", body: "" });
    else {
      rendered = markdownRender(post);
      res.render('blog',  { title: renderedTitle, body: renderedBody });
    }
  });
});

const PostNum = 5;  // number of posts shown on one page

// GET blogs
router.get('/:username', function(req, res, next) {
  getBlogs(db, req.params.username, function(posts) {
    let startid = req.query.start;
    if(startid === undefined)
      startid = 1;
    let i=0;
    for (; i<posts.length; i++)
      if(posts[i].postid >= startid)
        break;
    let hasNext = false;
    let nextid = -1;
    if (i + PostNum < posts.length){ // has next posts
      hasNext = true;
      nextid = posts[i+PostNum].postid;
    }
    let slicedPosts = posts.slice(i,i+PostNum);
    let renderedPosts = new Array();
    for (let i=0; i<slicedPosts.length; i++){
      renderedPosts[i] = markdownRender(slicedPosts[i]);
    }
    res.render('blogs',  { renderedPosts: renderedPosts, hasNext: hasNext, nextid: nextid });
  });
});

module.exports = router;
//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-mohammed:Test123@cluster0.pmygq.mongodb.net/blogDB", { useUnifiedTopology: true , useNewUrlParser: true } );


const PostsSchema  = new mongoose.Schema ({
  title: String,
  content: String
});

const Post = mongoose.model("Post", PostsSchema);

const post = new Post({
  title: "Hellow",

  content: "I have nothing to say"
});

const homeStartingContent = "Al Yamamah University is located north of Riyadh, on Al-Qassim Highway, and occupies an area of 160,000 square meters. It was designed in accordance with the latest standards for educational institutions. I dont know What to write , Go to the composed page on the top right and start writing some articals and it will be saved wright here ❤️ . ";
const aboutContent = "HAl Yamamah University (YU) was established in May 2001 as a single college by Alkhudair family. This marked their second major contribution to education in Saudi Arabia, having pioneered the establishment of the first private schools in Riyadh in 1957. Authorized as an institution of higher learning by the Ministry of Higher Education, Al Yamamah College opened its doors to male students in September 2004 and to female students in September 2006. In 2008, the Custodian of the Two Holy Mosques , King Abdullah bin Abdulaziz AlSaud, May Allah Blessed Him, issued a royal decree approving the elevation of Al Yamamah College to university status, the culmination of eight years of planning and hard work to establish a distinctive and modern Saudi educational institution that provides both undergraduate and postgraduate education. Since its inception. the University has established itself at the forefront of the competition among private higher education institutions in the Kingdom using English as a medium for instruction.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let posts = [];

app.use(function(req, res, next) {
  //console.log('Time:', Date.now())
  // var requestHeaders = JSON.stringify(req.headers);
  var agent = req.get('user-agent');
  //  console.log(agent);
  if (agent.includes("Chrome")) {
    //console.log('chrome,');
    next()
  } else {
    console.log('not chrome,');
    res.send("please use chrome");
  }
})

app.get("/", function(req, res) {
  Post.find({}, function(err, result){
    //console.log(result);
    res.render("home", {
      homeStartingContent: homeStartingContent,
      posts : result
    });
  })

});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const poste = {
    title: req.body.artical,
    content: req.body.post
  }
    posts.push(poste);
    const post = new Post(poste);
    post.save();
    res.redirect("/");
});
// posts.forEach(function(post){ %>
//   <h1><%=post.title%></h1>
//   <p><%=post.content%></p>
// <%}) %>

app.get("/posts/:topic", function(req, res) {
  // const requstedTitle = _.lowerCase(req.params.topic);
  const requstedTitle = req.params.topic;


  Post.findOne({title: requstedTitle}, function(err, result){
    //  console.log(title);
    if(!err){
      if(!result){
        console.log("non");
        //show above list
    }else{
      //show list
console.log("Founded");
console.log(result.title);
res.render("post", {
          uType : result.title ,
          storedContent : result.content
       });

      // res.render("list", {listTitle: result.name, newListItems: result.items });
    }
  }
  })

 });



 // posts.forEach(function(post){
 //     // const choseTopic = post.title;
 //     // const storedContent = post.content;
 //     const storedTitle = _.lowerCase(post.title);
 //     if(storedTitle === requstedTitle){
 //       res.render("post", {
 //          uType : post.title ,
 //          storedContent : post.content.
 //       });
 //
 //     }
 //
 // });


//   for (var i = 0; i < posts.length; i++) {
//     if (posts[i].title === (req.params.topic)) {
//      res = "Match found!";
//       break;
//     } else {
//     res = "Match Not found!!!";
//     }
//   }
//   console.log(res);





let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started Successfully");
});

import express from 'express'


const app = express();
const port = process.env.port || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));


const allPosts = [];
createInitialPosts();

app.get("/", (req, res) => {
    res.render("index.ejs", {allPosts: allPosts});
});


app.get('/newpost/', (req, res) => {
    res.render("newpost.ejs");
});

app.get('/view/:id', (req, res) => {
    res.render("view.ejs", {post: allPosts[req.params.id], postNum: req.params.id});
});


app.get('/edit/:id', (req, res) => {
    res.render('edit.ejs', {post: allPosts[req.params.id], postNum: req.params.id});
})

app.post('/submit/:id', (req, res) => {
    const newPost = new Post(req.body['title'], req.body['subtitle'], req.body['author'], req.body['content'], true);
    allPosts.push(newPost);
    //Determines if a post is being created or edited, deletes original if the post is being edited.
    if(Number(!isNaN(req.params.id))){
        deletePost(req.params.id);
    }
    res.redirect("/");
});

app.get("/:id", (req, res) => {
    if(Number(!isNaN(req.params.id))){
        deletePost(req.params.id);
    }
    res.render("index.ejs", {allPosts: allPosts});
})






app.listen(port, () => {
    console.log("Listening on port " + port);
});

// A constructor function for new post to be passed to allPosts array
function Post(title, sub, author, content) {
    this.title = title.toUpperCase();
    this.sub = sub;
    this.author = author;
    this.content = content;
    this.valid = true;
    this.date = new Date();
}

function createInitialPosts(){
    const post1 = new Post(
        "The First Post",
        "A start of something beautiful",
        "Matthew Junck",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    );
    const post2 = new Post(
        "The Second Post",
        "The continuation of something beautiful",
        "Matthew Junck",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    );
    allPosts.push(post1, post2);
    return;
}

function deletePost(id){
    allPosts[id].valid = false;
    return;
}
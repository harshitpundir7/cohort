const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "ramdomharkiratilovekiara"
const app = express();
app.use(express.json());

const users = [];

app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })    

    res.json({
        message: "You are signed up"
    })

    console.log(users)
    
})

function auth(req, res, next){
    const token = req.headers.token;
    const decodeData = jwt.verify(token, JWT_SECRET)
    if(decodeData){
        req = decodeData;
        next();
    }else{
        res.json({
            message: "User no authenticated"
        })
    }


}

app.post("/signin", function(req, res) {
    
    const username = req.body.username;
    const password = req.body.password;

    // maps and filter
    let foundUser = null;

    for (let i = 0; i<users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            foundUser = users[i]
        }
    }

    if (foundUser) {
        const token = jwt.sign({
            username: username,
            password: password,
        }, JWT_SECRET) ;

        // foundUser.token = token;
        res.json({
            token: token
        })
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
    console.log(users)
})

app.get("/me", auth, function(req, res) {
    const username = req.username
    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username)  {
            foundUser = users[i]
        }
    }

    if (foundUser) {
        res.json({
            username: foundUser.username,
            password: foundUser.password
        })
    } else {
        res.json({
            message: "token invalid"
        })
    }


})


app.listen(3000);// that the http server is listening on port 3000
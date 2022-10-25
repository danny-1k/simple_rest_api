const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const data = {
    users: [
        {id:0, name:"user1"},
        {id:1, name:"user2"},
        {id:2, name:"user3"},


    ],

    comments:[
        {id:0, content:"Hello world", author:"user1"},
        {id:1, content:"Hello world from user2", author:"user2"},
        {id:2, content:"Hello world from user3", author:"user3"},

    ]
}


app.get('/v1', (req, res)=>{
    
    res.send('OK');

});

app.get('/v1/user', (req, res)=>{

    if(req.query.id){
        
        const query_resp = data.users.filter(el=>{return el.id == req.query.id});

        if (query_resp.length == 0){

            res.status(404).send('User not found');
        }else{
            res.json(query_resp[0]);
        }

    };
})

app.get('/v1/users', (req, res)=>{

    res.json(data.users);

});


app.get('/v1/comments', (req, res)=>{

    if (req.query.user){

        res.json(data.comments.filter(
            el=>{return el.author === req.query.user}
        ));


    }else{
        res.json(data.comments);
    }

});



app.listen(PORT, ()=>{
    console.log(`Server up and listening on port ${PORT}`);
})
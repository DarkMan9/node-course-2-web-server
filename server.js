const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();


app.set('view engine','hbs');

var port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});


hbs.registerHelper('screamIt',(screamText) => {
    return screamText;

});

app.use((req,res,next) => {
    
    var now = new Date().toString();

    var log = `${now} : ${req.method} ${req.url}`;
    
    fs.appendFile('server.log',log+'\n',(err) => {
        if(err)
        {
            console.log('unable to append server.log ');
        }
        
    
    });
    
    console.log(log);

    
    next();

});

// app.get('/',(req,res) => {
//     res.send({
//         name:'Mandar Kulkarni',
//         age:26,
//         hobbies:[
//             'novels',
//             'ps4',
//             'x-23'
//         ]
//     });
// });

app.get('/home',(req,res) => {
    res.render('home.hbs',{
        pageTitle:'Home Page',
        currentYear:new Date().getFullYear(),
        welcomeText:'welcome to Nodejs'
    })
});


app.get('/about',(req,res) => {
    
    res.render('about.hbs',{
        pageTitle:'About Page',
        currentYear:new Date().getFullYear()

    });

});

app.get('/projects',(req,res) => {

    res.render('project.hbs',{
        pageTitle:'Project Page'
    })
})

app.listen(port, () => {
    console.log(`server is listening @localhost:${port}`);

});
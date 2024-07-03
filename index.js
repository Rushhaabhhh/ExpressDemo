const express = require('express');
const app = express();


const middleware = (req, res, next) => {
    console.log("Middleware function called");
    console.log("Method:", req.method);
    console.log("Client IP:", req.ip);
    console.log("Hostname:", req.hostname); 
    console.log("Request Body:", req.body); 
    next();
};

app.use(middleware);
app.use(express.json()); 


let courses = [ 
    { id: 1, name: "java" },
    { id: 2, name: "node" },
    { id: 3, name: "react" },
    { id: 4, name: "angular" }
];

app.get('/', (req, res) => {
    res.json(courses);
});

app.post('/post', (req, res) => {
    const name = req.body.name;

    const course = {
        id: courses.length + 1,
        name: name
    };
    courses.push(course);
    res.json(course);
});

app.put('/put/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const course = courses.find(c => c.id === parseInt(id));
    course.name = name;
    res.json(course);
});

app.delete('/del/:id', (req, res) => {

    const id = req.params.id;
    console.log('Deleting course with ID:', id);

    const courseIndex = courses.findIndex(c => c.id === parseInt(id));
    if (courseIndex === -1) return res.status(404).send('Course not found');
    
    const deletedCourse = courses.splice(courseIndex, 1)[0];
    res.json(deletedCourse);
});




app.listen(3000, () => {
    console.log('Server started');
});

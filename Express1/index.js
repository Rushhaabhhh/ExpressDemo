const express = require('express');
const fs = require('fs').promises; 
const app = express();
const port = 3000;

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

const readCoursesFromFile = async () => {
    try {
        const data = await fs.readFile('courses.json', 'utf8');
        courses = JSON.parse(data);
        console.log('Courses data loaded from file.');
    } catch (err) {
        console.error('Error reading courses file:', err);
    }
};
readCoursesFromFile();

const writeCoursesToFile = async () => {
    try {
        await fs.writeFile('courses.json', JSON.stringify(courses, null, 2), 'utf8');
        console.log('Courses data saved to file.');
    } catch (err) {
        console.error('Error writing courses file:', err);
    }
};


let courses = [];

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
    writeCoursesToFile(); 
    res.json(course);
});

app.put('/put/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const course = courses.find(c => c.id === parseInt(id));
    course.name = name;
    writeCoursesToFile(); 
    res.json(course);
});

app.delete('/del/:id', (req, res) => {

    const id = req.params.id;
    console.log('Deleting course with ID:', id);

    const courseIndex = courses.findIndex(c => c.id === parseInt(id));
    if (courseIndex === -1) return res.status(404).send('Course not found');
    
    const deletedCourse = courses.splice(courseIndex, 1)[0];
    writeCoursesToFile(); 
    res.json(deletedCourse);
});

app.listen(3000, () => {
    console.log('Server started');
});




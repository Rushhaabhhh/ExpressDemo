const express = require('express');
const app = express();

let courses = [ 
    {id : 1, name : "java" },
    { id: 2, name : "node" },
    { id: 3, name : "react"},
    { id: 4, name : "angular"}
];

app.get('/', (req, res) => {
    res.json(courses);
});

app.listen(3000, () => console.log('server started'));
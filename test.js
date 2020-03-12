let express = require('express')
let app = express()
let bodyParser = require('body-parser');
let cors = require('cors');
app.use(cors());
let router = express.Router()

app.use('/api', bodyParser.json(), router); 
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let student = [
    {
        id: "6035512082",
        name: 'Peempos',
        surname:'Sinla' ,
        major: 'Management',
        gpa : 4.00,
    },
    
];

router.route('/Student')
    .get((req, res) => res.json(students))
    
    .post((req,res)=>{
        let student = {}
            student.id = students[students.length-1].id+1
            student.id = req.body.id
            student.name = req.body.name
            student.surname = req.body.surname
            student.major = req.body.major
            student.gpa = req.body.gpa
            students.push(student)            
            res.json( {message: 'Student created!'} )
    })

router.route('/Student/:student_id')
    .get((req,res) => {
        let id = req.params.student_id
        let index = students.findIndex( student => (student.id === +id) )
        res.json(students[index])
    })

    .put((req,res) => {                              
        let id = req.params.student_id
        let index = students.findIndex( student => (student.id === +id) )
        students[index].id = req.body.id;
        students[index].name = req.body.name;
        students[index].surname = req.body.surname;     
        students[index].major = req.body.major;
        students[index].gpa = req.body.gpa;      
        res.json({ message: 'Student updated!' + req.params.student_id});
    })

    .delete((req,res) => {                  
        let id = req.params.student_id
        let index = students.findIndex( student => student.id === +id  )
        students.splice(index,1) 
        res.json({ message: 'Student deleted: ' + req.params.student_id});
    })
 


app.use("*", (req, res) => res.status(404).send('404 Not found'));

app.listen(8000, () => { console.log('server is running') })
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Student.css'

export default () => {

    const [students, setStudents] = useState({})
    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [major, setMajor] = useState('')
    const [gpa, setGpa] = useState(null)

    useEffect(() => {
            getStudents()
           // console.log('UseEffect is called')
    },[])

    const getStudents = async () => {
        const result = await axios.get('http://localhost/api/students')
        console.log(result.data)
        setStudents(result.data)
    }

    const addStudent = async () => {
        const result = await axios.post(`http://localhost/api/students`, {
            id,
            name,
            surname,
            major,
            gpa
        })
        console.log(result.data)
        getStudents()
    }

    const getStudent = async (id) => {
        const result = await axios.get(`http://localhost/api/students/${id}`)
        console.log(result.data.id)
        setId(result.data.id)
        setName(result.data.name)
        setSurname(result.data.surname)
        setMajor(result.data.major)
        setGpa(result.data.gpa)
    }

    const updateStudent = async (id) =>{
        const result = await axios.put(`http://localhost/api/students/${id}`, {
                id,
                name,
                surname,
                major,
                gpa
    })
        setId(result.data.id)
        setName(result.data.name)
        setSurname(result.data.surname)
        setMajor(result.data.major)
        setGpa(result.data.gpa)
        getStudent()
}

    const delStudent = async (id) =>{
        const result = await axios.delete(`http://localhost/api/students/${id}`)
        getStudents()
    }

    const printStudents = () => {
        if(students && students.length)
        return students.map( (students,index)  => {
            return(
                <div>
                key={index}
                {/* </key>Students : {index+1} */}
                    <p>ID :{students.id}</p>
                    <p>Name : {students.name}</p>
                    <p>Surname : {students.surname}</p>
                    <p>Major : {students.major}</p>
                    <p>GPA: {students.gpa}</p>
                    
                    <button className="Get" onClick={() => getStudent(students.id)}>Get </button>
                    <button className="Del" onClick={() => delStudent(students.id)}>Delete </button>
                    <button className="Up" onClick={() => updateStudent(students.id)}>Update </button>
                </div>
            )
        
        })
        else{
            return(<h2>Hi</h2>)
        }
    }

return(
    <div>
    <ul>
        {printStudents()}
    </ul>
    <h2>Add Student</h2>
    ID :
    <input 
        placeholder="Id"
        type="number"
        name="id"
        onChange={ (e) => setId(e.target.value)}
        /> <br/>
    Name :
    <input 
        placeholder="Name"
        type="text"
        name="name"
        onChange={ (e) => setName(e.target.value)}
        /> <br/>
    Surname :
    <input 
        placeholder="Surname"
        type="text"
        name="surname"
        onChange={  (e) => setSurname(e.target.value)}
        /> <br/>
    Major :
    <input 
        placeholder="Major"
        type="text"
        name="major"
        onChange={  (e) => setMajor(e.target.value)}
        /> <br/>
    GPA :
    <input 
        placeholder="GPA"
        type="number"
        name="gpa"
        onChange={  (e) => setGpa(e.target.value)}
        /> <br/>
    
    <button onClick={addStudent}> Add </button>
    </div>
    )
  }


import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Student.css'

export default () => {

    const [students, setStudents] = useState({})
    const [id, setID] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [major, setMajor] = useState('')
    const [gpa, setGpa] = useState(0)

    useEffect(() => {
            getStudents()
            console.log('UseEffect is called')
    },[])

    const getStudents = async () =>{
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
        // console.log(result.data)
        setID(result.data.id)
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
}

    const delStudent = async (id) =>{
        const result = await axios.delete(`http://localhost/api/students/${id}`)
        getStudents()
    }

    const printStudents = () =>{
        if(students && students.length)
        return students.map( (students,index)  => {
            return(
                <li key= {index}>
                    {students.id} : {students.name} : {students.surname} : {students.major} : {students.gpa}
                    <button className="Get" onClick={() => getStudent(students.id)}>Get </button>
                    <button className="Del" onClick={() => delStudent(students.id)}>Delete </button>
                    <button className="Up" onClick={() => updateStudent(students.id)}>Update </button>
                </li>
            )
        
        })
        else{
            return(<h2>Hi</h2>)
        }
    }

return(
    <div>
    <ul>
        { printStudents() }
    </ul>
    <h2>Add Student</h2>
    ID :
    <input 
        placeholder="ID"
        type="number"
        name="id"
        onChange={ (e) => setID (e.target.value)}
        /> <br/>
    Name :
    <input 
        placeholder="Name"
        type="text"
        name="name"
        onChange={ (e) => setName (e.target.value)}
        /> <br/>
    Surname :
    <input 
        placeholder="Surname"
        type="text"
        name="surname"
        onChange={  (e) => setSurname (e.target.value)}
        /> <br/>
    Major :
    <input 
        placeholder="Major"
        type="text"
        name="major"
        onChange={  (e) => setMajor (e.target.value)}
        /> <br/>
    GPA :
    <input 
        placeholder="GPA"
        type="number"
        name="gpa"
        onChange={  (e) => setGpa (e.target.value)}
        /> <br/>
    
    <button onClick={addStudent}> Add </button>
    </div>
    )
  }


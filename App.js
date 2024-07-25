import { useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import './App.css';

const App = () => {

  const[editIndex,seteditIndex]=useState(null)

  const [right, setRight] = useState(-450);

  // Store the students in the state
  const [students, setStudents] = useState([]);

  // Store the form data in the state
  const [form, setForm] = useState({
    fullname: '',
    class: '',
    roll: '',
    subject: '',
    dob: '',
  });

  // Handle the drawer
  const handleDrawer = () => {
    setRight(0);
  };

  const closeCross=() => {
    setRight(-450)
    setForm({
      fullname: '',
      class: '',
      roll: '',
      subject: '',
      dob: '',
    })
    seteditIndex(null)
  }


  // Handle input changes
  const handleInput = (e) => {
    const input = e.target;
    const value = input.value;
    const key = input.name;
    setForm({
      ...form,
      [key]: value,
    });
  };

  // Create a new student
  const createStudent = (e) => {
    e.preventDefault();
    setStudents([
      ...students,
      form,
    ]);
    // Reset the form fields
    setForm({
      fullname: '',
      class: '',
      roll: '',
      subject: '',
      dob: '',
    });
    // Close the drawer after submitting the form
    setRight(-450);
  };

  const deleteStudent=(index) =>
  {
    const backup=[...students]
    backup.splice(index,1)
    setStudents(backup)
  }
  const editStudent=(index) =>
  {
    setRight(0)
    setForm(students[index])
    seteditIndex(index)
  }

  const savestudent=(e)=>
  {
    e.preventDefault()
    const backup=[...students]
    backup[editIndex]=form
    setStudents(backup)
    setForm({
      fullname: '',
      class: '',
      roll: '',
      subject: '',
      dob: '',
    });
    seteditIndex(null)
    setRight(-450)


  }

  return (
    <div style={{
      background: '#ddd',
      minHeight: '100vh',
    }}>
      <div style={{
        width: "70%",
        background: "white",
        margin: "32px auto",
        padding: 32,
      }}>
        <h1 style={{
          textAlign: "center",
        }}>PRIYANSH GARG</h1>
        <button
          onClick={handleDrawer}
          style={{
            border: 'none',
            background: '#8407ba',
            color: 'white',
            padding: '14px 24px',
            borderRadius: 4,
            fontSize: 16,
            margin: '20px 0',
          }}>
          <i className="ri-user-add-line" style={{
            marginRight: 8,
          }}></i>New Student
        </button>

        <table className='crud-app'>
          <thead>
            <tr>
              <th>S/No</th>
              <th>Student's Name</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Roll No</th>
              <th>DOB</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.fullname}</td>
                <td>{item.subject}</td>
                <td>{item.class}</td>
                <td>{item.roll}</td>
                <td>{item.dob}</td>
                <td>
                  <div>
                    <button 
                    onClick={()=>editStudent(index)}
                    style={{
                      border: 'none',
                      width: 32,
                      height: 32,
                      background: '#07c65d',
                      color: 'white',
                      borderRadius: 4,
                      marginRight: 8,
                    }}>
                      <i className="ri-image-edit-fill"></i>
                    </button>
                    <button 
                      onClick={()=>deleteStudent(index)}
                      style={{
                        border: 'none',
                        width: 32,
                        height: 32,
                        background: 'red',
                        color: 'white',
                        borderRadius: 4,
                      }}>
                      <i className="ri-delete-bin-6-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <aside style={{
        position: "fixed",
        top: 0,
        right: right,
        width: 450,
        background: "white",
        height: "100%",
        boxShadow: "0 0 40px rgba(0,0,0,0.3)",
        padding: 32,
        boxSizing: "border-box",
        transition: '0.3s',
      }}>
        <button
          onClick={closeCross}
          style={{
            border: 'none',
            background: "white",
            fontSize: 18,
            color: '#8407ba',
            position: 'absolute',
            top: 20,
            right: 20,
          }}>
          <i className="ri-close-line"></i>
        </button>
        <h1>New Student</h1>
        <form
          onSubmit={editIndex===null?createStudent:savestudent}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}>
          <input
            value={form.fullname}
            onChange={handleInput}
            required
            name='fullname'
            type='text'
            placeholder='Enter your name'
            style={{
              border: '1px solid #ccc',
              borderRadius: 4,
              padding: 16,
            }}
          />
          <input
            value={form.class}
            onChange={handleInput}
            required
            name='class'
            type='number'
            placeholder='Enter your class'
            style={{
              border: '1px solid #ccc',
              borderRadius: 4,
              padding: 16,
            }}
          />
          <input
            value={form.roll}
            onChange={handleInput}
            required
            name='roll'
            type='number'
            placeholder='Enter your roll number'
            style={{
              border: '1px solid #ccc',
              borderRadius: 4,
              padding: 16,
            }}
          />
          <input
            value={form.subject}
            onChange={handleInput}
            required
            name='subject'
            type='text'
            placeholder='Enter your subject here'
            style={{
              border: '1px solid #ccc',
              borderRadius: 4,
              padding: 16,
            }}
          />
          <input
            value={form.dob}
            onChange={handleInput}
            required
            name='dob'
            type='date'
            style={{
              border: '1px solid #ccc',
              borderRadius: 4,
              padding: 16,
            }}
          />


        {
          editIndex === null

          ? 
          
          <button
            type='submit'
            style={{
              border: 'none',
              background: '#8407ba',
              color: 'white',
              padding: '14px 24px',
              borderRadius: 4,
              fontSize: 16,
            }}>Submit
          </button>
          :
          <button
            type='submit'
            style={{
              border: 'none',
              background: 'deeppink',
              color: 'white',
              padding: '14px 24px',
              borderRadius: 4,
              fontSize: 16,
            }}>Save
          </button>
        }
        </form>
      </aside>
    </div>
  );
}

export default App;

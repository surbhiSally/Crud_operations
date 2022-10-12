
import React from 'react'
import Login from './Screens/Login';
import { Routes, Route } from 'react-router-dom'
import AddQuestion from './Screens/AddQuestion'
import QuestionsList from './Screens/QuestionsList';
import EditData from './Screens/EditQuestion';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='questionslist' element={<QuestionsList/>} />
        <Route path='editdata' element={<EditData />} />
        <Route path='addquestion' element={<AddQuestion />} />
      </Routes>
    </>
  )
}

export default App
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getToken } from '../Network/api-manager'
import { showToast } from '../Common/utils'
import {useNavigate} from 'react-router-dom'
import Spinner from '../Components/Spinner'

const defaultData = {
  "assesmentId": 0,
  "questionDescription": "",
  "questionMark": 0,
  "questionOptions": [
    {
      "isCorrectAnswer": true,
      "optionDescription": "xxdfdfxx"
    },
  ],
  "questionType": "",
  "sectionId": 2
}

const AddQusetion = () => {

  let navigate = useNavigate()

  const [selectSection, setSelectSection] = useState([])
  const [subjects, setSubjects] = useState([])
  const [question, setQuestion] = useState('')
  const [marks, setMarks] = useState('')
  const [isQuestionAdded, setIsQuestionAdded] = useState(false)
  const [data, setData] = useState(defaultData)
  const [loading, setLoading] = useState(false)

  const onselectionchange = (e) => {
    console.log('>>>>>>Data>>>>>', data);
    console.log('>>>>>>target>>>>>', data);
    setQuestionType(e.target.value)
  }

  const getSections = async () => {
    const response = await axios.get(`http://13.127.84.143:8080/INTMockTestPortal/api/v1/section/getAllSections`, {
      headers: {
        'Authorization': getToken(),
        'content-type': 'application/json'
      }
    })
    setSelectSection(response.data.result);
  }

  const setQuestionType = (value) => {
    setData({ ...data, questionType: value })
    // setSelectSection(value)
  }

  const getSubjects = async () => {
    const response = await axios.get(`http://13.127.84.143:8080/INTMockTestPortal/api/v1/assessment`, {
      headers: {
        'Authorization': getToken(),
        'content-type': 'application/json'
      }
    })
    setSubjects(response.data.result)
  }

  const questionText = (e) => {
    setData({ ...data, questionDescription: e.target.value })
    setQuestion(e.target.value);
    console.log('>>>>>>Data>>>>>', data);
  }

  const totalMarks = (e) => {
    setData({ ...data, questionMark: e.target.value })
    setMarks(e.target.value);
    console.log('>>>>>>Data>>>>>', data);
  }

  const postData = async (e) => {
    setLoading(true)
    e.preventDefault()
    const response = await axios.post(`http://13.127.84.143:8080/INTMockTestPortal/api/v1/question`,
      data,
      {
        headers: {
          'Authorization': getToken(),
          'content-type': 'application/json'
        },
      }).catch((e) => {
        console.log(">>>>>>>>", e);
      })
   

    if (response.status === 200) {
      setLoading(false)
      setIsQuestionAdded(true);
      showToast(response.data.returnMessage)
      const nav = () => navigate('/questionslist')
      nav();
    } 
  }

  const onSubjectChange = (e) => {
    setData({ ...data, assesmentId: e.target.value })
    console.log('>>>>Data>>>>>>', data);
  }

  const typeOfQuestion = (e) => {
    setData({ ...data, questionType: e.target.value });
    console.log('>>>>Data>>>>>>', data);
  }

  useEffect(() => {
    getSubjects()
    getSections()
  }, [])
 
  return (
    <>
      <div className='App'>
      {loading && <Spinner/>}
      {!loading &&
        <form className="container col-10">
          <div className="form-row col-12">
            <div className="col-4">
              <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={(e) => onselectionchange(e)}>
                <option>Select Section</option>
                {selectSection.map((section, id) => {
                  return (
                    <option value={section.id} key={id}>{section.sectionName}</option>
                    )})}
              </select>
            </div>
            <div className="col-4">
              <input type="text" className="form-control" onChange={(e) => typeOfQuestion(e)} />
            </div>
            <div className="col-4">
              <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={e => onSubjectChange(e)}>
                <option>Select Assesment Name</option>
                {subjects.map((assesment, id) => {
                  return (
                    <option value={assesment.id} key={id}>{assesment.name}</option>
                  )})}
              </select>
            </div>
            &nbsp;
            <div className="col-12">
              <textarea className="form-control" onChange={(e) => questionText(e)}></textarea>
            </div>
            &nbsp;
            <div className="form-row col-4">
              <input type="text" placeholder='Question Marks' className='form-control col-10' onChange={(e) => totalMarks(e)} />
            </div>
          </div>
          <div className="col-10">
         <button className='form-control btn btn-info col-2' onClick={(e) => postData(e)}>Add Question</button> 
          </div>
        </form>
}
      </div>
    </>
  )
}
export default AddQusetion
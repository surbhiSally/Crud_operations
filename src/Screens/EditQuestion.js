import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../Network/api-manager'
import { useLocation } from 'react-router-dom'
import { showToast } from '../Common/utils'
import {useNavigate} from 'react-router-dom'
import Spinner from '../Components/Spinner'

const EditData = () => {
   
    let navigate = useNavigate()

    const location = useLocation()
    const { questionsId, questionsDesc } = location.state
    const [question, setQuestion] = useState('')
    const [questionMarks, setQuestionMarks] = useState(0)
    const [loading, setLoading] = useState(false)
  

    useEffect(() => {
        setQuestion(questionsDesc)
    }, [])

    const updateQuestion = async (e) => {
        setLoading(true)
        e.preventDefault()
        const response = await axios.put(`http://13.127.84.143:8080/INTMockTestPortal/api/v1/question/update/${questionsId}`, {
            'marks': questionMarks,
            'questionsDesc': question
        }, {
            headers: {
                'Authorization': getToken(),
                'content-type': 'application/json'
            }
        })
        if (response.status === 200) {
            setLoading(false)
            showToast(response.data.returnMessage)
            const nav = () => navigate('/questionslist')
            nav();
            console.log(">>>>>>>>response.data.returnMessage", response.data.returnMessage);
        }
    }


    return (
        <>
        <div className='App'>
           {loading && <Spinner/>}
           {!loading &&
           <>
            <h2>Update Question</h2>
            <form className="container col-10">
                <div className="form-row col-12">
                    <div className="col-4">
                        <textarea className="form-control" placeholder='Type a Question' value={question} onChange={e => setQuestion(e.target.value)}></textarea >
                    </div>
                    <div className="form-row col-4">
                        <input type="text" placeholder='Question Marks' className='form-control col-10' onChange={e => setQuestionMarks(e.target.value)} />
                    </div>
                    <div className="col-10">
                        <Link to='viewdata'><button className='form-control btn btn-info col-2' onClick={(e) => updateQuestion(e)}>Update Question</button></Link>
                        
                    </div>
                </div>
            </form>
            </> }
        </div>
 </>
  )

}

export default EditData

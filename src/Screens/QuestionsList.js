import React from 'react'
import '../../src/Style/login.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { getToken } from '../Network/api-manager';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Pagination from '../Components/Pagination';
import { FaEdit, FaTrashAlt, FaArrowRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import Spinner from '../Components/Spinner'

const QuestionsList = () => {

	const [apiData, setApiData] = useState([]);
	const [showPerPage] = useState(10)
	const [loading, setLoading] = useState(true)
	const [pagination, setPagination] = useState({
		start:0,
		end:showPerPage
	})

	const onPaginationChange = (start, end) => {
		setPagination({start : start, end : end});
	}

	const getApiData = async () => {
		setLoading(false)
		const response = await axios.get(`http://13.127.84.143:8080/INTMockTestPortal/api/v1/question`, {
			headers: {
				'Authorization': getToken(),
				'Content-Type': 'application/json'
			}
		}).catch((error)=>console.log("error ",error))

		setApiData(response.data.result);
	}

	const callDeleteApi = async (Id) => {

		const response = await axios.delete(`http://13.127.84.143:8080/INTMockTestPortal/api/v1/question/delete/${Id}`, {
			headers: {
				'Authorization': getToken(),
				'Content-Type': 'application/json'
			}	
		})
		if(response.status === 200){
			
			getApiData()
		}	
	}

	const onDelete = (Id) =>{
		showConfirmationDialogue(Id)
	}

	useEffect(() => {
		let token = getApiData()
	}, [])

	const showConfirmationDialogue = (Id) => {

		confirmAlert({
		  title: 'confirm Delete!',
		  message: 'Are you sure to do this.',
		  buttons: [
			{
			  label: 'Yes',
			  onClick: () => callDeleteApi(Id)
			},
			{
			  label: 'No',
			}
		  ]
		});
	  }

	return (
		<>
		{loading && <Spinner/>}
		{!loading &&
			<div className="container">
				<div className="table-responsive">
					<div className="table-wrapper">
						<div className="table-title"  style={{position: 'relative', height:'80px'}}>
							<div className="row">
								<h2>Questions List</h2>
								<Link to='/addquestion'><button className='btn btn-info' style={{ position: 'absolute', left:'900px'}}>Add Questions</button></Link>
							</div>
						</div>
						<table className="table table-striped table-hover" >
							<thead style={{color:'#aaa'}}>
								<tr>
									<th>#</th>
									<th>QuestionId</th>
									<th style={{textAlign:'center'}}>Questions</th>
									<th>Assesment</th>
									<th>Category</th>
									<th>Actions</th>
								</tr>
							</thead>
							
							<tbody>
								{apiData.reverse().slice(pagination.start, pagination.end).map(({ questionsDesc, assessmentType, questionType, questionsId }, index) => {
									return (
										<tr key={index}>
											<td>{<FaArrowRight/>}</td>
											<td>{questionsId}</td>
											<td>{questionsDesc}</td>
											<td>{assessmentType}</td>
											<td>{questionType}</td>
											<div className='d-flex row'>
											<Link to='/editdata' state={{ questionsId: questionsId, questionsDesc: questionsDesc, }}><td><IconContext.Provider value={{ className: "top-react-icons" }}><FaEdit/></IconContext.Provider></td></Link>
											<td onClick={() => onDelete(questionsId)} style={{cursor:'pointer'}}><IconContext.Provider value={{ className: "top-react-icons" }}><FaTrashAlt color="red"/></IconContext.Provider></td>
											</div>
										</tr>
										)})}
										</tbody>
									</table>
						<Pagination showPerPage={showPerPage} 
						onPaginationChange={onPaginationChange} 
				        total={apiData.length}/>
					</div>
				
				</div>
				
			</div>
}
		</>
	)
}
export default QuestionsList;
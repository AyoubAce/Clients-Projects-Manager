import React, {useState} from 'react'
import { UPDATE_PROJECT } from '../graphqlConfig/mutations/projectMutations';
import { GET_PROJECT } from '../graphqlConfig/queries/projectQueries';
import { useMutation } from '@apollo/client';

function UpdateProjectForm({project}) {
    const [projectInfo, setProjectInfo]= useState({
        name: project.name,
        description:project.description,
        status: project.status,
    })
    console.log(projectInfo);
    const [updateProject]= useMutation(UPDATE_PROJECT, {
        refetchQueries:[{query: GET_PROJECT, variables:{id:project.id}}]
    })
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(!projectInfo.name || !projectInfo.description || !projectInfo.status){
            alert("please fill in the fields")
        }
        updateProject( {variables:{id: project.id, name: projectInfo.name, description:projectInfo.description, status: checkStatus(projectInfo.status)}});
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectInfo((projectInfo) => {
          return { ...projectInfo, [name]: value };
        });
      };

      //check status return the key new/progress/completed 
      // for (enumurated status value) new: "Not started", progress: "In progress" ...
      const checkStatus= (status)=>{
      if(projectInfo.status==='Not started'){
          return "new"
      }
      else if(projectInfo.status==="In progress"){
          return 'progress'
      }
      else{ return "completed"}
      }
    

  return (
    <div className="form">
    <form className="input-container " onSubmit={handleSubmit}>
      <div className="input-field">
        <input type="text" name="name" placeholder='Project name' value={projectInfo.name} onChange={handleChange}/>
      </div>
      <div className="input-field">
        <textarea  name="description" placeholder='Description' value={projectInfo.description} onChange={handleChange}/>
      </div>
      <div className="input-field">
  <label>Status: </label>
    <select
      value={projectInfo.status}
      onChange={(e)=>{
          setProjectInfo((projectInfo)=>{
              return { ...projectInfo, status:e.target.value}
          })
      }}
      
    >   
        <option>Not started</option>
        <option>In progress</option>
        <option>Completed</option>
    </select>
    
  </div>
        <button type="submit">Update</button>
    </form>
  </div>
  )
}

export default UpdateProjectForm
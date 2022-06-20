import React from 'react'
import {gql, useQuery} from "@apollo/client"
import { GET_PROJECTS } from '../graphqlConfig/queries/projectQueries'

function Projects() {
    const {loading,error,data}= useQuery(GET_PROJECTS)
    if(loading) return <div>Loading...</div>
    if(error) return <div>Error...</div>
    
    console.log(data);
  return (
    <div className='projects-container'>
    <div className='projects'>
    {data.projects.map((project,index)=>{
        return <div className='project' key={index}>
                <h3>{project.name}</h3>
                <p>status: <i>{project.status}</i></p>
                <span><a href={`/projects/${project.id}`}>more details...</a></span>       
        </div>
    })}
    </div>
    </div>
  )
}

export default Projects
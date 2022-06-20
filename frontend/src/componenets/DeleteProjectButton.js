import React from 'react'
import {MdOutlineDeleteForever} from "react-icons/md"
import { DELETE_PROJECT } from '../graphqlConfig/mutations/projectMutations'
import { useMutation } from '@apollo/client'
import { GET_PROJECTS } from '../graphqlConfig/queries/projectQueries'
import { useNavigate } from 'react-router-dom'

function DeleteProjectButton({projectId}) {
    const navigate= useNavigate()
    const [deleteProject]= useMutation(DELETE_PROJECT,{
        variables:{id: projectId},
        onCompleted: ()=> navigate('/'),
        refetchQueries:[{query:GET_PROJECTS}],
    })
  return (
      <button className='delete-project-btn' onClick={deleteProject}>
    <MdOutlineDeleteForever/> Delete Project
      </button>
  )
}

export default DeleteProjectButton
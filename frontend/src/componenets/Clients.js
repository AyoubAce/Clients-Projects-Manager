import React from 'react'
import {MdOutlineDeleteForever} from "react-icons/md"
import {gql, useQuery, useMutation} from "@apollo/client"
import { GET_CLIENTS } from '../graphqlConfig/queries/clientQueries'
import { DELETE_CLIENT } from '../graphqlConfig/mutations/clientMutations'
import { GET_PROJECTS } from '../graphqlConfig/queries/projectQueries'



function Clients() {
    const {loading, error, data}= useQuery(GET_CLIENTS)
    const [deleteClient]= useMutation(DELETE_CLIENT,{
        refetchQueries:[{query: GET_CLIENTS}, {query: GET_PROJECTS}],
    })

    if(loading) return <div>Loading...</div>
    if(error) return <div>Error...</div>

  return (
    <div className='clients-container'>
    <div></div>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
             {data.clients.map((item,index)=>{
        return <tr key={index}>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
        <td>
            <button onClick={()=>deleteClient({variables: {id: item.id}})}><MdOutlineDeleteForever /></button>
        </td>
        </tr>
    })}
        </tbody>
    </table>
   
    </div>
  )
}

export default Clients
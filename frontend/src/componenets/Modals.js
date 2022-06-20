import React,{useState} from 'react'
import ClientModal from './ClientModal'
import ProjectModal from './ProjectModal'

function Modals() {
    
  return (
    <div className='modals'>
        <ClientModal/>
        <ProjectModal />
    </div>
  )
}

export default Modals
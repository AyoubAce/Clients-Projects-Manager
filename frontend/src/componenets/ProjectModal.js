import { Button, Modal } from "antd";
import { useState } from "react";
import {AiFillProject} from "react-icons/ai"
import {BiDetail} from "react-icons/bi"
import {useMutation, useQuery} from "@apollo/client"
import { GET_CLIENTS } from "../graphqlConfig/queries/clientQueries";
import {ADD_PROJECT} from "../graphqlConfig/mutations/projectMutations"
import {GET_PROJECTS} from "../graphqlConfig/queries/projectQueries"

function ProjectModal() {
  const [visible, setVisible] = useState(false);
  const [project, setProject] = useState({
    name: "",
    description: "",
    status: "new",
    clientId: "",

  });
  const [addProject]= useMutation(ADD_PROJECT,{
    refetchQueries: [{query: GET_PROJECTS}]
  })
  const {loading,error, data}= useQuery(GET_CLIENTS);
  if(loading) return <div>Loading...</div>
  if(error) return <div>Error... Please try again later</div>

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(() => {
      return { ...project, [name]: value };
    });
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
  
    if(!project.name || !project.description || !project.status || !project.clientId){
      alert("please fill the fields");
    }
    else{
       addProject({
         variables:{name: project.name, description: project.description, status:project.status, clientId:project.clientId}
       })
       setVisible(false);
      }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };


  return (
    <>
    <Button type="primary" onClick={showModal}>
      Add Project
    </Button>
    <Modal
      title="ADD A PROJECT"
      visible={visible}
      onCancel={handleCancel}
      onOk={handleOk}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Add Project
        </Button>,
      ]}
    >
    <div className="input-container">
    <form>
      <div className="input-field">
        <input
          type="text"
          placeholder="Project name"
          name="name"
          value={project.name}
          onChange={handleChange}
        />
        <AiFillProject className="input-icons"/>
      </div>
      <div className="input-field">
        <textarea
          placeholder="description"
          name="description"
          value={project.description}
          onChange={handleChange}
        />
        <BiDetail className="input-icons"/>
      </div>
      <div className="input-field">
      <label>Status: </label>
        <select
          name="status"
          onChange={handleChange}
        >   
            <option value="new">Not started</option>
            <option value="progress">In progress</option>
            <option value="completed">Completed</option>
        </select>
        
      </div>
      <div className="input-field">
      <label>Client: </label>
        <select
          name="clientId"
          onChange={handleChange}
          value={project.clientId}
        >   
            <option value="">Select client</option>
            {data?.clients.map((client, index)=>{
              return <option key={index} value={client.id}>{client.name}</option>
            })}
         
        </select>
        
      </div>
      </form>
      </div>
    </Modal>
  </>
  )
}

export default ProjectModal
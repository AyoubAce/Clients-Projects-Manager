import { Button, Modal } from "antd";
import { useState } from "react";
import {MdPerson,MdEmail, MdPhone} from "react-icons/md"
import {useMutation} from "@apollo/client"
import {ADD_CLIENT} from "../graphqlConfig/mutations/clientMutations"
import { GET_CLIENTS } from "../graphqlConfig/queries/clientQueries";

function ClientModal() {
  const [addClient, { loading ,error}]= useMutation(ADD_CLIENT,{
   refetchQueries: [{query: GET_CLIENTS}]
  })
  const [visible, setVisible] = useState(false);
  const [client, setClient] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient(() => {
      return { ...client, [name]: value };
    });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
  
    if(!client.name || !client.email || !client.phone){
      alert("Please fill in all the fields")
    }
    else{
        addClient({
          variables:{name:client.name, email:client.email, phone:client.phone}
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
        Add Client
      </Button>
      <Modal
        title="ADD CLIENT"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} >
            Add Client
          </Button>,
        ]}
      >
      <div className="input-container">
      <form>
        <div className="input-field">
          <input
            type="text"
            placeholder="name"
            name="name"
            onChange={handleChange}
          />
          <MdPerson className="input-icons"/>
        </div>
        <div className="input-field">
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
            required
          />
          <MdEmail className="input-icons"/>
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="phone"
            name="phone"
            onChange={handleChange}
          />
          <MdPhone className="input-icons"/>
        </div>
        </form>
        </div>
      </Modal>
    </>
  );
}

export default ClientModal;

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdOutlineKeyboardBackspace,
} from "react-icons/md";
import { GET_PROJECT } from "../graphqlConfig/queries/projectQueries";
import { UPDATE_PROJECT } from "../graphqlConfig/mutations/projectMutations";
import { GET_CLIENTS } from "../graphqlConfig/queries/clientQueries";
import DeleteProjectButton from "./DeleteProjectButton";
import { Steps } from "antd";
import UpdateProjectForm from "./UpdateProjectForm";
const { Step } = Steps;

function Project() {
  const { id } = useParams();
  const [updatedData, setUpdatedData] = useState({ name: "", description: "", status: "", clientId: "" });
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: id },
  });

  if (loading) return <div>Loading... </div>;
  if (error) return <div>Something went wrong...</div>;
  const { project } = data;

  const statusControll = [
    "Not started",
    "In progress",
    "added to set completed CHECKED",
    "Completed",
  ];
  //check status index for STEPS current position ,  completed: is on the 4th position to make it checked by <Stepper>
    function statusPosition(status) {
    return statusControll.indexOf(status);
  }
  
  console.log(project);
  return (
    <div className="project-page">
      <div className="link-container">
        <Link to="/" className="back-link">
          {" "}
          <MdOutlineKeyboardBackspace /> Back
        </Link>
      </div>

      <div className="project-details">
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <h3>Status:</h3>
        <div className="steps">
          <Steps size="small" current={statusPosition(project.status)}>
            <Step
              title={
                statusPosition(project.status) !== 0 ? "Started" : "Not Started"
              }
            />
            <Step title="In Progress" />
            <Step title="Completed" />
          </Steps>
        </div>
        <div className="client-info">
          <h3>Client Info:</h3>
          {project.client ? (
            <>
              <p>
                <MdPerson size={20} /> {project.client?.name}
              </p>
              <p>
                <MdEmail size={20} /> {project.client.email}
              </p>
              <p>
                <MdPhone size={20} /> {project.client.phone}
              </p>
            </>
          ) : (
            <p>No client was assigned to this project</p>
          )}
        </div>
        <div>
          <DeleteProjectButton projectId={project.id} />
        </div>
      </div>
      <h2>Update Project</h2>
      <UpdateProjectForm  project={project}/>
     
    </div>
  );
}

export default Project;

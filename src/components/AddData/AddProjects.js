import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  CreateProjects,
  fetchclientdata,
  fetchemployeedata,
  FetchIndividualProjectData,
  PatchProjectData,
} from '../../action';
import FileBase64 from 'react-file-base64';
import { useHistory, useParams } from 'react-router-dom';
const INPUT = styled(Field)`
  height: 5vh;
  border-color: burlywood;
  border-radius: 10px;
`;
const BOLD = styled.b`
  color: wheat;
`;
const SignupSchema = Yup.object().shape({
  ProjectName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Enter Project Name'),
  Description: Yup.string()
    .min(2, 'Too Short!')
    .max(5000, 'Too Long!')
    .required('Enter Description'),
  Client: Yup.string()
    .min(2, 'Too Short!')
    .max(5000, 'Too Long!')
    .required('Choose Client'),
  Mode: Yup.string()
    .min(2, 'Too Short!')
    .max(5000, 'Too Long!')
    .required('Choose any one Mode'),
  Type: Yup.string()
    .min(2, 'Too Short!')
    .max(5000, 'Too Long!')
    .required('Choose any one Type'),
  Technology: Yup.string()
    .min(2, 'Too Short!')
    .max(5000, 'Too Long!')
    .required('Choose Technology'),
  Estimate: Yup.number()
    .min(2, 'Too Short!')
    .max(5000, 'Too Long!')
    .required('Enter Estimate Time in hrs'),
  Resources: Yup.string()
    .min(2, 'Too Short!')
    .max(5000, 'Too Long!')
    .required('Select the resources needed'),
});
const AddProjects = () => {
  const history = useHistory();
  const { id } = useParams();
  const [file, setfile] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchclientdata());
    dispatch(fetchemployeedata());
  }, []);
  useEffect(() => {
    dispatch(FetchIndividualProjectData(id));
  }, []);
  const { Clientsdata, Employeedata, ProjectEditteddata } = useSelector(
    (state) => state.reducer
  );
  const Clientsdatamap = Clientsdata.map((data, index) => {
    return (
      <>
        <option key={index} value={data.firstName + data.lastName}>
          {data.firstName + data.lastName}
        </option>
      </>
    );
  });

  const Employeedatamap = Employeedata.map((datas, index) => {
    return (
      <option key={index} value={datas.Name}>
        {datas.Name}
      </option>
    );
  });
  return (
    <div
      style={{
        background:
          'Url(https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvamVjdHN8ZW58MHx8MHx8&w=1000&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '120vh',
        // backgroundPosition: ' -50px',

        // background: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h1>Add Project Details</h1>
      </div>
      <Formik
        initialValues={{
          ProjectName: id ? ProjectEditteddata.ProjectName : '',
          Description: id ? ProjectEditteddata.Description : '',
          Client: id ? ProjectEditteddata.Client : '',
          Mode: id ? ProjectEditteddata.Mode : '',
          Type: id ? ProjectEditteddata.Type : '',
          Technology: id ? ProjectEditteddata.Technology : '',
          Estimate: id ? ProjectEditteddata.Estimate : '',
          Resources: id ? ProjectEditteddata.Resources : '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          values = { ...values, Assets: file };
          if (id) {
            dispatch(PatchProjectData(id, values));
            resetForm();
            history.push('/ListProjects');
          } else {
            dispatch(CreateProjects(values));
            resetForm();
            history.push('/ListProjects');
          }

          console.log(values);
        }}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '30%',
              margin: 'auto',
            }}
          >
            <BOLD>ProjectName</BOLD>
            <INPUT name="ProjectName" />
            <span style={{ color: 'red' }}>
              {errors.ProjectName && touched.ProjectName ? (
                <div>{errors.ProjectName}</div>
              ) : null}
            </span>
            <BOLD> Description</BOLD>
            <INPUT name="Description" />
            <span style={{ color: 'red' }}>
              {errors.Description && touched.Description ? (
                <div>{errors.Description}</div>
              ) : null}
            </span>
            <BOLD>Choose Client</BOLD>
            <INPUT as="select" name="Client">
              <option>Select a Client</option>
              {Clientsdatamap}
            </INPUT>
            <span style={{ color: 'red' }}>
              {errors.Client && touched.Client ? (
                <div>{errors.Client}</div>
              ) : null}
            </span>
            <BOLD>Mode</BOLD>
            <div style={{ display: 'flex', flexDirection: 'row ' }}>
              <div>
                <b style={{ color: 'yellow' }}>Internal</b>
                <Field type="radio" name="Mode" value="Internal"></Field>
              </div>
              <div style={{ margin: '0% 0% 0% 4%' }}>
                <b style={{ color: 'yellow' }}>External</b>
                <Field type="radio" name="Mode" value="External" />
              </div>
            </div>
            <span style={{ color: 'red' }}>
              {errors.Mode && touched.Mode ? <div>{errors.Mode}</div> : null}
            </span>
            <BOLD>Type</BOLD>
            <div style={{ display: 'flex', flexDirection: 'row ' }}>
              <div>
                <b style={{ color: 'yellow' }}>Service</b>
                <Field type="radio" name="Type" value="Service"></Field>
              </div>
              <div style={{ margin: '0% 0% 0% 5%' }}>
                <b style={{ color: 'yellow' }}>Product</b>
                <Field type="radio" name="Type" value="Product" />
              </div>
            </div>
            <span style={{ color: 'red' }}>
              {errors.Type && touched.Type ? <div>{errors.Type}</div> : null}
            </span>
            <BOLD>Choose technology</BOLD>
            <INPUT as="select" name="Technology">
              <option>Select a Technology</option>
              <option value="React">
                <b>React</b>
              </option>
              <option value="Node">
                <b>Node</b>
              </option>
              <option value="Cold Fusion">
                <b>Cold Fusion</b>
              </option>
              <option value="ROR">
                <b>ROR</b>
              </option>
              <option value="Python">
                <b>Python</b>
              </option>
            </INPUT>
            <span style={{ color: 'red' }}>
              {errors.Technology && touched.Technology ? (
                <div>{errors.Technology}</div>
              ) : null}
            </span>
            <BOLD>Estimate</BOLD>
            <INPUT name="Estimate" />
            <span style={{ color: 'red' }}>
              {errors.Estimate && touched.Estimate ? (
                <div>{errors.Estimate}</div>
              ) : null}
            </span>
            <FileBase64
              multiple={true}
              onDone={(files) => setfile(files[0].base64)}
            />
            <a href={file} download>
              <BOLD> Download</BOLD>
            </a>
            <BOLD>Choose Resources</BOLD>
            <INPUT as="select" name="Resources">
              <option>Select Resources</option>
              {Employeedatamap}
            </INPUT>
            <span style={{ color: 'red' }}>
              {errors.Resources && touched.Resources ? (
                <div>{errors.Resources}</div>
              ) : null}
            </span>
            <button
              style={{ margin: '5% 0% 0% 0%' }}
              className="btn btn-danger"
              type="submit"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProjects;

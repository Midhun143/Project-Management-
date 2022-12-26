import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  CreateTasks,
  fetchemployeedata,
  FetchIndividualTasksData,
  fetchProjectdata,
  PatchTasksData,
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
  Project: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  Milestone: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  Sprint: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  Tasks: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  TaskDescription: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  Allocation: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});
const AddTasks = () => {
  const history = useHistory();
  const { id } = useParams();
  const [file, setfile] = useState();
  const [Milestonebutton, setMilestonebutton] = useState('');
  console.log('Milestonebutton:', Milestonebutton);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjectdata());
    dispatch(fetchemployeedata());
  }, []);
  const { Projectdata, Employeedata, TasksEditteddata } = useSelector(
    (state) => state.reducer
  );
  const projectdatamap = Projectdata.map((data, index) => {
    return (
      <option key={index} value={data.ProjectName}>
        {data.ProjectName}
      </option>
    );
  });
  useEffect(() => {
    if (id) {
      dispatch(FetchIndividualTasksData(id));
    }
  }, []);
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
          'Url(https://img.freepik.com/free-vector/business-team-meeting-office-co-working-space_74855-6913.jpg?w=2000)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '120vh',
        backgroundPosition: '+10px -50px',
        // backgroundPosition: ' -50px',

        // background: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1>Add tasks</h1>
      </div>
      <Formik
        initialValues={{
          Project: id ? TasksEditteddata.Project : '',
          Milestone: id ? TasksEditteddata.Milestone : '',
          Sprint: id ? TasksEditteddata.Sprint : '',
          Tasks: id ? TasksEditteddata.Tasks : '',
          TaskDescription: id ? TasksEditteddata.TaskDescription : '',
          Allocation: id ? TasksEditteddata.Allocation : '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          values = { ...values, Attachment: file };
          if (id) {
            dispatch(PatchTasksData(id, values));
            resetForm();
            history.push('/ListTasks');
          } else {
            dispatch(CreateTasks(values));
            resetForm();
            history.push('/ListTasks');
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
            <b>Choose Project</b>
            <INPUT as="select" name="Project">
              <option>Select a Project</option>
              {projectdatamap}
            </INPUT>
            <span style={{ color: 'red' }}>
              {errors.Project && touched.Project ? (
                <div>{errors.Project}</div>
              ) : null}
            </span>
            <b>Choose Milestone</b>
            <INPUT
              as="select"
              name="Milestone"
              onClick={(e) => setMilestonebutton(e.target.value)}
            >
              <option>Select a Milestone</option>
              <option value="Milestone 1">
                <b>Milestone 1</b>
              </option>
              <option value="Milestone 2">
                <b>Milestone 2</b>
              </option>
            </INPUT>
            <span style={{ color: 'red' }}>
              {errors.Milestone && touched.Milestone ? (
                <div>{errors.Milestone}</div>
              ) : null}
            </span>
            <b>Choose Sprint</b>
            <INPUT as="select" name="Sprint">
              <option>Select a Sprint</option>
              {Milestonebutton === 'Milestone 1' ? (
                <>
                  <option value="Sprint 1">
                    <b>Sprint 1</b>
                  </option>
                  <option value="Sprint 2">
                    <b>Sprint 2</b>
                  </option>
                </>
              ) : (
                <>
                  <option value="Sprint 3">
                    <b>Sprint 3</b>
                  </option>
                  <option value="Sprint 4">
                    <b>Sprint 4</b>
                  </option>
                </>
              )}
            </INPUT>
            <span style={{ color: 'red' }}>
              {errors.Milestone && touched.Milestone ? (
                <div>{errors.Milestone}</div>
              ) : null}
            </span>
            <b>Tasks</b>
            <INPUT name="Tasks" />
            <span style={{ color: 'red' }}>
              {errors.Tasks && touched.Tasks ? <div>{errors.Tasks}</div> : null}
            </span>
            <b>TaskDescription</b>
            <INPUT name="TaskDescription" />
            <span style={{ color: 'red' }}>
              {errors.TaskDescription && touched.TaskDescription ? (
                <div>{errors.TaskDescription}</div>
              ) : null}
            </span>
            <FileBase64
              multiple={true}
              onDone={(files) => setfile(files[0].base64)}
            />
            <a href={file} download>
              <b> Download</b>
            </a>
            <b>Choose Resources</b>
            <INPUT as="select" name="Allocation">
              <option>Select Employee</option>
              {Employeedatamap}
            </INPUT>
            <span style={{ color: 'red' }}>
              {errors.Allocation && touched.Allocation ? (
                <div>{errors.Allocation}</div>
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

export default AddTasks;

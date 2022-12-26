import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ImageUploader from 'react-images-upload';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  CreateEmployees,
  FetchIndividualEmployeeData,
  PatchEmployeeData,
} from '../../action';
import { useHistory, useParams } from 'react-router-dom';
const INPUT = styled(Field)`
  height: 5vh;
  border-color: burlywood;
  border-radius: 10px;
`;
const BOLD = styled.b`
  color: black;
`;
// ! Validation Given by Formik and Yup
const SignupSchema = Yup.object().shape({
  Name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  EMPID: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  Skills: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  Department: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
});
const AddEmployees = () => {
  const history = useHistory();
  const { EmployeeEditteddata } = useSelector((state) => state.reducer);
  console.log('EmployeeEditteddata', EmployeeEditteddata);
  const { id } = useParams();
  const dispatch = useDispatch();
  //   ! Image Uploader Package to upload Image
  const [selectedImage, setSelectedImage] = useState('');
  const onDrop = (pictureFiles, pictureDataURLs) => {
    setSelectedImage(pictureDataURLs[0]);
  };
  //   ! fetch selected employee data from Json
  useEffect(() => {
    if (id) {
      dispatch(FetchIndividualEmployeeData(id));
    }
  }, []);
  return (
    <div
      style={{
        background:
          'Url(https://web-static.wrike.com/blog/content/uploads/2015/11/iStock-1279198130.jpg?av=c6371769d5f173e1b4dc23109301b400)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '110vh',

        // background: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1>Add Employee Details</h1>
      </div>
      <Formik
        //   ! initial Values Given By Formik
        initialValues={{
          // * Condition written for datas to appear in input fields in edit mode
          Name: id ? EmployeeEditteddata.Name : '',
          email: id ? EmployeeEditteddata.email : '',
          EMPID: id ? EmployeeEditteddata.EMPID : '',
          Department: id ? EmployeeEditteddata.Department : '',
          Skills: id ? EmployeeEditteddata.Skills : '',
          experience: id ? EmployeeEditteddata.experience : '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          values = { ...values, Image: selectedImage };
          if (id) {
            dispatch(PatchEmployeeData(id, values));
            // ! resets the form after form submit
            resetForm();
            // ! redirects to given link
            history.push('/ListEmployees');
          } else {
            dispatch(CreateEmployees(values));
            resetForm();
            history.push('/ListEmployees');
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
            <BOLD>Name</BOLD>
            <INPUT name="Name" />
            {/* Display Errors */}
            <span style={{ color: 'red' }}>
              {errors.Name && touched.Name ? <div>{errors.Name}</div> : null}
            </span>
            <b>Email</b>
            <INPUT name="email" type="email" />
            <span style={{ color: 'red' }}>
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </span>
            <b>EMPID</b>
            <INPUT name="EMPID" />
            <span style={{ color: 'red' }}>
              {errors.EMPID && touched.EMPID ? <div>{errors.EMPID}</div> : null}
            </span>
            <b>Department</b>
            <INPUT name="Department" />
            <span style={{ color: 'red' }}>
              {errors.Department && touched.Department ? (
                <div>{errors.Department}</div>
              ) : null}
            </span>
            <BOLD> Skills</BOLD>
            <INPUT name="Skills" />
            <span style={{ color: 'red' }}>
              {errors.Skills && touched.Skills ? (
                <div>{errors.Skills}</div>
              ) : null}
            </span>
            <b>Experience</b>
            <INPUT name="experience" />
            <span style={{ color: 'red' }}>
              {errors.experience && touched.experience ? (
                <div>{errors.experience}</div>
              ) : null}
            </span>
            {/* Image Uploader Package */}
            <ImageUploader
              name="selectedImage"
              singleImage={true}
              withPreview={true}
              withIcon={true}
              buttonText="Choose images"
              onChange={onDrop}
              imgExtension={['.jpeg', '.jpg', '.gif', '.png', '.gif']}
              maxFileSize={3242880}
              withLabel={false}
            />
            <button className="btn btn-danger" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEmployees;

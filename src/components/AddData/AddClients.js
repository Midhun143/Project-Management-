import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ImageUploader from 'react-images-upload';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  CreateClients,
  FetchIndividualClientData,
  PatchClientData,
} from '../../action';
import { useHistory, useParams } from 'react-router-dom';

const INPUT = styled(Field)`
  height: 5vh;
  border-color: burlywood;
  border-radius: 10px;
`;
// ! Validation Given by Formik and Yup
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  country: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});
const AddClients = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  //   ! Image Uploader Package to upload Image
  const [selectedImage, setSelectedImage] = useState('');
  const onDrop = (pictureFiles, pictureDataURLs) => {
    setSelectedImage(pictureDataURLs[0]);
  };
  //   ! fetch selected Client data from Json
  useEffect(() => {
    if (id) {
      dispatch(FetchIndividualClientData(id));
    }
  }, []);
  const { ClientsEditteddata } = useSelector((state) => state.reducer);
  console.log('ClientsEditteddata', ClientsEditteddata);
  return (
    <div
      style={{
        background:
          'Url(https://cdn.searchenginejournal.com/wp-content/uploads/2021/06/20-must-ask-questions-for-new-seo-clients-60b8b4f66ed3f-760x400.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '90vh',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1>Add Client Details</h1>
      </div>
      <Formik
        //   ! initial Values Given By Formik
        initialValues={{
          // * Condition written for datas to appear in input fields in edit mode
          firstName: id ? ClientsEditteddata.firstName : '',
          lastName: id ? ClientsEditteddata.lastName : '',
          email: id ? ClientsEditteddata.email : '',
          country: id ? ClientsEditteddata.country : '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          values = { ...values, Image: selectedImage };
          if (id) {
            dispatch(PatchClientData(id, values));
            // ! resets the form after form submit
            resetForm();
            // ! redirects to given link
            history.push('/ListClients');
          } else {
            dispatch(CreateClients(values));
            resetForm();
            history.push('/ListClients');
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
            <b> First Name</b>
            <INPUT name="firstName" />
            {/* Display Errors */}
            <span style={{ color: 'red' }}>
              {' '}
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
            </span>
            <b> Last name</b>
            <INPUT name="lastName" />
            <span style={{ color: 'red' }}>
              {errors.lastName && touched.lastName ? (
                <div>{errors.lastName}</div>
              ) : null}
            </span>
            <b> Email</b>
            <INPUT name="email" type="email" />
            <span style={{ color: 'red' }}>
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </span>
            <b>Country</b>
            <INPUT name="country" />
            <span style={{ color: 'red' }}>
              {errors.country && touched.country ? (
                <div>{errors.country}</div>
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

export default AddClients;

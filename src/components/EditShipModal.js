import { IconButton, Snackbar } from '@material-ui/core';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

const EditShipModal = props => {
  const [snackBarOpen, isSnackBarOpen] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState('');
  const [validateOnChange, setValidateOnChange] = useState(false);

  const snackBarClose = () => isSnackBarOpen(false);

  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is required';
    }

    if (!values.length) {
      errors.length = 'Length (metres) is required';
    } else if (!/^[0-9]*\.?[0-9]*$/.test(values.length)) {
      errors.length = 'Length (metres) is not valid';
    }

    if (!values.width) {
      errors.width = 'Width (width) is required';
    } else if (!/^[0-9]*\.?[0-9]*$/.test(values.width)) {
      errors.width = 'Width (metres) is not valid';
    }

    if (!values.code) {
      errors.code = 'Code is required';
    } else if (
      !/^[A-Z]{4}-\d{4}-[A-Z]{1}\d{1}/.test(values.code) ||
      values.code.length > 12
    ) {
      errors.code = 'Code is not valid';
    }

    return errors;
  };

  const handleValidationError = () => {
    isSnackBarOpen(true);
    setSnackBarMsg('Failed due to validation errors');
  };

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange,
    initialValues: {
      id: props.shipid,
      name: props.name,
      length: props.length,
      width: props.width,
      code: props.code,
    },
    validate,
    onSubmit: async values => {
      let result = await axios.put(`http://localhost:8080/ships/${values.id}`, {
        id: values.id,
        name: values.name,
        length: values.length,
        width: values.width,
        code: values.code,
      });
      isSnackBarOpen(true);
      setSnackBarMsg(result.data);
      props.onHide();
    },
  });

  const formSubmit = e => {
    setValidateOnChange(true);
    return formik.isValid ? formik.handleSubmit(e) : handleValidationError(e);
  };

  return (
    <div className='container'>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackBarOpen}
        autoHideDuration={5000}
        onClose={snackBarClose}
        message={<span id='message-id'>{snackBarMsg}</span>}
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            onClick={snackBarClose}
          >
            x
          </IconButton>,
        ]}
      />
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Edit Ship
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={formSubmit}>
                <Form.Group controlId='id'>
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type='text'
                    name='id'
                    required
                    defaultValue={formik.values.id}
                    disabled
                    placeholder='ID'
                  />
                </Form.Group>
                <Form.Group controlId='Name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    required
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder='Name'
                    isInvalid={!!formik.errors.name}
                  />
                  {formik.errors.name && (
                    <Form.Control.Feedback type='invalid'>
                      {formik.errors.name}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId='Length'>
                  <Form.Label>Length (metres)</Form.Label>
                  <Form.Control
                    type='text'
                    name='length'
                    onChange={formik.handleChange}
                    required
                    value={formik.values.length}
                    placeholder='Length'
                    isInvalid={!!formik.errors.length}
                  />
                  {formik.errors.length && (
                    <Form.Control.Feedback type='invalid'>
                      {formik.errors.length}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId='Width'>
                  <Form.Label>Width (metres)</Form.Label>
                  <Form.Control
                    type='text'
                    name='width'
                    onChange={formik.handleChange}
                    required
                    value={formik.values.width}
                    placeholder='Width'
                    isInvalid={!!formik.errors.width}
                  />
                  {formik.errors.width && (
                    <Form.Control.Feedback type='invalid'>
                      {formik.errors.width}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId='Code'>
                  <Form.Label>Code (AAAA-0000-A0)</Form.Label>
                  <Form.Control
                    type='text'
                    name='code'
                    onChange={formik.handleChange}
                    value={formik.values.code}
                    required
                    placeholder='Code'
                    isInvalid={!!formik.errors.code}
                  />
                  {formik.errors.code && (
                    <Form.Control.Feedback type='invalid'>
                      {formik.errors.code}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group>
                  <Button variant='primary' type='submit'>
                    Update Ship
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditShipModal;

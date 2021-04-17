import { IconButton, Snackbar } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';



const CreateShipModal = props => {
    const [ form, setForm ] = useState({});
    const [ errors, setErrors ] = useState({});
    const [snackBarOpen, isSnackBarOpen] = useState(false);
    const [snackBarMsg, setSnackBarMsg] = useState('');

    const snackBarClose = event => isSnackBarOpen(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = findFormErrors()
    // Conditional logic:
        if ( Object.keys(newErrors).length > 0 ) {
      // We got errors!
            setErrors(newErrors)
            isSnackBarOpen(true);
            setSnackBarMsg('Failed due to validation errors');
        } else {
            let result = await axios.post("http://localhost:8080/ships", 
            { 
                name: event.target.name.value,
                length: event.target.length.value,
                width: event.target.width.value,
                code: event.target.code.value
             });
             isSnackBarOpen(true);
             setSnackBarMsg(result.data);
             props.onHide();
        }
    }
    const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
  }
  const findFormErrors = () => {
    const { name, length, width, code } = form
    const newErrors = {}
    // name errors
    if ( name.length > 50 ) newErrors.name = 'Name is too long!'
    const expr = /^[0-9]*\.?[0-9]*$/
    // length errors
    if ( !expr.test(length) ) newErrors.length = 'Length is not valid!'
    if ( !expr.test(width) ) newErrors.width = 'Width is not valid!'
    const codeExpr = /^[A-Z]{4}-\d{4}-[A-Z]{1}\d{1}/
    if ( !codeExpr.test(code) ) newErrors.code = 'Code is not valid (format: AAAA-0000-A0)!'

    return newErrors
    }

    return (
        <div className="container">
        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={snackBarClose}
        message={<span id="message-id">{snackBarMsg}</span>}
        action={[
            <IconButton 
                key="close" 
                aria-label="Close" 
                color="inherit" 
                onClick={snackBarClose}>x</IconButton>
        ]} />
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Ship
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
            <Col sm={6}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name" 
                            onChange={ e => setField('name', e.target.value) } 
                            required 
                            isInvalid={ !!errors.name }
                            placeholder="Name"/>
                            <Form.Control.Feedback type='invalid'>
                                { errors.name }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="Length">
                        <Form.Label>Length (metres)</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="length" 
                            onChange={ e => setField('length', e.target.value) } 
                            required 
                            isInvalid={ !!errors.length }
                            placeholder="Length"/>
                            <Form.Control.Feedback type='invalid'>
                                { errors.length }
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="Width">
                        <Form.Label>Width (metres)</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="width" 
                        onChange={ e => setField('width', e.target.value) } 
                        required 
                        isInvalid={ !!errors.width }
                        placeholder="Width"/>
                        <Form.Control.Feedback type='invalid'>
                            { errors.width }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="Code">
                        <Form.Label>Code (AAAA-0000-A0)</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="code" 
                        onChange={ e => setField('code', e.target.value) } 
                        required 
                        isInvalid={ !!errors.code }
                        placeholder="Code"/>
                        <Form.Control.Feedback type='invalid'>
                            { errors.code }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">Create Ship</Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
    );
}

export default CreateShipModal;
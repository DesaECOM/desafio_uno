import { useEffect, useRef, useState } from 'react';
import { Col, Row, Button, Modal, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed, faFloppyDisk} from '@fortawesome/free-solid-svg-icons';
import { useRut } from "react-rut-formatter";
import api from '../../assets/js/api';
import { ToastContainer, toast } from 'react-toastify';

import PropTypes from 'prop-types';



const ModalCustomer = ({ showModal = false, selectValue, closeModal }) => {
    const [validated, setValidated] = useState(false);
    const formRef = useRef(null);
    
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const { rut, updateRut, isValid } = useRut();
    const [companyReason, setCompanyReason] = useState('');
    const [startDate, setStartDate] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (formRef.current !== null) {
            const isValidFrom = formRef.current.checkValidity();

            if (!isValidFrom) {
                formRef.current.reportValidity();
            } else {
                if (!isValid) {
                    toast.warning("El RUN se encuentra inválido", {
                        position: toast.POSITION.TOP_RIGHT
                    });

                    return false;
                } else {
                    setLoading(true);
                    if (id == null) {
                        await api.post('customer', {
                            name: name,
                            rbd: rut.formatted,
                            companyReason: companyReason,
                            startDate: startDate
                        })
                        .then(response => {
                            toast.success(response.data.message, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        })
                        .catch(error => {
                            if (error.response && error.response.status === 409) {
                                // Manejar el código de estado 409 (conflicto)
                                console.log('Error 409: Conflicto');
                                console.log(error.response.data); // Datos de la respuesta
                                toast.warning(error.response.data.message, {
                                    position: toast.POSITION.TOP_RIGHT
                                });
                            } else {
                                // Manejar otros errores
                                console.error('Error:', error);
                            }
                        });
                    } else {
                        await api.put('customer', {
                            id: id,
                            name: name,
                            rbd: rut.formatted,
                            companyReason: companyReason,
                            startDate: startDate
                        })
                        .then(response => {
                            toast.success(response.data.message, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        })
                        .catch(error => {
                            if (error.response && error.response.status === 409) {
                                // Manejar el código de estado 409 (conflicto)
                                console.log('Error 409: Conflicto');
                                console.log(error.response.data); // Datos de la respuesta
                                toast.warning(error.response.data.message, {
                                    position: toast.POSITION.TOP_RIGHT
                                });
                            } else {
                                // Manejar otros errores
                                console.error('Error:', error);
                            }
                        });
                    }

                    setTimeout(() => {
                        setLoading(false);
                        closeModal(true);
                    }, 500);
                }
            }
        }

        setValidated(true);
    };


    useEffect(() => {
        const setValueCustomer = async () => {
            setValidated(false);

            if (selectValue != null && selectValue?.id > 0 && showModal) {
                setId(selectValue?.id || null);
                setName(selectValue?.name || '');
                updateRut(selectValue?.rbd || '');
                setCompanyReason(selectValue?.companyReason || '');
                setStartDate(selectValue?.startDate || '');
            } else {
                setId(null);
                setName('');
                updateRut('');
                setCompanyReason('');
                setStartDate('');
            }
        };

        setValueCustomer();
    }, [showModal]);
    
    return (
        <>
        <Modal show={showModal} onHide={() => closeModal(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title><h3 className="mb-0">Cliente</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} ref={formRef}  className={loading && 'placeholder-glow'}>
                    <Row className="mb-3 g-4">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Rut</Form.Label>
                            <Form.Control
                                type="text"
                                id="rut"
                                autoComplete="off"
                                value={ rut.formatted }
                                onChange={(e) => updateRut(e.target.value)}
                                className={loading && "disabled placeholder bg-info" }
                                required/>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Nombre completo</Form.Label>
                            <Form.Control 
                                type="text"
                                id="name"
                                autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                className={loading && "disabled placeholder bg-info" }
                                value={ name }
                                required />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Razon social</Form.Label>
                            <Form.Control 
                                type="text"
                                id="surname"
                                autoComplete="off"
                                onChange={(e) => setCompanyReason(e.target.value)}
                                className={loading && "disabled placeholder bg-info" }
                                value={ companyReason || ''}
                                required />
                        </Form.Group>                       
                        <Form.Group as={Col} md="6">
                            <Form.Label>Fecha de ingreso</Form.Label>
                            <Form.Control 
                                type="date"
                                autoComplete="off"
                                value={ startDate || ''}
                                className={loading && "disabled placeholder bg-info" }
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className={loading && 'placeholder-glow'}>                
                <Button variant="primary" type="submit"  className={loading && "disabled placeholder" } onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faFloppyDisk} /> Guardar
                </Button>
                <Button variant="secondary" onClick={() => closeModal(false)}>
                    <FontAwesomeIcon icon={faDoorClosed} /> Salir
                </Button>
            </Modal.Footer>
        </Modal>
        <ToastContainer />
        </>
    );
};

ModalCustomer.propTypes = {
    showModal: PropTypes.bool,
    selectValue: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        rbd: PropTypes.string,
        companyReason: PropTypes.string,
        startDate: PropTypes.string,
    }),
    closeModal: PropTypes.func.isRequired
};

export default ModalCustomer;
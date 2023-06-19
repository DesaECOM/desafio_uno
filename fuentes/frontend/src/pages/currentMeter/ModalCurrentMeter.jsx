import { useEffect, useRef, useState } from 'react';
import { Col, Row, Button, Modal, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed, faFloppyDisk} from '@fortawesome/free-solid-svg-icons';
import api from '../../assets/js/api';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import SelectCustomer from "./SelectCustomer";

const ModalCurrentMeter = ({ showModal = false, selectValue, closeModal }) => {
    const [validated, setValidated] = useState(false);
    const formRef = useRef(null);

    const [id, setId] = useState(null);
    const [physicalaAddress, setPhysicalaAddress] = useState('');
    const [installationNumber, setInstallationNumber] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [customer, setCustomer] = useState('');
    const [evolId, setEvolId] = useState('');
    const [loading, setLoading] = useState(false);
    
    const generateUniqueId = () => {
      const id = uuidv4();
      return id;
    };

    const handleSubmit = async () => {
        if (formRef.current !== null) {
            const isValidFrom = formRef.current.checkValidity();

            if (!isValidFrom) {
                formRef.current.reportValidity();
            } else {
                
                setLoading(true);
                if (id == null) {
                    await api.post('current-meter', {
                        physicalaAddress: physicalaAddress,
                        installationNumber: installationNumber,
                        evolId: evolId,
                    }, {params: {
                        customerId: customerId
                    }})
                    .then(response => {
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 409) {
                            // Manejar el código de estado 409 (conflicto)
                            console.log('Error 409: Conflicto');
                            toast.warning(error.response.data.message, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        } else {
                            // Manejar otros errores
                            console.error('Error:', error);
                        }
                    });
                } else {
                    await api.put('current-meter', {
                        id: id,
                        physicalaAddress: physicalaAddress,
                        installationNumber: installationNumber,
                        evolId: evolId,
                        }, {params: {
                        customerId: customerId
                    }})
                    .then(response => {
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 409) {
                            // Manejar el código de estado 409 (conflicto)
                            console.log('Error 409: Conflicto');

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

        setValidated(true);
    };

    const changeCustomer = (value) => {
        setCustomerId(value.id)
    };
    
    useEffect(() => {
        const setValueCustomer = async () => {
            setValidated(false);

            if (selectValue != null && selectValue?.id > 0 && showModal) {
                setId(selectValue?.id || null);
                setPhysicalaAddress(selectValue?.physicalaAddress || '');
                setInstallationNumber(selectValue?.installationNumber || '');
                setCustomerId(selectValue?.customerId || '');
                setEvolId(selectValue?.evolId || generateUniqueId);
                setCustomer(selectValue?.customer || {})
            } else {
                setId(null);
                setPhysicalaAddress('');
                setInstallationNumber('');
                setCustomerId('');
                setCustomer({})
                setEvolId(generateUniqueId);
            }
        };

        setValueCustomer();
    }, [showModal]);
    
    return (
        <>
        <Modal show={showModal} onHide={() => closeModal(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title><h3 className="mb-0">Medidor</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} ref={formRef}  className={loading && 'placeholder-glow'}>
                    <Row className="mb-3 g-4">
                        <Form.Group as={Col} md="6">
                            <Form.Label>Dirección física</Form.Label>
                            <Form.Control 
                                type="text"
                                id="name"
                                autoComplete="off"
                                onChange={(e) => setPhysicalaAddress(e.target.value)}
                                className={loading && "disabled placeholder bg-info" }
                                value={ physicalaAddress }
                                required />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Numero de instalación</Form.Label>
                            <Form.Control 
                                type="number"
                                id="installationNumber"
                                autoComplete="off"
                                onChange={(e) => setInstallationNumber(e.target.value)}
                                className={loading && "disabled placeholder bg-info" }
                                value={ installationNumber || 0}
                                required />
                        </Form.Group>                       
                        <Form.Group as={Col} md="12">
                            <Form.Label>Evol Id</Form.Label>
                            <Form.Control 
                                type="text"
                                id="evolId"
                                autoComplete="off"
                                value={ evolId || ''}
                                className={loading && "disabled placeholder bg-info" }
                                onChange={(e) => setEvolId(e.target.value)}
                                disabled
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="12">
                            <Form.Label>Cliente Id</Form.Label>
                            <SelectCustomer customer={selectValue?.customer} changeCustomer={changeCustomer} className="login-form-control"></SelectCustomer>
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

ModalCurrentMeter.propTypes = {
    showModal: PropTypes.bool,
    selectValue: PropTypes.shape({
        id: PropTypes.number,
        physicalaAddress: PropTypes.string,
        installationNumber: PropTypes.string,
        customerId: PropTypes.number,
        customer: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            rbd: PropTypes.string,
            companyReason: PropTypes.string,
            startDate: PropTypes.string
        }),
        evolId: PropTypes.string,
    }),
    closeModal: PropTypes.func.isRequired
};

export default ModalCurrentMeter;
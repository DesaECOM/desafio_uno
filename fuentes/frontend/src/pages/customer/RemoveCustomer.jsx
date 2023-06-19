import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const MySwal = withReactContent(Swal);

const RemoveCustomer = ({ customer_id, customer_name, handleDelete}) => {
    const openRetireModal = () => {
        MySwal.fire({
            icon: 'question',
            title: `Eliminando`,
            text: `Está seguro de eliminar a ${customer_name}?`,
            showCancelButton: true,
            confirmButtonText: `<i class="fas fa-sign-out-alt"></i> Continuar`,
            cancelButtonText: `<i class="icon-fa icon-fa-times-circle-o"></i> Cancelar`,
            customClass: {
                confirmButton: 'me-3',
            }
        }).then((result) => {
            if (result.value) {
                handleDelete(customer_id);
            }
        });
    };

    return (
        <Button variant="danger" onClick={openRetireModal} title={`Eliminar`}>
            <FontAwesomeIcon icon={faTrashCan} />
        </Button>
    );
};

RemoveCustomer.propTypes = {
    customer_id: PropTypes.number,
    customer_name: PropTypes.string,
    handleDelete: PropTypes.func.isRequired
};

export default RemoveCustomer;

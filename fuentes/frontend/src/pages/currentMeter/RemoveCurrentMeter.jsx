import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const MySwal = withReactContent(Swal);

const RemoveCurrentMeter = ({ currentMeter_id, currentMeter_name, handleDelete}) => {
    const openRetireModal = () => {
        MySwal.fire({
            icon: 'question',
            title: `Eliminando`,
            text: `Está seguro de eliminar al medidor con dirección a ${currentMeter_name}?`,
            showCancelButton: true,
            confirmButtonText: `<i class="fas fa-sign-out-alt"></i> Continuar`,
            cancelButtonText: `<i class="icon-fa icon-fa-times-circle-o"></i> Cancelar`,
            customClass: {
                confirmButton: 'me-3',
            }
        }).then((result) => {
            if (result.value) {
                handleDelete(currentMeter_id);
            }
        });
    };

    return (
        <Button variant="danger" onClick={openRetireModal} title={`Eliminar`}>
            <FontAwesomeIcon icon={faTrashCan} />
        </Button>
    );
};

RemoveCurrentMeter.propTypes = {
    currentMeter_id: PropTypes.number,
    currentMeter_name: PropTypes.string,
    handleDelete: PropTypes.func.isRequired
};

export default RemoveCurrentMeter;

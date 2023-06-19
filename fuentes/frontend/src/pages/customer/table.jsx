import { useEffect, useState } from 'react';
import api from  '../../assets/js/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faMagnifyingGlass, faRotate } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

import ModalCustomer from './ModalCustomer';
import RemoveCustomer from './RemoveCustomer';
import useFormatDate from '../../components/useFormatDate';


const Table = () => {
    const {formatDate} = useFormatDate();
    const [loadingList, setLoadingList]= useState(false);
    const [customers, setCustomers]= useState([]);
    const [selectCustomer, setSelectCustomer]= useState();
    const [searchValue, setSearchValue] = useState('');
    const [showModal, setShowModal] = useState(false);

    const getList = async () => {
        setLoadingList(true);

        try {
            const response = await api.get('customer');

            setCustomers(response.data);
            setLoadingList(false);
        } catch (error) {
            console.error('Error courses:', error);
            setLoadingList(false);
        }
    };

    const closeModal = (refreshTable = false) => {
      setShowModal(false);

      if (refreshTable) {
        getList();
      }
    };

    function handleEditOrCreate(value) {
      setSelectCustomer(value);
      setShowModal(true);
    }


    const handleDelete = async (customer_id) => {
      await api.delete(`customer/${customer_id}`)
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


 
      getList();
    };

    useEffect(() => {
      getList();
    }, []);

    return (
      <>
        <div className="row g-3">
          <div className="col-12">
            <div className='row'>
              <div className='col col-sm'>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Escribe un Nombre / Rut"
                    aria-describedby="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-auto col-auto'>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-primary" onClick={() => handleEditOrCreate(null)} title='Editar'>Agregar cliente</button>
                  <button type="button" className="btn btn-secondary" title={`refrescar datos`} onClick={() => getList() }>
                      <FontAwesomeIcon icon={faRotate} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {(!loadingList && customers.length == 0) && (
            <div className="col-12 col-sm-12 col-xxl-3">
              <div className="card rounded-4" aria-hidden="true">
                <div className="card-body">
                  <h5 className="card-title text-center mb-0">
                    <span className="col-6"> Sin registros.....  </span>
                  </h5>
                </div>
              </div>
            </div>
          )}
          {!loadingList && customers.length > 0 && customers.map((value, index) => (
            `${value.name} ${value.rbd}`.search(new RegExp(searchValue, 'i')) >= 0 || searchValue === '' ? (
              <div key={index} className="col-12 col-xs-6 col-sm-6 col-xxl-3">
                <div className="card border-0 rounded-4 shadow">
                  <div className="card-body p-3">
                    <div className="row g-0">
                      <div className='col'>
                        <h5><span className="badge bg-secondary" title={'Fecha de inicio de firma'}>
                          { formatDate(value.startDate, 'YYYY-MM-DD', 'DD MMMM YYYY') }
                        </span></h5>
                      </div>
                      <div className='col-auto text-end'>
                        <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                          <RemoveCustomer customer_id={value.id} customer_name={value.name} handleDelete={handleDelete}></RemoveCustomer>
                          <button type="button" className="btn btn-primary" onClick={() => handleEditOrCreate(value)} title='Editar'><FontAwesomeIcon icon={faPencil} /> </button>
                        </div>
                      </div>
                      <div className="col-12 pt-2">
                        <div className="mb-3">
                          <h6 className="mb-0 small">Nombre</h6>
                          <h5 className="mb-0 ms-3">{value.name}</h5>
                        </div>
                        <div className="mb-2">
                          <h6 className="mb-0 small">Razon Social</h6>
                          <h5 className="mb-0 ms-3">{value.companyReason}</h5>
                        </div>
                        <div className="mb-2">
                          <h6 className="mb-0 small">Rut</h6>
                          <h5 className="mb-0 ms-3">{value.rbd}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            ) : null
          ))}
          {loadingList && (
            <div className="col-12 col-sm-12 col-xxl-3">
              <div className="card" aria-hidden="true">
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                  </p>
                  <a className="btn btn-primary disabled placeholder col-6"></a>
                </div>
              </div>
            </div>
          )}
        </div>
        <ModalCustomer showModal={showModal} selectValue={selectCustomer} closeModal={closeModal} ></ModalCustomer>
        <ToastContainer />
      </>
      );
}
  
export default Table;
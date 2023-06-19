import { useEffect, useState } from 'react';
import api from  '../../assets/js/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faMagnifyingGlass, faRotate } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

import ModalCurrentMeter from './ModalCurrentMeter';
import RemoveCurrentMeter from './RemoveCurrentMeter';


const Table = () => {
    const [loadingList, setLoadingList]= useState(false);
    const [currentMeters, setCurrentMeters]= useState([]);
    const [selectCurrentMeter, setSelectCurrentMeter]= useState();
    const [searchValue, setSearchValue] = useState('');
    const [showModal, setShowModal] = useState(false);

    const getList = async () => {
        setLoadingList(true);

        try {
            const response = await api.get('current-meter');

            setCurrentMeters(response.data);
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
      setSelectCurrentMeter(value);
      setShowModal(true);
    }

    const handleDelete = async (currentMeter_id) => {
      await api.delete(`current-meter/${currentMeter_id}`)
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


 
      getList();
    };

    useEffect(() => {
      getList();
      /* ejecuta la funcion GetList cuando la plataforma esta cargando o inicia */
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
                  <button type="button" className="btn btn-primary" onClick={() => handleEditOrCreate(null)} title='Editar'><FontAwesomeIcon icon={faPlus} /> Agregar medidor</button>
                  <button type="button" className="btn btn-secondary" title={`refrescar datos`} onClick={() => getList() }>
                      <FontAwesomeIcon icon={faRotate} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {(!loadingList && currentMeters.length == 0) && (
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
          {!loadingList && currentMeters.length > 0 && currentMeters.map((value, index) => (
            `${value.name} ${value.rbd}`.search(new RegExp(searchValue, 'i')) >= 0 || searchValue === '' ? (
              <div key={index} className="col-12 col-xs-6 col-sm-6 col-xxl-3">
                <div className="card border-0 rounded-4 shadow">
                    <div className="card-body p-3">
                        <div className="row g-0">
                            <div className='col'>
                              <h5>
                                <span className="badge bg-secondary" title={'Cliente'}>
                                  { value.customer.name }, { value.customer.rbd }
                                </span>
                              </h5>
                            </div>
                            <div className='col-auto text-end'>
                                <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                    <RemoveCurrentMeter currentMeter_id={value.id} currentMeter_name={value.physicalaAddress} handleDelete={handleDelete}></RemoveCurrentMeter>
                                    <button type="button" className="btn btn-primary" onClick={() => handleEditOrCreate(value)} title='Editar'><FontAwesomeIcon icon={faPencil} /> </button>
                                </div>
                            </div>
                            <div className="col-12 pt-2">
                                <div className="mb-3">
                                  <h6 className="mb-0 small">Dirección física</h6>
                                  <h5 className="mb-0 ms-3">{value.physicalaAddress}</h5>
                                </div>
                                <div className="mb-2">
                                  <h6 className="mb-0 small">Numero de instalación</h6>
                                  <h5 className="mb-0 ms-3">{value.installationNumber}</h5>
                                </div>
                                <div className="mb-2">
                                  <h6 className="mb-0 small">Evol id</h6>
                                  <h5 className="mb-0 ms-3">{value.evolId}</h5>
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
        <ModalCurrentMeter showModal={showModal} selectValue={selectCurrentMeter} closeModal={closeModal} ></ModalCurrentMeter>
        <ToastContainer />
      </>
      );
}
  
export default Table;
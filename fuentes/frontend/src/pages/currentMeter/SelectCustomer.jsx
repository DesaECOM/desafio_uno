import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import api from '../../assets/js/api';
import PropTypes from 'prop-types';

const SelectCustomer = ({customer, changeCustomer}) => {
    const [selectedValue, setSelectedValue] = useState(customer);

    const handleChange = value => {
        changeCustomer(value);
        setSelectedValue(value);
    };

    const getDatosRbdName = async (inputValue) => {
        try {
            const response = await api.get("customer", {
                params: {
                    search: inputValue
                }
            });

            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const loadOptions = async (inputValue, callback) => {
        if (inputValue.length > 0) {
            try {
                const value = await getDatosRbdName(inputValue);
                callback(value);
            } catch (error) {
                console.error(error);
                callback([]);
            }
        } else {
            callback([]);
        }
    };
    
    return (
        <>
            <AsyncSelect
                value={selectedValue}
                getOptionLabel={e =>  e.name}
                getOptionValue={e => e.id}
                loadOptions={loadOptions}
                onChange={handleChange}
                defaultOptions 
                className='login-form-control-select'
                placeholder={ "Ingresa tu colegio" }
                noOptionsMessage={() => "No se encuentran registro" }
                loadingMessage={() => "Cargando datos de búsqueda" }
            />
        </>
    );
}

SelectCustomer.propTypes = {
    customer: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        rbd: PropTypes.string,
        companyReason: PropTypes.string,
        startDate: PropTypes.string,
    }),
    changeCustomer: PropTypes.func.isRequired
};

export default SelectCustomer;
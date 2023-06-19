import { useCallback } from 'react';
import moment from 'moment';
import 'moment/locale/es';

const useFormatDate = () => {
    moment.locale('es');

    const formatDate = useCallback((date, format_origin = 'YYYY-MM-DD HH:mm:ss', format = 'HH:mm:ss DD-MM-YYYY') => {
        return moment(date, format_origin).format(format);
    }, []);

    const getCurrentDate = (format = 'YYYY-MM-DD') => {
        return moment().format(format);
    };

    const getCurrentDateYear = (format = 'YYYY-MM-DD') => {
        return moment().startOf('year').format(format);
    };

    return { formatDate, getCurrentDate, getCurrentDateYear};
};

export default useFormatDate;

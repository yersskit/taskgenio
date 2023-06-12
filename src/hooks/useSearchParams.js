import { useLocation } from 'react-router-dom';

const useSearchParams = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const getParam = (param) => searchParams.get(param);

    return { getParam };
};

export default useSearchParams;

// hooks/useAuthRedirect.js
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';

const useAuthRedirect = (redirectPath = '/login') => {
    const [isLoader, setIsLoader] = useState(true)
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token && router.pathname !== redirectPath) {
            router.push(redirectPath);
        }else{
            setIsLoader(false)
        }
    }, [router, redirectPath]);

    return {isLoader,setIsLoader}
};

export default useAuthRedirect;

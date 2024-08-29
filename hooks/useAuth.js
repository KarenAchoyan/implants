import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuth = (redirectTo = '/login') => {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push(redirectTo);
        }
    }, [router, redirectTo]);
};

export default useAuth;
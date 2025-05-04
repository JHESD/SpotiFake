import { useEffect } from 'react';
import HeaderAdmin from './HeaderAdmin';

function LayoutAdmin({ children }) {
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
        link.rel = 'stylesheet';
        link.id = 'bootstrap-admin';
        document.head.appendChild(link);
    
        return () => {
            document.getElementById('bootstrap-admin')?.remove();
        };
        }, []);

    return (
        <div>
        <HeaderAdmin />
        <main className="container mt-4">{children}</main>
        </div>
    );
}

export default LayoutAdmin;

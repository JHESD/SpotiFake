import { Link } from 'react-router-dom';

function HeaderAdmin() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link to="" className="navbar-brand fw-bold">
            SpotiFake Admin
        </Link>
        <div className="collapse navbar-collapse ms-4">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link to="/admin" className="nav-link">Géneros</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/artistas" className="nav-link">Artistas</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/albums" className="nav-link">Álbumes</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/canciones" className="nav-link">Canciones</Link>
            </li>
            </ul>
        </div>
        </nav>
    );
}

export default HeaderAdmin;

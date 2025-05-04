import { Link } from 'react-router-dom';
import '../../App.css'
const Header = () => {
    return (
        <header className="bg-purple-700 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">SpotiFake</h1>
        <nav>
            <Link to="/" className="hover:underline text-lg">Home</Link>
        </nav>
        </header>
    );
};

export default Header;
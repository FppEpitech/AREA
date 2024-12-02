
import logo from '../../assets/logo58.png'

export default function Navbar() {
    return (
        <div>
            <img src={logo} alt="Plumpy logo"></img>
            <button type="button">Explore</button>
            <button type="button">My Plums</button>
            <button type="button">Create</button>
            <button type="button">User</button>
        </div>
    );
}

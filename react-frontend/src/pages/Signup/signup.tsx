import { useState } from "react";
import { AuthSignUp } from '../../services/auth/auth'
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const sendSignUp = async(e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        await AuthSignUp({email, password}, navigate, setError);
    };

    return (
        <div>
            <form>
                <h1>Plumpy</h1>
                <h2>Create your account</h2>
                <input
                    type="email"
                    placeholder="Email adress"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required>
                </input>
                <input
                    type="password"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required>
                </input>
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required>
                </input>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button
                    type="submit"
                    onSubmit={sendSignUp}>
                    Sign up
                </button>
                <p>Already have an account ?<a href="/login">Login</a></p>
            </form>
            <p>or continue with</p>
            <button>Google</button>
            <button>Github</button>
        </div>
    );
}

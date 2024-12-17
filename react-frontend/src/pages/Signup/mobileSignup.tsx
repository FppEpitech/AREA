
import logo from '../../assets/plumpy_logo.png'

type MobileSignupProps = {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    confirmPassword: string;
    setConfirmPassword: (confirmPassword: string) => void;
    error: string;
    sendSignUp: (e: React.FormEvent) => void;
  };

export const MobileSignup = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, error, sendSignUp } : MobileSignupProps) => (
    <div className="min-h-screen bg-gradient-to-br from-customLightBlue to-customGreen flex flex-col items-center justify-center p-6 text-white">
        {/* Header */}
        <img
            src={logo}
            alt="Plumpy Logo"
            className="w-38 h-32 mr-3 pl-4"
        />
        <h1 className="text-4xl font-bold mb-4">Welcome to Plumpy</h1>
        <p className="text-sm mb-8">Create your account</p>

        {/* Login Form */}
        <form className="w-full max-w-sm space-y-4" onSubmit={sendSignUp}>
            <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white text-black h-12 px-4 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Create Password"
                className="w-full bg-white text-black h-12 px-4 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-white text-black h-12 px-4 rounded-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button
            type="submit"
            className="w-full bg-customGreen h-12 rounded-lg hover:bg-customDarkGreen transition"
            >
            Sign Up
            </button>
        </form>

        {/* Other Links */}
        <div className="mt-6 text-center">
            <p className="mt-2 text-sm text-customLightBlue">
            Already have an account?{" "}
            <a href="/login" className="underline text-customYellow">Login</a>
            </p>
        </div>

        {/* Separator */}
        <hr className="border-t-2 border-customDarkGreen w-52 my-4" />

        <p className="text-sl mb-4 text-customYellow text-shadow-custom font-instrumentSans text-center">
            or continue with
        </p>
        <div className="flex flex-row space-x-4">
            <button
                className="flex items-center font-instrumentSans bg-customGreen py-2 px-4 rounded-xl hover:bg-customDarkGreen transition">
                <i className="fab fa-github"></i> Github
            </button>
            <button
                className="flex items-center font-instrumentSans bg-customGreen py-2 px-4 rounded-xl hover:bg-customDarkGreen transition">
                <i className="fab fa-google"></i> Google
            </button>
        </div>
    </div>
);

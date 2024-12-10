
import logo from '../../assets/plumpy_logo.png'

type MobileLoginProps = {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    error: string;
    sendLogin: (e: React.FormEvent) => void;
  };

export const MobileLogin = ({ email, setEmail, password, setPassword, error, sendLogin } : MobileLoginProps) => (
    <div className="min-h-screen bg-gradient-to-br from-customLightBlue to-customGreen flex flex-col items-center justify-center p-6 text-white">
        {/* Header */}

        <img
            src={logo}
            alt="Plumpy Logo"
            className="w-38 h-32 mr-3 pl-4"
        />
        <h1 className="text-4xl font-bold mb-4">Welcome to Plumpy</h1>
        <p className="text-sm mb-8">Sign in to access your account</p>

        {/* Login Form */}
        <form className="w-full max-w-sm space-y-4" onSubmit={sendLogin}>
            <input
                type="email"
                placeholder="Email"
                className="w-full bg-white text-black h-12 px-4 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full bg-white text-black h-12 px-4 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-300">{error}</p>}
            <button
            type="submit"
            className="w-full bg-customGreen h-12 rounded-lg hover:bg-customDarkGreen transition"
            >
            Login
            </button>
        </form>

        {/* Other Links */}
        <div className="mt-6 text-center">
            <a href="/" className="text-sm underline text-customYellow">Forgot password?</a>
            <p className="mt-2 text-sm text-customLightBlue">
            Don't have an account?{" "}
            <a href="/signup" className="underline text-customYellow">Register here</a>
            </p>
        </div>
    </div>
  );

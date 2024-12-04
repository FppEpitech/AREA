
export default function Login() {
    return (
        <div>
            <form>
                <h1>Plumpy</h1>
                <h2>Sign in to your account</h2>
                <input type="email" placeholder="Email adress" required></input>
                <input type="password" placeholder="Password" required></input>
                <button type="submit">Login</button>
                <a href="/">Forgot password ?</a>
                <p>Don't have an account ?<a href="/signup">Register here</a></p>
            </form>
            <p>or continue with</p>
            <button>Google</button>
            <button>Github</button>
        </div>
    );
}

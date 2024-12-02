
export default function Signup() {
    return (
        <div>
            <form>
                <h1>Plumpy</h1>
                <h2>Create your account</h2>
                <input type="email" placeholder="Email adress" required></input>
                <input type="password" placeholder="Create password" required></input>
                <input type="password" placeholder="Confirm password" required></input>
                <button type="submit">Sign up</button>
                <p>Already have an account ?<a href="/login">Login</a></p>
            </form>
            <p>or continue with</p>
            <button>Google</button>
            <button>Github</button>
        </div>
    );
}

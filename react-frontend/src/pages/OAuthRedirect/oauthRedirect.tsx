
export function OAuthRedirectSuccess() {

    return (
        <div>
            <h1>Authentification successful</h1>
            <p>You can close this window</p>
        </div>
    );
}

export function OAuthRedirectFailed() {

    return (
        <div>
            <h1>Authentification failed</h1>
            <p>You can close this window</p>
        </div>
    );
}

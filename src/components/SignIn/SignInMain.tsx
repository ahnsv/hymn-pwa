import React from 'react'
import { auth } from '../../firebase'

interface SignInMainProps {
    username?: string
    error?: any
    history?: any
    password?: string
}
interface SignInMainState {
    username: string
    error: any
    password: string
}
export default class SignInMain extends React.Component<SignInMainProps, SignInMainState> {
    constructor(props: SignInMainProps) {
        super(props)
        this.state = {
            username: '',
            error: null,
            password: ''
        }
    }
    private static propKey(propertyName: string, value: any): object {
        return { [propertyName]: value };
    }
    onSubmit(e: any) {
        const { username, password } = this.state;

        const {history} = this.props
        auth
            .doSignInWithEmailAndPassword(username, password)
            .then(() => {
                history.push("/");
            })
            .catch(error => {
                this.setState(SignInMain.propKey("error", error));
            });

        e.preventDefault();
    }
    render() {
        const { username, password, error } = this.state;

        const isInvalid = password === "" || username === "";
        return (
            <form onSubmit={event => this.onSubmit(event)}>
                <input
                    value={username}
                    onChange={event => this.setStateWithEvent(event, "username")}
                    type="text"
                    placeholder="ID"
                />
                <input
                    value={password}
                    onChange={event => this.setStateWithEvent(event, "password")}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>
                {error && <p>{error.message}</p>}
            </form>
        )
    }
    private setStateWithEvent(event: any, columnType: string): void {
        this.setState(SignInMain.propKey(columnType, (event.target as any).value));
    }
}
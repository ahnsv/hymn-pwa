import React, { Component } from "react";
import "./App.css";
import Scheduler from "./components/Main/index";
import { Route, Switch } from "react-router-dom";
import { SignIn } from "./components/SignIn/index";
import { BasicInfoSetup as ProfileAnonymous, BasicForm } from "./components/Profile/ProfileAnonymous";
import { VacationScheduler } from './components/Scheduler/VacationScheduler'
import { firebase, withAuthentication } from "./firebase";
import HymnCarpet from "./components/UI/Carpet/HymnCarpet";

class AppComponent extends Component {
	constructor(props: any) {
		super(props);
		this.state = {
			authUser: null
		};
	}
	public componentDidMount() {
		firebase.auth.onAuthStateChanged(authUser => {
			authUser
				? this.setState(() => ({ authUser }))
				: this.setState(() => ({ authUser: null }));
		});
	}
	render() {
		const off_duty = { name: "", range: [""] };
		return (
			<div className="App">
				<Switch>
					<Route exact={true} path="/" component={Scheduler} />
					<Route path="/signin" component={SignIn} />
					<Route path="/setup" component={ProfileAnonymous} />
					<Route path="/form" component={BasicForm} />
					<Route path="/calendar" component={VacationScheduler} />
					<Route path="/carpet" component={HymnCarpet} />
				</Switch>
			</div>
		);
	}
}

export const App = withAuthentication(AppComponent);

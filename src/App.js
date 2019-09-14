import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'

import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import withSession from "./components/withSession";


const client = new ApolloClient({
	uri: 'http://localhost:9000/graphql',
	fetchOptions: {
		credentials: "include"
	},
	request: operation => {
		const token = localStorage.getItem("token")
		operation.setContext({
			headers: {
				authorization: token
			}
		})
	},
	onError: ({networkError}) => {
		if (networkError) {
			console.log("Network Error", networkError)
			if (networkError.statusCode === 400) {
				localStorage.removeItem("token")
			}
		}
	}
});

const App = () => (
	<ApolloProvider client={client}>
		<Router>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/login" component={Login}/>
				<Route path="/register" component={Register}/>
				<Redirect to="/"/>
			</Switch>
		</Router>
	</ApolloProvider>
);

const AppWithSession = withSession(App);

export default AppWithSession

import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Login from './pages/Login'


const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
});
const App = () => (
  <ApolloProvider client={client}>
    <Login />
  </ApolloProvider>
);

export default App
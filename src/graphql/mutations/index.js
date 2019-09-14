import {gql} from 'apollo-boost';

export const SIGNUP_MUTATION = gql`
	mutation signup(
    $email: String!
    $password: String!
    $firstname: String!
    $lastname: String!
	) {
	  signupTrainee(
	    email: $email
	    password: $password
	    firstname: $firstname
	    lastname: $lastname
    ) {
	    token
	  }
	}
`;

export const SIGNIN_MUTATION = gql`
	mutation signin($email: String!, $password: String!) {
	  signinTrainee(email: $email, password: $password) {
	    token
	  }
	}
`;


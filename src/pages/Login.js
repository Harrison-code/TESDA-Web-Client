import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

import {Link, withRouter} from 'react-router-dom'
import {useMutation} from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import {SIGNIN_MUTATION} from "../graphql/mutations";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				RTC TESDA
			</Link>{' '}
			{new Date().getFullYear()}
			{'. Built with '}
			<Link color="inherit" href="https://material-ui.com/">
				CMD.
			</Link>
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	error: {
		color: "red"
	}
}));

const Login = () => {
	const classes = useStyles();
	const [inputs, setInputs] = useState({});
	const handleInputChange = (event) => {
		event.persist();
		setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
	}

	const [signin, {loading, error, client}] = useMutation(SIGNIN_MUTATION);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		signin({
			variables: {...inputs},
			onCompleted: (data) => {
				const token = data && data.signinTrainee.token
				if (token) {
					client.writeData({data: {token}})
					localStorage.setItem("token", token)
					this.props.history.push('/')
				}
			}
		});
	}

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline/>
			<Grid item xs={false} sm={4} md={7} className={classes.image}/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} noValidate onSubmit={handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							value={inputs.email}
							autoFocus
							onChange={handleInputChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							value={inputs.password}
							autoComplete="current-password"
							onChange={handleInputChange}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary"/>}
							label="Remember me"
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							to="/"
						>
							<Link to="/">
								{"Sign in"}
							</Link>
						</Button>
						{error && (<span className={classes.error}>{error.message}</span>)}
						{loading && <LinearProgress/>}
						<Grid container>
							<Grid item>
								<Link to="/register" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<Copyright/>
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}

export default withRouter(Login)
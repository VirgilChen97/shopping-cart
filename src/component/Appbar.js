import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles, Avatar } from '@material-ui/core';
import ShoppingCart from './Cart'
import SignIn from './login';
import SimplePopover from './logout'
import firebase from 'firebase/app'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

function ElevationScroll(props) {
	const { children, window } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

ElevationScroll.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};

const ElevateAppBar = ({cart, setCart}) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<ElevationScroll>
				<AppBar>
					<Toolbar>
						<ShoppingCart cart={cart} setCart={setCart}/>
						<Typography variant="h6" className={classes.title}>
							Shopping
    					</Typography>
						{firebase.auth().currentUser ? <SimplePopover><Avatar src={firebase.auth().currentUser.photoURL} /></SimplePopover>: <SignIn />}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<Toolbar />
		</React.Fragment>
	);
}

export default ElevateAppBar

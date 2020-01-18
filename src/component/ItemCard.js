import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, CardActions, CardMedia, Button, ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	media: {
		height: 140,
	},
	chip: {
		margin: theme.spacing(0.5),
	},
	section1: {
		margin: theme.spacing(0),
	},
	section2: {
		margin: theme.spacing(0),
		float: "right"
	},
	section3: {
		margin: theme.spacing(3, 1, 1),
	},
}));

const isActivate = (size, nowSize) => {
	if (nowSize === size) return 'primary'
	else return 'default'
}

const changeSize = (setSize, nowSize) => {
	setSize(nowSize);
}

const ItemCard = (props) => {
	const [size, setSize] = useState('s');
	const classes = useStyles();

	return (
		<Card>
			<CardMedia
				className={classes.media}
				image="https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"
				title="Contemplative Reptile"
			/>
			<CardContent>
				<div className={classes.section1}>
					<Grid container alignItems="center">
						<Grid item xs>
							<Typography gutterBottom variant="h5">
								{props.itemName}
							</Typography>
						</Grid>
						<Grid item>
							<Typography gutterBottom variant="h6">
								{props.itemPrice}
							</Typography>
						</Grid>
					</Grid>
					<Typography color="textSecondary" variant="body2">
						{props.itemDescription}
					</Typography>
				</div>
			</CardContent>
			<Divider variant="middle" />
			<CardActions>
				<div className={classes.section2}>
					<div>
						<Chip onClick={() => { setSize('s') }} className={classes.chip} color={isActivate(size, 's')} label="S" />
						<Chip onClick={() => { setSize('m') }} className={classes.chip} color={isActivate(size, 'm')} label="M" />
						<Chip onClick={() => { setSize('l') }} className={classes.chip} color={isActivate(size, 'l')} label="L" />
						<Chip onClick={() => { setSize('xl') }} className={classes.chip} color={isActivate(size, 'xl')} label="XL" />
					</div>
				</div>
				<Button color="primary">Add to cart</Button>
			</CardActions>
		</Card>
	);
}

export default ItemCard

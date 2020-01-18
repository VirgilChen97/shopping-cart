import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, CardActions, CardMedia, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	media: {
		height: 240,
	},
	chip: {
		margin: theme.spacing(0.1),
	}
}));

const isActivate = (size, nowSize) => {
	if (nowSize === size) return 'primary'
	else return 'default'
}

const ItemCard = ({ cart, setCart, product }) => {
	const [size, setSize] = useState('s');
	const classes = useStyles();
	const imgurl="/products/" + product.sku +"_1.jpg"

	const addItems = () => {
		let prevCart = {...cart}
		if(!prevCart[product.sku+size]){
			prevCart[product.sku+size] = {
				key: product.sku+size,
				title:product.title,
				price:product.price,
				currencyFormat:product.currencyFormat,
				size:size,
				amount:0
			}
		}
		prevCart[product.sku+size]['amount']++
		setCart(prevCart)
	}

	return (
		<Card>
			<CardMedia
				className={classes.media}
				image={imgurl}
				title="Contemplative Reptile"
			/>
			<CardContent>
				<Grid container alignItems="center">
					<Grid item xs={8}>
						<Typography gutterBottom variant="h6">
							{product.title}
						</Typography>
					</Grid>
					<Grid item xs={4}>
							<Typography align='right' gutterBottom variant="h6">
								{product.price} {product.currencyFormat}
							</Typography>
					</Grid>
				</Grid>
				<Typography color="textSecondary" variant="body2">
					{product.style}
				</Typography>
			</CardContent>
			<Divider variant="middle" />
			<CardActions>
				<Chip onClick={() => { setSize('s') }} className={classes.chip} color={isActivate(size, 's')} label="S" />
				<Chip onClick={() => { setSize('m') }} className={classes.chip} color={isActivate(size, 'm')} label="M" />
				<Chip onClick={() => { setSize('l') }} className={classes.chip} color={isActivate(size, 'l')} label="L" />
				<Chip onClick={() => { setSize('xl') }} className={classes.chip} color={isActivate(size, 'xl')} label="XL" />
				<Button color="primary" onClick={()=>{addItems()}}>Add to cart</Button>
			</CardActions>
		</Card>
	);
}

export default ItemCard

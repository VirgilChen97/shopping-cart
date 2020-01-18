import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ItemCard from './ItemCard';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
}));

const ItemList = ({items}) => {
	items = Object.values(items);
	const classes = useStyles();
	if (items.length > 0) {
		return (
			<div className={classes.root}>
				<Grid container spacing={3}>
					{items.map(product => <Grid key={product.sku} item xs={12}><ItemCard product={product} /></Grid>)}
				</Grid>
			</div >
		);
	}else{
		return <p>Failed to obtain List</p>
	}
}

export default ItemList
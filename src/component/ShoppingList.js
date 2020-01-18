import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ButtonBase from '@material-ui/core/ButtonBase'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(2)
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1
  },
  grid:{
    width: 350
  },
  image: {
    width: 80,
    height: 120,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  }
}));

const ShoppingList = ({ cart, setCart }) => {
  const classes = useStyles();

  const ShoppingListItem = (product) => {
    return (
      <div>
        <Grid className={classes.grid} container spacing={2}>
          <Grid item xs={4}>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={'/products/' + product.key.replace(/[^0-9]/ig, "") + '_1.jpg'} />
            </ButtonBase>
          </Grid>
          <Grid item xs={8} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {product.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Size: {product.size} x {product.amount}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body2">
                  <Button>Remove</Button>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{product.price} {product.currencyFormat}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  console.log(cart)
  if (Object.keys(cart) === 0) {
    return <p>You have no items</p>
  } else {
    return (
      <div>
        <Typography className={classes.title} variant='h5'>Shopping Cart</Typography>
        <Divider />
        <List component="nav" className={classes.root} aria-label="mailbox folders">
          {Object.values(cart).map(product => <div key={product.key}><ListItem>{ShoppingListItem(product)}</ListItem><Divider /></div>)}
        </List>
      </div>
    );
  }
}

export default ShoppingList
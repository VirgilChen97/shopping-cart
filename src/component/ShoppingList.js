import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import firebase from 'firebase/app'

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(2)
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1
  },
  grid: {
    minWidth: 350
  },
  img: {
    margin: '10px',
    width: 60,
    height: 90
  }
}));

const totalAmount = cart => {
  let total = 0
  Object.values(cart).map(product => { total += product.price * product.amount })
  return total
}

const checkOut = (cart, setCart) => {
  let total = totalAmount(cart)
  Object.values(cart).map(product => {
    firebase
      .database()
      .ref("products/" + product.key.replace(/[^0-9]/ig, "") + "/" + product.size)
      .once('value', snapshot => {
        let inventory = snapshot.val()
        if (product.amount > inventory) {
          alert('There are only' + inventory + ' ' + product.title)
        }
        firebase
          .database()
          .ref("products/" + product.key.replace(/[^0-9]/ig, ""))
          .update({ [product.size]: Math.max(inventory - product.amount, 0) })
      })
  })
  firebase
    .database()
    .ref("users/"+firebase.auth().currentUser.uid)
    .remove()
  setCart({})
  alert("You have successfully checked out, you paid "+total+" $")
}

const ShoppingList = ({ cart, setCart }) => {
  const [state, setState] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const fetchCart = async () => {
      if (firebase.auth().currentUser) {
        const userCartDb = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
        userCartDb.once('value').then(snapshot => {
          if (snapshot.val()) {
            setCart(snapshot.val())
          }
        })
      }
    };
    fetchCart();
  }, []);

  const removeItem = (key) => {
    delete cart[key]
    if (firebase.auth().currentUser) {
      firebase
        .database()
        .ref("users")
        .update({
          [firebase.auth().currentUser.uid]: cart
        });
    }
    setCart(cart)
    if (state) {
      setState(false)
    } else {
      setState(true)
    }
  }

  const ShoppingListItem = (product) => {
    return (
      <div>
        <Grid className={classes.grid} container spacing={1}>
          <Grid item xs={3}>
            <img className={classes.img} src={'/products/' + product.key.replace(/[^0-9]/ig, "") + '_1.jpg'} />
          </Grid>
          <Grid item xs={9} sm container>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {product.title}
                </Typography>
              </Grid>
              <Grid item xs container>
                <Grid item xs={4}><Typography gutterBottom> Size: {product.size} x {product.amount} </Typography></Grid>
                <Grid item xs={8}><Typography align='right' variant="subtitle1">{product.price} {product.currencyFormat}</Typography></Grid>
              </Grid>
              <Grid item xs>
                <Button size="small" variant="outlined" color="secondary" onClick={() => { removeItem(product.key) }}>Remove</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  if (Object.keys(cart) == 0) {
    return (
      <div>
        <Typography className={classes.title} variant='h5'>Shopping Cart</Typography>
        <Divider />
        <Typography className={classes.title}>You have no items in your shopping cart</Typography>
      </div>
    )
  } else {
    return (
      <div>
        <Typography className={classes.title} variant='h5'>Shopping Cart</Typography>
        <Divider />
        <List component="nav" className={classes.root} aria-label="mailbox folders">
          {Object.values(cart).map(product => <div key={product.key}><ListItem>{ShoppingListItem(product)}</ListItem><Divider /></div>)}
        </List>
        <Typography className={classes.title} >Total: {totalAmount(cart).toFixed(2)} $</Typography>
        <Button onClick={() => { checkOut(cart, setCart) }}>Check Out</Button>
      </div>
    );
  }
}

export default ShoppingList
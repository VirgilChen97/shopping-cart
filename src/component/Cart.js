import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingList from './ShoppingList'

const ShoppingCart = ({cart, setCart}) => {
  const [state, setState] = React.useState({
    left: false
	});

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
	};

  return (
    <div>
			<IconButton edge="start" onClick={toggleDrawer('left', true)} color="inherit" aria-label="menu">
				<ShoppingCartIcon />
			</IconButton>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        <ShoppingList cart={cart} setCart={setCart}/>
      </Drawer>
    </div>
  );
}
export default ShoppingCart;

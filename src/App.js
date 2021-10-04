import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';

import { uiActions } from './components/store/ui-slice';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial = true;


function App() {
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();

  const isCartVisible = useSelector(state => state.ui.cartIsVisible)

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending Cart Data!'
        })
      );
      const response = await fetch('https://react-http-eaa31-default-rtdb.asia-southeast1.firebasedatabase.app//cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
      });
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent Cart Data Successfully!'
        })
      );
      // const responseData = await response.json();
    }

    if (isInitial) {
      isInitial = false;
      return;
    }


    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Sending Cart Data Failed!'
        })
      );
    })
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification
      status={notification.status}
        title={notification.title}
        message={notification.message}
    />}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';

function App() {
  const cart = useSelector(state => state.cart)

  const isCartVisible = useSelector(state => state.ui.cartIsVisible)

  useEffect(() => {
    fetch('https://react-http-eaa31-default-rtdb.asia-southeast1.firebasedatabase.app//cart.json', {
      method: 'PUT',
      body: JSON.stringify(cart),
    });
  }, [cart]);

  return (
    <Layout>
      {isCartVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

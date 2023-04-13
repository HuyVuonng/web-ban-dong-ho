import config from '~/config';

import Cart from '~/Pages/Cart';
import Home from '~/Pages/Home';
import ProductDetail from '~/Pages/ProductDetail';
import ProductCreate from '~/Pages/ProductCreate';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.productCreate, component: ProductCreate },
    { path: config.routes.productDetails, component: ProductDetail },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

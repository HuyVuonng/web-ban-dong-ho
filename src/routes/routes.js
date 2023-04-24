import config from '~/config';

import Cart from '~/Pages/Cart';
import Home from '~/Pages/Home';
import ProductDetail from '~/Pages/ProductDetail';
import QuanLy from '~/Pages/QuanLy';
import ProductCreateUpdate from '~/Pages/ProductCreateUpdate';
import PhanLoai from '~/Pages/PhanLoai';
import ThungRac from '~/Pages/QuanLy/ThungRac';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.phanloai, component: PhanLoai },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.quanLy, component: QuanLy },
    { path: config.routes.productDetails, component: ProductDetail },
    { path: config.routes.productEdit, component: ProductCreateUpdate },
    { path: config.routes.thungrac, component: ThungRac },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

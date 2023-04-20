import classNames from 'classnames/bind';
import styles from './PhanLoai.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import httpRequest from '~/utils/httprequest';
import ProductItem from '~/Components/ProductItem/ProductItem';

const cx = classNames.bind(styles);

function PhanLoai() {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const gt = params.gt === 'donghonam' ? 'nam' : 'nu';
    const getProducts = async () => {
        await httpRequest.get(`/products/gioitinh/${gt}`).then((response) => setProducts(response.data));
    };
    useEffect(() => {
        params.gt === 'donghonam' ? (document.title = 'Đồng hồ nam') : (document.title = 'Đồng hồ nữ');
        getProducts();
    }, [params]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {products.map((product) => (
                    <ProductItem key={product._id} data={product} />
                ))}
            </div>
        </div>
    );
}

export default PhanLoai;

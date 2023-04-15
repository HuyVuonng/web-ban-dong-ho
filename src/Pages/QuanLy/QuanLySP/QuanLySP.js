import classNames from 'classnames/bind';
import styles from './QuanLySP.module.scss';
import { useEffect, useState } from 'react';
import httpRequest from '~/utils/httprequest';
import ProductItemQL from './ProductItemQL/ProductItemQL';

const cx = classNames.bind(styles);

function QuanLySP() {
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const getALLProducts = async () => {
        await httpRequest.get('/products').then((res) => setProductsList(res.data));
        setLoading(false);
    };

    useEffect(() => {
        getALLProducts();
    }, []);

    if (loading) {
        return <div>Loadding...</div>;
    } else {
        return (
            <div className={cx('list-products')}>
                {productsList.map((result, index) => (
                    <ProductItemQL key={index} data={result} />
                ))}
            </div>
        );
    }
}

export default QuanLySP;

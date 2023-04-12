import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductItem({ data }) {
    let price = Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(data.price);
    const Oldprice = () => {
        let oldprice = +data.price + (data.price * 30) / 100;
        return Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(oldprice);
    };
    return (
        <div className={cx('ProductItem-wrapper')}>
            <Link className={cx('product-link')} to={`/productDetails/${data._id}`}>
                <div className={cx('body')}>
                    <img className={cx('body-img')} src={data.img} alt="" />
                    <div className={cx('nd')}>
                        <span className={cx('sp-name')}>{data.name}</span>
                        <div className={cx('price')}>
                            <span className={cx('price-old')}>{Oldprice()}</span>
                            <span className={cx('price-new')}>{price}</span>
                        </div>
                    </div>
                    <button className={cx('body-btn')}>
                        <span className={cx('btn-name')}>Thêm vào giỏ hàng</span>
                    </button>
                </div>
            </Link>
        </div>
    );
}

export default ProductItem;

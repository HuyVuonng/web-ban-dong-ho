import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductItem() {
    return (
        <div className={cx('ProductItem-wrapper')}>
            <Link className={cx('product-link')} to={`/productDetails`}>
                <div className={cx('body')}>
                    <img
                        className={cx('body-img')}
                        src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-05.png"
                        alt=""
                    />
                    <div className={cx('nd')}>
                        <span className={cx('sp-name')}>Classio 4</span>
                        <div className={cx('price')}>
                            <span className={cx('price-old')}>700.000đ</span>
                            <span className={cx('price-new')}>500.000đ</span>
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

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import ProductItem from '~/Components/ProductItem/ProductItem';
import NewItem from '~/Components/NewItem/NewItem';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper-homepage')}>
            <div className={cx('content')}>
                <div className={cx('best-seller')}>
                    <h2 className={cx('lable')}>Sản phẩm bán chạy</h2>
                    <div className={cx('best-seller-product')}>
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                    </div>
                </div>

                <div className={cx('product2')}>
                    <div className={cx('lable-products')}>
                        <h2 className={cx('lable', 'active')}>Sản phẩm khuyến mại</h2>
                        <h2 className={cx('lable')}>Sản phẩm mới</h2>
                    </div>
                    <div className={cx('products')}>
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                    </div>
                </div>

                <div className={cx('news')}>
                    <NewItem />
                    <NewItem />
                    <NewItem />
                </div>

                <div className={cx('dk')}>
                    <div className={cx('dk-info')}>
                        <div className={cx('dk-name')}>
                            <h2 className={cx('dk-title')}>ĐĂNG KÝ NHẬN THÔNG TIN</h2>
                        </div>
                        <div className={cx('dk-input')}>
                            <input type="text" className={cx('dk-input1')} placeholder="Tìm kiếm..." />
                            <button className={cx('dk-btn')}>
                                <span>Đăng ký</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

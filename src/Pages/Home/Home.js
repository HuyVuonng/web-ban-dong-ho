import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import ProductItem from '~/Components/ProductItem/ProductItem';
import NewItem from '~/Components/NewItem/NewItem';
import httpRequest from '~/utils/httprequest';
import { useEffect, useState, useRef } from 'react';

const cx = classNames.bind(styles);
function Home() {
    let load = useRef(true);
    const [loadding, setloading] = useState(true);
    const [bestseller, setBestseller] = useState({});
    const [newProduct, setNewProduct] = useState({});

    const fetchdata = async () => {
        const res = await httpRequest.get('products/bestseller');
        const newproducts = await httpRequest.get('products/newproducts');
        setNewProduct(newproducts.data);
        setBestseller(res.data);
        setloading(false);
    };
    useEffect(() => {
        if (load.current) {
            fetchdata();
            load.current = false;
            document.title = 'Trang chủ';
        }
    }, []);

    const changeLableproc = (e) => {
        const lable = document.querySelectorAll(`.${cx('lable')}`);
        for (let i = 0; i < lable.length; i++) {
            lable[i].classList.remove(`${cx('active')}`);
        }
        e.target.classList.add(`${cx('active')}`);
    };

    if (loadding) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={cx('wrapper-homepage')}>
                <div className={cx('content')}>
                    <div className={cx('best-seller')}>
                        <h2 className={cx('lable')}>Sản phẩm bán chạy</h2>
                        <div className={cx('best-seller-product')}>
                            {bestseller.map((result, index) => (
                                <ProductItem key={index} data={result} />
                            ))}
                        </div>
                    </div>

                    <div className={cx('product2')}>
                        <div className={cx('lable-products')}>
                            <h2 className={cx('lable', 'active')} onClick={changeLableproc}>
                                Sản phẩm mới
                            </h2>
                            <h2 className={cx('lable')} onClick={changeLableproc}>
                                Sản phẩm khuyến mại
                            </h2>
                        </div>
                        <div className={cx('products')}>
                            {newProduct.map((product, index) => (
                                <ProductItem key={index} data={product} />
                            ))}
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
}

export default Home;

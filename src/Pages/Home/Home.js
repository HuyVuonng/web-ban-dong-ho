import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import ProductItem from '~/Components/ProductItem/ProductItem';
import NewItem from '~/Components/NewItem/NewItem';
import httpRequest from '~/utils/httprequest';
import { useEffect, useState, useRef } from 'react';
import Loadding from '~/Components/Loadding';

import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);
function Home() {
    let load = useRef(true);
    const [loadding, setloading] = useState(true);
    const [bestseller, setBestseller] = useState([]);
    const [newProduct, setNewProduct] = useState([]);
    const idTimeout = useRef();

    const fetchdata = async () => {
        const res = await httpRequest.get('products/bestseller');
        const newproducts = await httpRequest.get('products/newproducts');
        setNewProduct(newproducts.data);
        setBestseller(res.data);
        setloading(false);
        clearTimeout(idTimeout.current);
    };
    useEffect(() => {
        if (load.current) {
            window.scrollTo(0, 0);
            fetchdata();
            document.title = 'Trang chủ';
            load.current = false;
            //Sau 2p nếu chưa fetch data xong sẽ load lại trang web
            idTimeout.current = setTimeout(() => {
                window.location.reload();
            }, 120000);
        }
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        arrows: true,
        speed: 1000,
        autoplaySpeed: 6000,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        prevArrow: (
            <button type="button" className="slick-prev pull-left slick-prev-btn slick-btn">
                <FontAwesomeIcon icon={faAngleLeft} className="slick-prev-btn-icon" />
            </button>
        ),
        nextArrow: (
            <button type="button" className="slick-next pull-right slick-next-btn slick-btn">
                <FontAwesomeIcon icon={faAngleRight} className="slick-next-btn-icon" />
            </button>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                    arrows: true,
                    speed: 1000,
                    autoplaySpeed: 6000,
                    autoplay: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                    arrows: true,
                    speed: 1000,
                    autoplaySpeed: 6000,
                    autoplay: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: true,
                    speed: 1000,
                    autoplaySpeed: 6000,
                    autoplay: true,
                },
            },
        ],
    };

    const changeLableproc = (e) => {
        const lable = document.querySelectorAll(`.${cx('lable')}`);
        for (let i = 0; i < lable.length; i++) {
            lable[i].classList.remove(`${cx('active')}`);
        }
        e.target.classList.add(`${cx('active')}`);
    };

    if (loadding) {
        return <Loadding />;
    } else {
        return (
            <div className={cx('wrapper-homepage')}>
                <div className={cx('content')}>
                    <ToastContainer pauseOnHover={false} theme="dark" autoClose={1000} />

                    <div className={cx('best-seller')}>
                        <h2 className={cx('lable')}>Sản phẩm bán chạy</h2>
                        <div className={cx('best-seller-product')}>
                            <Slider {...settings}>
                                {bestseller.map((result, index) => (
                                    <ProductItem key={index} data={result} />
                                ))}
                            </Slider>
                        </div>
                    </div>

                    <div className={cx('product2')}>
                        <div className={cx('lable-products')}>
                            <h2 className={cx('lable', 'active')} onClick={changeLableproc}>
                                Sản phẩm mới
                            </h2>
                            {/* <h2 className={cx('lable')} onClick={changeLableproc}>
                                Sản phẩm khuyến mại
                            </h2> */}
                        </div>
                        <div className={cx('products')}>
                            {newProduct.map((product, index) => (
                                <ProductItem key={index} data={product} />
                            ))}
                        </div>
                    </div>

                    {/* <div className={cx('news')}>
                        <NewItem />
                        <NewItem />
                        <NewItem />
                    </div> */}

                    {/* <div className={cx('dk')}>
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
                    </div> */}
                </div>
            </div>
        );
    }
}

export default Home;

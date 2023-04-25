import classNames from 'classnames/bind';
import styles from './ThanhToan.module.scss';
import { useEffect, useRef, useState } from 'react';
import httpRequest from '~/utils/httprequest';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ThanhToan() {
    const [prodctIncart, setProdctIncart] = useState([]);
    let loadFirst = useRef(true);
    const [tongtien, setTongTien] = useState(0);

    const prodInlocalStrorage = localStorage.getItem('idItems') ? JSON.parse(localStorage.getItem('idItems')) : [];
    const getData = async (id, sl) => {
        setProdctIncart([]);
        await httpRequest.get('/products', { params: { id: id } }).then((response) => {
            response.data.slmua = sl;
            setProdctIncart((pre) => [...pre, response.data]);
        });
    };

    const priceConver = (price) => {
        return Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    const tinhtongtien = () => {
        let total = document.querySelectorAll(`.${cx('thanhtoan-prods-tongtien')}`);
        let tongtien = 0;
        for (let i = 0; i < total.length; i++) {
            let a = total[i].innerText.split('₫');
            let tien = Number(a[0].replaceAll('.', ''));
            tongtien += tien;
        }
        setTongTien(priceConver(tongtien));
    };

    useEffect(() => {
        if (loadFirst.current) {
            window.scrollTo(0, 0);
            document.title = 'Thanh toán';
            if (prodInlocalStrorage.length > 0) {
                prodInlocalStrorage.forEach((element) => {
                    getData(element.id_prod, element.sl);
                });
            } else if (prodInlocalStrorage.length === 0) {
                setProdctIncart([]);
            }
            setTimeout(() => {
                tinhtongtien();
            }, 200);

            loadFirst.current = false;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <main className={cx('thanhtoan-wrapper')}>
            <h1 className={cx('thanhtoan-title')}>Thanh Toán</h1>
            <form>
                <div className={cx('thanhtoan-content')}>
                    <div className={cx('thanhtoan-address')}>
                        <h4>Địa chỉ nhận hàng</h4>
                        <div className={cx('thanhtoan-hoten', 'thanhtoan-block')}>
                            <label htmlFor="name">Họ tên</label>
                            <input
                                type="text"
                                id={cx('hoTen')}
                                className={cx('thanhtoan-input')}
                                name="name"
                                placeholder="Nhập họ tên"
                                required
                            />
                        </div>
                        <div className={cx('thanhtoan-sdt', 'thanhtoan-block')}>
                            <label htmlFor="sdt">Số điện thoại</label>
                            <input
                                type="tel"
                                id={cx('sdt')}
                                pattern="[0-9]{4}[0-9]{3}[0-9]{3}"
                                className={cx('thanhtoan-input')}
                                name="sdt"
                                placeholder="Nhập số điện thoại"
                                required
                            />
                        </div>
                        <div className={cx('thanhtoan-email', 'thanhtoan-block')}>
                            <label htmlFor="email">Địa chỉ email</label>
                            <input
                                type="email"
                                id={cx('email')}
                                className={cx('thanhtoan-input')}
                                name="email"
                                placeholder="Nhập địa chỉ email"
                                required
                            />
                        </div>

                        <div className={cx('thanhtoan-thanhpho', 'thanhtoan-block')}>
                            <label htmlFor="tp">Thành phố</label>
                            <input
                                type="text"
                                id={cx('thanhpho')}
                                className={cx('thanhtoan-input')}
                                name="tp"
                                placeholder="Nhập thành phố"
                                required
                            />
                        </div>
                        <div className={cx('thanhtoan-diachi', 'thanhtoan-block')}>
                            <label htmlFor="diachi">Địa chỉ</label>
                            <input
                                type="text"
                                id={cx('diachi')}
                                className={cx('thanhtoan-input')}
                                name="email"
                                placeholder="Nhập địa chỉ nơi bạn ở"
                                required
                            />
                        </div>
                    </div>
                    <div className={cx('thanhtoan-prods')}>
                        <h3 className={cx('thanhtoan-prods-title')}>Đơn hàng của bạn</h3>
                        <div className={cx('thanhtoan-prods-content')}>
                            <div className={cx('thanhtoan-prods-info')}>
                                <span className={cx('thanhtoan-prods-sp')}>Sản phẩm</span>
                                <span className={cx('thanhtoan-prods-tongtien-title')}>Tổng tiền</span>
                            </div>
                            {prodctIncart.map((produc) => (
                                <div key={produc._id} className={cx('thanhtoan-prods-info')}>
                                    <span className={cx('thanhtoan-prods-sp')}>
                                        {produc.name} x {produc.slmua}
                                    </span>
                                    <span className={cx('thanhtoan-prods-tongtien')}>
                                        {priceConver(produc.price * produc.slmua)}
                                    </span>
                                </div>
                            ))}
                            <div className={cx('thanhtoan-prods-info')}>
                                <h3 className={cx('thanhtoan-prods-tongtien-hoadon')}>Tổng tiền toàn hóa đơn</h3>
                                <span className={cx('thanhtoan-prods-tongtien-toanhoadon')}>{tongtien}</span>
                            </div>
                        </div>
                        <button className={cx('thanhtoan-prods-btn-dathang')}>Đặt hàng</button>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default ThanhToan;

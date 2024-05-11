import classNames from 'classnames/bind';
import styles from './ThanhToan.module.scss';
import { useEffect, useRef, useState } from 'react';
import httpRequest from '~/utils/httprequest';
import Loadding from '~/Components/Loadding/Loadding';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';

const cx = classNames.bind(styles);

function ThanhToan() {
    const [prodctIncart, setProdctIncart] = useState([]);
    let loadFirst = useRef(true);
    const [loading, setLoading] = useState(false);
    const [tongtien, setTongTien] = useState(0);
    const [tongtienDefault, setTongTienDefault] = useState(0);
    const [productBuy, setProductBuy] = useState([]);
    const navigate = useNavigate();

    const prodInlocalStrorage = localStorage.getItem('idItems') ? JSON.parse(localStorage.getItem('idItems')) : [];
    const getData = async (id, sl) => {
        setProdctIncart([]);
        await httpRequest.get('/products', { params: { id: id } }).then((response) => {
            response.data.slmua = sl;
            let data = {
                id_prod: id,
                sl: sl,
                price: response.data.price,
            };
            console.log(data);
            setProdctIncart((pre) => [...pre, response.data]);
            setProductBuy((pre) => [...pre, data]);
        });
    };

    const priceConver = (price) => {
        return Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    const tinhtongtien = () => {
        setTimeout(() => {
            let total = document.querySelectorAll(`.${cx('thanhtoan-prods-tongtien')}`);
            let tongtien = 0;
            for (let i = 0; i < total.length; i++) {
                let a = total[i].innerText.split('₫');
                let tien = Number(a[0].replaceAll('.', ''));
                tongtien += tien;
            }
            setTongTien(priceConver(tongtien));
            setTongTienDefault(tongtien);
        }, 1000);
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

    const createBill = async () => {
        const hoTen = document.querySelector(`#${cx('hoTen')}`).value;
        const soDienThoai = document.querySelector(`#${cx('sdt')}`).value;
        const email = document.querySelector(`#${cx('email')}`).value;
        const thanhPho = document.querySelector(`#${cx('thanhpho')}`).value;
        const diaChi = document.querySelector(`#${cx('diachi')}`).value;
        const payment = document.querySelector(`#paymentSelect`).value;
        const prodBuy = productBuy;
        const tongTien = document.querySelector(`.${cx('thanhtoan-prods-tongtien-toanhoadon')}`).innerText;
        if (
            hoTen.trim() &&
            soDienThoai.trim() &&
            email.trim() &&
            thanhPho.trim() &&
            diaChi.trim() &&
            !isNaN(soDienThoai) &&
            prodBuy.length > 0
        ) {
            const bill = {
                hoTen,
                soDienThoai,
                email,
                thanhPho,
                diaChi,
                prodBuy,
                tongTien,
            };

            for (let i = 0; i < prodBuy.length; i++) {
                let productOld;
                await httpRequest
                    .get('/products', { params: { id: prodBuy[i].id_prod } })
                    .then((response) => (productOld = response.data));
                let soluonMoi = +productOld.SoLuong - prodBuy[i].sl;
                if (soluonMoi < 0) {
                    alert(`Số lượng sản phẩm mua nhiều hơn số lượng đang có`);
                    return;
                }
                let daBan = +productOld.daBan + prodBuy[i].sl;
                httpRequest.patch(`/products/updateQuantity/${prodBuy[i].id_prod}`, {
                    SoLuong: soluonMoi,
                    daBan: daBan,
                });
            }
            if (payment === '2') {
                httpRequest.post('/bills/create', bill);
                setLoading(true);
                setTimeout(() => {
                    localStorage.removeItem('idItems');
                }, 500);
                let data;

                // eslint-disable-next-line prefer-const
                data = {
                    nameCustomer: hoTen,
                    email: email,
                    products: prodctIncart,
                    tongTien: tongtien,
                };
                httpRequest.post('/sendMail', { data }).then((response) => console.log(response.data));

                const bodyPayment = {
                    amount: tongtienDefault,
                    orderDescription: 'Thanh toan don hang tai Mona',
                    orderType: 'other',
                };

                httpRequest.post('/create_payment_url', bodyPayment).then((res) => {
                    window.location.href = res.data.link;
                });
            } else {
                httpRequest.post('/bills/create', bill);
                setLoading(true);
                setTimeout(() => {
                    localStorage.removeItem('idItems');
                    navigate('/dathangthanhcong');
                }, 500);

                let data;

                // eslint-disable-next-line prefer-const
                data = {
                    nameCustomer: hoTen,
                    email: email,
                    products: prodctIncart,
                    tongTien: tongtien,
                };
                httpRequest.post('/sendMail', { data }).then((response) => console.log(response.data));
            }
        }
    };
    return (
        <main className={cx('thanhtoan-wrapper')}>
            {/* <h1 className={cx('thanhtoan-title')}>Thanh Toán</h1> */}
            {loading && <Loadding />}
            <form
                className="mt-[26px]"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className={cx('thanhtoan-content')}>
                    <div className={cx('thanhtoan-address')}>
                        <h4 className="text-[26px]">Địa chỉ nhận hàng</h4>
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
                                name="diachi"
                                placeholder="Nhập địa chỉ nơi bạn ở"
                                required
                            />
                        </div>
                        <div className={cx('thanhtoan-diachi', 'thanhtoan-block')}>
                            <label htmlFor="payment">Phương thức thanh toán</label>
                            <select
                                name="payment"
                                type="text"
                                id="paymentSelect"
                                className={cx('thanhtoan-input')}
                                defaultValue={1}
                                required
                            >
                                <option value="1">Thanh toán khi nhận hàng</option>
                                <option value="2">Thanh toán online</option>
                            </select>
                        </div>
                    </div>
                    <div className={cx('thanhtoan-prods')}>
                        <h3 className="text-[26px]">Đơn hàng của bạn</h3>
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
                        <button className={cx('thanhtoan-prods-btn-dathang')} onClick={createBill}>
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default ThanhToan;

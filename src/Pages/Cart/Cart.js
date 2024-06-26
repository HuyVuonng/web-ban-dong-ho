import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { useEffect, useRef, useState } from 'react';
import httpRequest from '~/utils/httprequest';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Cart() {
    let isload = useRef(true);
    const [products, setProduct] = useState([]);
    const [tongtien, setTongtien] = useState(0);
    const prodInlocalStrorage = localStorage.getItem('idItems') ? JSON.parse(localStorage.getItem('idItems')) : [];
    const [prodInlocal, setProdInlocal] = useState(prodInlocalStrorage);
    let idprodDelete = useRef();

    const getData = async (id, sl) => {
        setProduct([]);
        await httpRequest.get('/products', { params: { id: id } }).then((response) => {
            response.data.slmua = sl;
            setProduct((pre) => [...pre, response.data]);
            tinhtongtien();
        });
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Giỏ hàng';
        if (isload.current) {
            if (prodInlocalStrorage.length > 0) {
                prodInlocalStrorage.forEach((element) => {
                    getData(element.id_prod, element.sl);
                });
            } else if (prodInlocalStrorage.length === 0) {
                setProduct([]);
            }
            isload.current = false;
        }
        setTimeout(() => {
            isload.current = true;
        }, 200);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prodInlocal]);

    const tinhtongtien = () => {
        setTimeout(() => {
            let total = document.querySelectorAll(`.${cx('Item-total-price')}`);
            let tong = 0;
            for (let i = 0; i < total.length; i++) {
                let a = total[i].innerText.split('₫');
                let tien = Number(a[0].replaceAll('.', ''));
                tong += tien;
            }
            setTongtien(priceConver(tong));
        });
    };

    const priceConver = (price) => {
        return Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    const removeItem = (id) => {
        let itemStrore = JSON.parse(localStorage.getItem('idItems'));
        itemStrore.forEach((element, index) => {
            if (element.id_prod === id) {
                itemStrore.splice(index, 1);
                localStorage.setItem('idItems', JSON.stringify(itemStrore));
                setProdInlocal(JSON.parse(localStorage.getItem('idItems')));
            }
        });
    };

    const changeQuantity = (e, slCon, id) => {
        if (+e.target.value > slCon) {
            alert('Số lượng mua vượt quá số lượng còn lại của mặt hàng');
            e.target.value = slCon;
        }
        prodInlocal.find((e) => e.id_prod === id).sl = e.target.value;
        localStorage.setItem('idItems', JSON.stringify(prodInlocal));
        const prodChange = products.find((e) => e._id === id);
        prodChange.slmua = e.target.value;
        let total = document.querySelector(`#total-${id}`);
        total.innerHTML = priceConver(prodChange.price * prodChange.slmua);
        tinhtongtien();
    };

    return (
        <div className="py-10">
            <div className={cx('cart-wrapper')}>
                <h3 className="text-[18px] text-center font-medium mb-3">Giỏ hàng</h3>
                <div className={cx('cart-content')}>
                    <div className={cx('cart-product')}>
                        <table>
                            <thead>
                                <tr className={cx('cart-productList-title')}>
                                    <th></th>
                                    <th>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.length > 0 ? (
                                    products.map((product, index) => {
                                        return (
                                            <tr key={index} className={cx('Item')}>
                                                <td className={cx('Item-img')}>
                                                    <img src={product.img} alt="" />
                                                </td>
                                                <td className={cx('Item-name')}>{product.name}</td>
                                                <td className={cx('Item-price')}>{priceConver(product.price)}</td>
                                                <td className={cx('Item-buy')}>
                                                    <input
                                                        className="text-center"
                                                        type="number"
                                                        defaultValue={product.slmua}
                                                        min={1}
                                                        max={Number(product.SoLuong)}
                                                        onChange={(e) =>
                                                            changeQuantity(e, Number(product.SoLuong), product._id)
                                                        }
                                                    />
                                                </td>
                                                <td className={cx('Item-total-price')} id={`total-${product._id}`}>
                                                    {priceConver(product.price * product.slmua)}
                                                </td>
                                                <td
                                                    className={cx('Item-remove')}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#DeleteModal"
                                                    data-id={product._id}
                                                    onClick={(e) => (idprodDelete.current = e.target.dataset.id)}
                                                >
                                                    x
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center">
                                            <img
                                                style={{ width: '100%' }}
                                                src="https://i.pinimg.com/736x/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038--android.jpg"
                                                alt="cart-emty-img"
                                            />
                                            ;
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {prodInlocalStrorage.length > 0 && (
                        <div className={cx('cart-total-prices')}>
                            <h2 className="text-[18px]">Tổng tiền</h2>
                            <h3 className="text-[18px]">{tongtien}</h3>
                            <Link to="/thanhtoan">TIẾN HÀNH THANH TOÁN</Link>
                        </div>
                    )}
                </div>

                {/* Confirm delete modal */}

                <div
                    className="modal fade"
                    id="DeleteModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Bạn muốn xóa?
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">Bạn muốn xóa sản phẩm này khỏi giỏ hàng? </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                    onClick={() => removeItem(idprodDelete.current)}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;

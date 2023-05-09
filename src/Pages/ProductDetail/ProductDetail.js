import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import httpRequest from '~/utils/httprequest';

const cx = classNames.bind(styles);

function ProductDetail() {
    const input = useRef();
    const txtErr = useRef();
    let productID = useParams();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState([]);
    const [loadding, setLoadding] = useState(true);
    // let load = useRef(true);
    const navigate = useNavigate();

    const getProductDetail = async () => {
        try {
            await httpRequest
                .get('products', {
                    params: {
                        id: productID.ID,
                    },
                })
                .then((response) => {
                    document.title = response.data.name;
                    setProduct(response.data);
                });

            setLoadding(false);
        } catch (error) {
            navigate('/pagenotfound');
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        getProductDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productID]);

    const changePrice = (price) => {
        const priceChange = Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
        return priceChange;
    };
    useEffect(() => {
        const idtimeout = setTimeout(() => {
            if (input.current) {
                if (input.current.value === '' || input.current.value < 1) {
                    setQuantity(1);
                    return;
                } else if (input.current.value > +product.SoLuong) {
                    setQuantity(+product.SoLuong);
                    return;
                }
            }
        }, 800);
        return () => clearTimeout(idtimeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity]);

    const plus = () => {
        let quantity = +input.current.value;
        if (quantity === +product.SoLuong) {
            txtErr.current.textContent = 'Vuợt quá số lượng hàng hiện có';
            return;
        } else if (quantity >= 1) {
            txtErr.current.textContent = '';
            setQuantity(quantity + 1);
        }
    };

    const setDescription = (description) => {
        setTimeout(() => {
            document.querySelector(`.${cx('product-description')}`).innerHTML = description;
        }, 300);
    };

    const minus = () => {
        let quantity = +input.current.value;

        if (quantity <= 1) {
            txtErr.current.textContent = 'Quantity must be >0';
            return;
        }
        txtErr.current.textContent = '';
        setQuantity(quantity - 1);
    };

    const changeQuantity = () => {
        if (isNaN(input.current.value)) {
            setQuantity(1);
            txtErr.current.textContent = 'Số lượng phải là dạng số';
            return;
        }
        txtErr.current.textContent = '';

        setQuantity(input.current.value);
    };

    const AddtoCart = () => {
        let tontai = false;
        let location;
        let id_items = localStorage.getItem('idItems') ? JSON.parse(localStorage.getItem('idItems')) : [];
        id_items.forEach((item, index) => {
            if (item.id_prod === product._id) {
                location = index;
                tontai = true;
            }
        });
        if (tontai) {
            if (id_items[location].sl + quantity > +product.SoLuong) {
                txtErr.current.textContent = 'Vuợt sản phẩm trong giỏ hàng vượt quá số lượng hàng hiện có';
                return false;
            }
            id_items[location].sl += quantity;
        } else {
            id_items.push({
                id_prod: product._id,
                sl: quantity,
            });
        }
        localStorage.setItem('idItems', JSON.stringify(id_items));
        toast.success(<Link to="/cart">Đã thêm vào giỏ hàng</Link>, { theme: 'dark', autoClose: 1000 });
    };
    return (
        <div className={cx('wrapper-prosuct-detail')}>
            {loadding ? (
                <div>Loading...</div>
            ) : (
                <div className={cx('container')}>
                    <div className={cx('img-product')}>
                        <img src={product.img} alt="" />
                    </div>

                    <div className={cx('product-info')}>
                        <h1 className={cx('product-name')}>{product.name}</h1>
                        <h3 className={cx('product-price')}>{changePrice(product.price)}</h3>
                        <span className={cx('product-owner-title')}>Thương hiệu:</span>
                        <span className={cx('product-owner')}>{product.ThuongHieu}</span>

                        <p className={cx('product-description-title')}>Mô tả:</p>

                        <div className={cx('product-description')}>{setDescription(product.Decription)}</div>

                        <div className={cx('product-action')}>
                            <div className={cx('product-action-plus-minus')}>
                                <span className={cx('product-quantity-title')}>Số lượng</span>
                                <FontAwesomeIcon icon={faMinus} className={cx('product-icon-minus')} onClick={minus} />
                                <input
                                    ref={input}
                                    type="text"
                                    className={cx('product-quantity')}
                                    value={quantity}
                                    onChange={changeQuantity}
                                />
                                <FontAwesomeIcon icon={faPlus} className={cx('product-icon-plus')} onClick={plus} />
                            </div>
                            <p ref={txtErr} className={cx('product-quantity-err')}></p>
                            <button className={cx('product-action-buy')} onClick={AddtoCart}>
                                Thêm vào giỏ hàng
                            </button>
                            <ToastContainer theme="dark" autoClose={1000} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetail;

import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function ProductDetail() {
    const input = useRef();
    const txtErr = useRef();
    const max = 10;

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const idtimeout = setTimeout(() => {
            if (input.current.value === '' || input.current.value < 1) {
                setQuantity(1);
                return;
            } else if (input.current.value > max) {
                setQuantity(max);

                return;
            }
        }, 800);
        return () => clearTimeout(idtimeout);
    }, [quantity]);

    const plus = () => {
        let quantity = +input.current.value;
        if (quantity === max) {
            txtErr.current.textContent = 'Vuợt quá số lượng hàng hiện có';
            return;
        } else if (quantity >= 1) {
            txtErr.current.textContent = '';
            setQuantity(quantity + 1);
        }
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
    return (
        <div className={cx('wrapper-prosuct-detail')}>
            <div className={cx('container')}>
                <div className={cx('img-product')}>
                    <img
                        src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-05.png"
                        alt=""
                    />
                </div>

                <div className={cx('product-info')}>
                    <h1 className={cx('product-name')}>Classio 4</h1>
                    <h3 className={cx('product-price')}>500.000đ</h3>
                    <span className={cx('product-owner-title')}>Nhà sản xuất:</span>
                    <span className={cx('product-owner')}>Nhà sản xuấ1t</span>

                    <p className={cx('product-description-title')}>Mô tả:</p>
                    <p className={cx('product-description')}>dfasdfasdfasdfasdfasdfasdfasdfsdfsdfasdfasdfafd</p>

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
                        <button className={cx('product-action-buy')}>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;

import classNames from 'classnames/bind';
import styles from './ProductItemQL.module.scss';
import httpRequest from '~/utils/httprequest';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProductItemQL({ data }) {
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

    const DeleteProduct = async (id) => {
        await httpRequest.delete(`products/deletebyID/${id}`);
        window.location.href = 'http://localhost:3001/quanly';
    };
    return (
        <div className={cx('ProductItem-wrapper')}>
            <div className={cx('body')}>
                <img className={cx('body-img')} src={data.img} alt="" />
                <div className={cx('nd')}>
                    <span className={cx('sp-name')}>{data.name}</span>
                    <div className={cx('price')}>
                        <span className={cx('price-old')}>{Oldprice()}</span>
                        <span className={cx('price-new')}>{price}</span>
                    </div>
                </div>
                <Link className={cx('body-btn', 'Sua')} to={`/product/${data._id}/edit`}>
                    <span className={cx('btn-name')}>Sửa</span>
                </Link>
                <button className={cx('body-btn', 'Xoa')} onClick={() => DeleteProduct(data._id)}>
                    <span className={cx('btn-name')}>Xóa</span>
                </button>
            </div>
        </div>
    );
}

export default ProductItemQL;

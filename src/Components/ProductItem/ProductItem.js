import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpRequest from '~/utils/httprequest';

const cx = classNames.bind(styles);

function ProductItem({ data }) {
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

    const AddtoCart = async (e) => {
        let tontai = false;
        let id = e.target.dataset.id;
        let soluongCon;
        await httpRequest.get('/products', { params: { id } }).then((res) => (soluongCon = res.data.SoLuong));
        let location;
        let id_items = localStorage.getItem('idItems') ? JSON.parse(localStorage.getItem('idItems')) : [];
        id_items.forEach((item, index) => {
            if (item.id_prod === id) {
                location = index;
                tontai = true;
            }
        });
        if (tontai) {
            if (id_items[location].sl + 1 > +soluongCon) {
                toast.error('Vuợt sản phẩm trong giỏ hàng vượt quá số lượng hàng hiện có', {
                    theme: 'dark',
                    autoClose: 1000,
                });
                return false;
            }
            id_items[location].sl += 1;
        } else {
            id_items.push({
                id_prod: id,
                sl: 1,
            });
        }
        toast.success(<Link to="/cart">Đã thêm vào giỏ hàng</Link>, { theme: 'dark', autoClose: 1000 });
        localStorage.setItem('idItems', JSON.stringify(id_items));
    };

    return (
        <div className={cx('ProductItem-wrapper')}>
            <div className={cx('body')}>
                <Link className={cx('product-link')} to={`/productDetails/${data._id}`}>
                    <img className={cx('body-img')} src={data.img} alt="" />
                    <div className={cx('nd')}>
                        <span className={cx('sp-name')}>{data.name}</span>
                        <div className={cx('price')}>
                            <span className={cx('price-old')}>{Oldprice()}</span>
                            <span className={cx('price-new')}>{price}</span>
                        </div>
                    </div>
                </Link>

                {data.SoLuong > 0 ? (
                    <button className={cx('body-btn')} data-id={data._id} onClick={(e) => AddtoCart(e)}>
                        <span className={cx('btn-name')}>Thêm vào giỏ hàng</span>
                    </button>
                ) : (
                    <button
                        disabled
                        className={cx('body-btn', 'disabled')}
                        data-id={data._id}
                        onClick={(e) => AddtoCart(e)}
                    >
                        <span className={cx('btn-name')}>Hết hàng</span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProductItem;

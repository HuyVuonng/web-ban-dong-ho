import classNames from 'classnames/bind';
import styles from './ProductItemQL.module.scss';
import httpRequest from '~/utils/httprequest';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

let IdProdDelete;
function ProductItemQL({ data }) {
    let price = Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(data.price);

    // const getid = (e) => {
    //     IdDelete.current = e.target.dataset.id;
    // };
    const DeleteProduct = async () => {
        await httpRequest.patch(`products/deletebyIDSoft/${IdProdDelete}`);
        window.location.reload();
    };

    return (
        <div className={cx('ProductItem-wrapper')}>
            <div className={cx('body')}>
                <Link className={cx('product-link')} to={`/productDetails/${data._id}`}>
                    <img className={cx('body-img')} src={data.img} alt="" />
                    <div className={cx('nd')}>
                        <span className={cx('sp-name')}>{data.name}</span>
                        <div className={cx('price')}>
                            <span className={cx('price-new')}>{price}</span>
                        </div>
                        <div className={cx('quantity')}>
                            <span className={cx('remaining')}>Còn lại: {data.SoLuong}</span>
                            <span className={cx('bought')}>Đã bán: {data.daBan}</span>
                        </div>
                    </div>
                </Link>
                <Link className={cx('body-btn', 'Sua')} to={`/product/${data._id}/edit`}>
                    <span className={cx('btn-name')}>Sửa</span>
                </Link>
                <button className={cx('body-btn', 'Xoa')}>
                    <span
                        className={cx('btn-name')}
                        data-bs-toggle="modal"
                        data-bs-target="#DeleteModal"
                        data-id={data._id}
                        onClick={() => (IdProdDelete = data._id)}
                    >
                        Xóa
                    </span>
                </button>
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
                        <div className="modal-body">Bạn muốn xóa sản phẩm này khỏi trang web? </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => DeleteProduct()}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductItemQL;

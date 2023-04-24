import classNames from 'classnames/bind';
import styles from './ProductItemDeleted.module.scss';
import httpRequest from '~/utils/httprequest';

const cx = classNames.bind(styles);

let IdProdDelete;
function ProductItemDeleted({ data }) {
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
    // const getid = (e) => {
    //     IdDelete.current = e.target.dataset.id;
    // };
    const DeleteProduct = async () => {
        await httpRequest.delete(`products/deletebyIDForce/${IdProdDelete}`);
        window.location.reload();
    };
    const restoreProduct = async (e) => {
        const idRestore = e.target.dataset.id;
        await httpRequest.patch(`products/trash/restore/${idRestore}`);
        window.location.reload();
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
                <button className={cx('body-btn', 'Sua')} data-id={data._id} onClick={restoreProduct}>
                    <span className={cx('btn-name')}>Khôi phục</span>
                </button>
                <button
                    className={cx('body-btn', 'Xoa')}
                    data-bs-toggle="modal"
                    data-bs-target="#DeleteModal"
                    data-id={data._id}
                    onClick={(e) => (IdProdDelete = e.target.dataset.id)}
                >
                    <span className={cx('btn-name')}>Xóa</span>
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
                        <div className="modal-body">
                            Bạn muốn xóa sản phẩm này hoàn toàn khỏi trang web, thao tác này sẽ không thể khôi phục lại
                            được?{' '}
                        </div>
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

export default ProductItemDeleted;

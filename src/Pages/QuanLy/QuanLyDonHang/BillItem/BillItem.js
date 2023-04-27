import classNames from 'classnames/bind';
import styles from './BillItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import httpRequest from '~/utils/httprequest';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function BillItem({ data, callback, setdata, calldata, datachange, lablebtn, done = false, pageLoad }) {
    const [product, setProduct] = useState([]);
    const isFirst = useRef(true);
    const change = useRef(true);
    const parsePrice = (price) => {
        return Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    const getProductInfo = async () => {
        data.prodBuy.forEach(async (element) => {
            setProduct([]);
            await httpRequest.get('/products', { params: { id: element.id_prod } }).then((response) => {
                response.data.slmua = element.sl;
                setProduct((pre) => [...pre, response.data]);
            });
        });
    };
    useEffect(() => {
        if (isFirst.current) {
            getProductInfo();
            isFirst.current = false;

            setTimeout(() => {
                isFirst.current = true;
            }, 200);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [change.current]);

    const deleteBill = async (e) => {
        const id = e.target.dataset.bill;

        const dataProduct = JSON.parse(e.target.dataset.product);
        console.log(dataProduct);

        if (done === false) {
            for (let i = 0; i < dataProduct.length; i++) {
                let soluonMoi = +dataProduct[i].SoLuong + dataProduct[i].slmua;
                let daBan = +dataProduct[i].daBan - dataProduct[i].slmua;
                console.log('slCU: ' + dataProduct[i].SoLuong);
                console.log('slmoiL: ' + soluonMoi);
                console.log('daban cu:' + dataProduct[i].daBan);
                console.log('dabanmo ' + daBan);

                await httpRequest.patch(`/products/updateQuantity/${dataProduct[i]._id}`, {
                    SoLuong: soluonMoi,
                    daBan: daBan,
                });
            }
        }
        await httpRequest.delete(`bills/deleteBill/${id}`);
        let newList = [];
        await httpRequest.get(`${calldata}?page=${pageLoad}`).then((response) => (newList = response.data));
        callback(newList);
        change.current = !change.current;
    };
    const showBill = (e) => {
        const bills = document.querySelectorAll(`.${cx('BillItem-description-infor')}`);
        const arrows = document.querySelectorAll(`.${cx('BillItem-description-icon')}`);
        arrows.forEach((arrow) => {
            if (arrow.dataset.bill === e.target.dataset.bill) {
                arrow.classList.toggle(`${cx('rotate')}`);
            }
        });
        bills.forEach((bill) => {
            if (bill.dataset.bill === e.target.dataset.bill) {
                bill.classList.toggle(`${cx('show')}`);
            }
        });
    };

    const changeTime = (time) => {
        return (
            new Date(time).toLocaleDateString('vi-VN').toString() +
            ' ' +
            new Date(time).toLocaleTimeString('vi-VN').toString()
        );
    };
    const changStatus = async (e) => {
        const idBill = e.target.dataset.id;
        change.current = !change.current;
        setTimeout(async () => {
            await httpRequest.patch(`${setdata}/${idBill}`, { [datachange]: true });
            let newList = [];
            await httpRequest.get(`${calldata}?page=${pageLoad}`).then((response) => (newList = response.data));
            callback(newList);
        }, 1000);
    };
    return (
        <>
            <div className={cx('BillItem-wrapper')} data-bill={data._id}>
                <div className={cx('BillItem-content')}>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={cx('BillItem-delete-icon')}
                        data-bill={data._id}
                        data-buy={JSON.stringify(data.prodBuy)}
                        data-product={JSON.stringify(product)}
                        onClick={deleteBill}
                    />
                    <div className={cx('BillItem-infor-action')} data-bill={data._id} onClick={showBill}>
                        <div className={cx('BillItem-info')}>
                            <div className={cx('BillItem-hoTen')}>Họ tên: {data.hoTen}</div>
                            <div className={cx('BillItem-sdt')}>Số điện thoại: {data.soDienThoai}</div>
                            <div className={cx('BillItem-tp')}>Thành phố: {data.thanhPho}</div>
                            <div className={cx('BillItem-time')}>Thời gian đặt: {changeTime(data.createdAt)}</div>
                            <div className={cx('BillItem-tongTien')}>Tổng tiền: {data.tongTien}</div>
                        </div>
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            data-bill={data._id}
                            className={cx('BillItem-description-icon')}
                        />
                    </div>
                </div>
                <div className={cx('BillItem-description-infor')} data-bill={data._id}>
                    <div className={cx('BillItem-description-customer-info')}>
                        <p>Họ tên khách hàng: {data.hoTen}</p>
                        <p>Số điện thoại khách hàng: {data.soDienThoai}</p>
                        <p>Emal khách hàng: {data.email}</p>
                        <p>Địa chỉ khách hàng: {data.diaChi}</p>
                        <p>Thành phố: {data.thanhPho}</p>
                        <p>Thời gian đặt hàng: {changeTime(data.createdAt)}</p>
                    </div>
                    <div className={cx('BillItem-description-product-info')}>
                        {product.map((prod, index) => (
                            <div className={cx('BillItem-product-wrapper')} key={index}>
                                <img src={prod.img} alt={prod.name} />
                                <span>{prod.name}</span>
                                <span>Số lượng: {prod.slmua}</span>
                                <span>Giá: {parsePrice(prod.price)}</span>
                                <span className={cx('BillItem-tongtien-hide')}>{+prod.slmua * prod.price}</span>
                            </div>
                        ))}

                        <p className={cx('BillItem-description-totalPrice')}>
                            <strong>Tổng tiền hóa đơn:</strong> {data.tongTien}
                        </p>
                        <button
                            className={cx('BillItem-btn-delivering', { done })}
                            data-id={data._id}
                            onClick={changStatus}
                        >
                            {lablebtn || 'Hoàn tất'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BillItem;

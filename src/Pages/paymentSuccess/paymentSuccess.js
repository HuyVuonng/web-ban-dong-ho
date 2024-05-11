import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import httpRequest from '~/utils/httprequest';
import Loadding from '~/Components/Loadding/Loadding';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import moment from 'moment/moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function PaymentSuccess() {
    let loadFirst = useRef(true);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    let { search } = useLocation();

    const query = new URLSearchParams(search);
    const vnp_Amount = query.get('vnp_Amount');

    const getData = async () => {
        setLoading(true);
        console.log(window.location.search);

        httpRequest.get(`/vnpay_ipn${window.location.search}`).then((response) => {
            setStatus(response.data.RspCode);
            setLoading(false);
        });
    };

    useEffect(() => {
        if (loadFirst.current) {
            window.scrollTo(0, 0);
            document.title = 'Trạng thái thanh toán';
            getData();
            loadFirst.current = false;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const priceConver = (price) => {
        return Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    return (
        <main className="p-10">
            {loading && <Loadding />}
            {status === '00' && (
                <div className="flex flex-col justify-center items-center gap-4">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 text-[60px]" />
                    <h1 className="text-green-500 text-center text-[20px]">Thanh toán thành công</h1>
                    <span className="text-green-500 text-center text-[20px]">
                        Số tiền: {priceConver(vnp_Amount / 100)}
                    </span>
                    <span className="text-[20px]">Đơn hàng sẽ sớm được giao đến bạn</span>
                    <a className="px-[16px] py-[8px] text-[16px] !bg-primary text-white hover:opacity-85" href="/">
                        Quay về trang chủ
                    </a>
                </div>
            )}
            {status !== '00' && (
                <div className="flex flex-col justify-center items-center gap-4">
                    <FontAwesomeIcon icon={faCircleXmark} className="text-red-500 text-[60px]" />
                    <h1 className="text-red-500  text-center text-[20px]">Thanh toán không thành công</h1>
                    <span className="text-red-500  text-center text-[20px]">
                        Số tiền: {priceConver(vnp_Amount / 100)}
                    </span>
                    <a className="px-[16px] py-[8px] text-[16px] !bg-primary text-white hover:opacity-85" href="/">
                        Quay về trang chủ
                    </a>
                </div>
            )}
        </main>
    );
}

export default PaymentSuccess;

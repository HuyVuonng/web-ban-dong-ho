import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import httpRequest from '~/utils/httprequest';
import Loadding from '~/Components/Loadding/Loadding';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';

function PaymentSuccess() {
    let loadFirst = useRef(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getData = async () => {
        setLoading(true);
        console.log(window.location.search);

        httpRequest.get(`/vnpay_ipn${window.location.search}`).then((response) => {
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

    return (
        <main>
            <h1>Trạng thái thanh toán</h1>
            {loading && <Loadding />}
        </main>
    );
}

export default PaymentSuccess;

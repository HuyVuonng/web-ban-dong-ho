import classNames from 'classnames/bind';
import styles from './DeliveringBills.module.scss';
import { useEffect, useRef, useState } from 'react';
import httpRequest from '~/utils/httprequest';
import Loadding from '~/Components/Loadding';
import ReactPaginate from 'react-paginate';
import BillItem from '../BillItem/BillItem';

const cx = classNames.bind(styles);

function DeliveringBills() {
    const [AllDeliveringBills, setAllDeliveringBills] = useState([]);
    const [DeliveringBillsPage, setDeliveringBillsPage] = useState([]);
    const soLuongItemTrenTrang = 10;
    const pageLoad = useRef(1);

    let isFirst = useRef(true);
    const [loading, setLoading] = useState(true);
    const getdata = async () => {
        await httpRequest.get('bills/deliveringBills').then((res) => setAllDeliveringBills(res.data));
        await httpRequest.get('bills/deliveringBills?page=1').then((res) => setDeliveringBillsPage(res.data));
        setLoading(false);
    };
    const handlePageClick = async (event) => {
        let page = event.selected + 1;
        pageLoad.current = page;

        window.scrollTo(0, 0);
        await httpRequest
            .get(`bills/deliveringBills?page=${page}`)
            .then((response) => setDeliveringBillsPage(response.data));
    };

    const callbackFunction = (childData) => {
        isFirst.current = true;
        setDeliveringBillsPage(childData);
    };

    useEffect(() => {
        if (isFirst.current) {
            getdata();
            isFirst.current = false;
        }
    }, [DeliveringBillsPage]);
    if (loading) {
        return <Loadding />;
    } else {
        return (
            <div className={cx('deliveringBills-wrapper')}>
                <div className={cx('deliveringBills-content')}>
                    {DeliveringBillsPage.map((bill, index) => (
                        <BillItem
                            key={index}
                            data={bill}
                            callback={callbackFunction}
                            pageLoad={pageLoad.current}
                            calldata="/bills/deliveringBills"
                            setdata="/bills/deliveringBills/delivered"
                            datachange="daGiao"
                            lablebtn="Đã Giao Hàng"
                        />
                    ))}
                </div>

                <ReactPaginate
                    className={cx('phantrang')}
                    pageClassName={cx('phantrang-page')}
                    activeClassName={cx('phantrang-PageActive')}
                    pageLinkClassName={cx('phantrang-PageLink')}
                    marginPagesDisplayed={1}
                    forcePage={pageLoad.current - 1}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageCount={AllDeliveringBills.length / soLuongItemTrenTrang}
                    pageRangeDisplayed={2}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        );
    }
}

export default DeliveringBills;

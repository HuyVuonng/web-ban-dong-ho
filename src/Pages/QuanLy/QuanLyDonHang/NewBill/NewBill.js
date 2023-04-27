import classNames from 'classnames/bind';
import styles from './NewBill.module.scss';
import { useEffect, useRef, useState } from 'react';
import httpRequest from '~/utils/httprequest';
import ReactPaginate from 'react-paginate';
import Loadding from '~/Components/Loadding';
import BillItem from '../BillItem/BillItem';

const cx = classNames.bind(styles);

function NewBill() {
    const [AllNewBill, setAllNewBill] = useState([]);
    const [NewBillPage, setNewBillPage] = useState([]);
    const soLuongItemTrenTrang = 10;
    const [loading, setLoading] = useState(true);
    const pageLoad = useRef(1);
    let isFirst = useRef(true);
    const getdata = async () => {
        await httpRequest.get('bills/newBills').then((res) => setAllNewBill(res.data));
        await httpRequest.get(`bills/newBills?page=1`).then((res) => setNewBillPage(res.data));
        setLoading(false);
    };
    const handlePageClick = async (event) => {
        let page = event.selected + 1;
        pageLoad.current = page;
        window.scrollTo(0, 0);
        await httpRequest.get(`bills/newBills?page=${page}`).then((response) => setNewBillPage(response.data));
    };
    const callbackFunction = (childData) => {
        isFirst.current = true;
        setNewBillPage(childData);
    };

    useEffect(() => {
        if (isFirst.current) {
            getdata();
            isFirst.current = false;
        }
    }, [NewBillPage]);
    if (loading) {
        return <Loadding />;
    } else {
        return (
            <div className={cx('newBills-wrapper')}>
                <div className={cx('newBills-content')}>
                    {NewBillPage.map((bill, index) => (
                        <BillItem
                            key={index}
                            data={bill}
                            pageLoad={pageLoad.current}
                            callback={callbackFunction}
                            calldata="bills/newBills?page=1"
                            setdata="/bills/newBills/delivering"
                            datachange="dangGiao"
                            lablebtn="Đang Giao Hàng"
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
                    pageCount={AllNewBill.length / soLuongItemTrenTrang}
                    pageRangeDisplayed={2}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        );
    }
}

export default NewBill;

import classNames from 'classnames/bind';
import styles from './DeliveredBills.module.scss';
import { useEffect, useRef, useState } from 'react';
import httpRequest from '~/utils/httprequest';
import Loadding from '~/Components/Loadding';
import ReactPaginate from 'react-paginate';
import BillItem from '../BillItem/BillItem';

const cx = classNames.bind(styles);

function DeliveredBills() {
    const [AllDeliveredBills, setAllDeliveredBills] = useState([]);
    const [DeliveredBillsPage, setDeliveredBillsPage] = useState([]);
    const soLuongItemTrenTrang = 10;
    const [loading, setLoading] = useState(true);
    const pageLoad = useRef(1);
    let isFirst = useRef(true);

    const getdata = async () => {
        await httpRequest.get('bills/deliveredBills').then((res) => setAllDeliveredBills(res.data));
        await httpRequest.get('bills/deliveredBills?page=1').then((res) => setDeliveredBillsPage(res.data));
        setLoading(false);
    };

    const callbackFunction = (childData) => {
        isFirst.current = true;
        setDeliveredBillsPage(childData);
    };
    const handlePageClick = async (event) => {
        let page = event.selected + 1;
        pageLoad.current = page;

        window.scrollTo(0, 0);
        await httpRequest
            .get(`bills/deliveredBills?page=${page}`)
            .then((response) => setDeliveredBillsPage(response.data));
    };
    useEffect(() => {
        if (isFirst.current) {
            window.scrollTo(0, 0);
            getdata();
            isFirst.current = false;
        }
    }, [DeliveredBillsPage]);

    if (loading) {
        return <Loadding />;
    } else {
        return (
            <div className={cx('deliveredBills-wrapper')}>
                <div className={cx('deliveredBills-content')}>
                    {DeliveredBillsPage.map((bill, index) => (
                        <BillItem
                            key={index}
                            data={bill}
                            callback={callbackFunction}
                            calldata="/bills/deliveredBills"
                            pageLoad={pageLoad.current}
                            done
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
                    pageCount={AllDeliveredBills.length / soLuongItemTrenTrang}
                    pageRangeDisplayed={2}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        );
    }
}

export default DeliveredBills;

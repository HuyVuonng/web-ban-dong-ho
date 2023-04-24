import classNames from 'classnames/bind';
import styles from './PhanLoai.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import httpRequest from '~/utils/httprequest';
import ProductItem from '~/Components/ProductItem/ProductItem';
import { useSearchParams } from 'react-router-dom';
import Loadding from '~/Components/Loadding/Loadding';
const cx = classNames.bind(styles);

function PhanLoai() {
    const params = useParams();
    const [ALLproducts, setALLProducts] = useState([]);
    const [ProductInPagee, setProductInPagee] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams({});
    const [loading, setLoading] = useState(true);
    const gt = params.gt === 'donghonam' ? 'nam' : 'nu';
    const soLuongItemTrenTrang = 10;
    let currentPage = searchParams.get('page');

    const getProducts = async () => {
        await httpRequest.get(`/products/gioitinh/${gt}`).then((response) => setALLProducts(response.data));
        await httpRequest
            .get(`/products/gioitinh/${gt}?page=${currentPage}`)
            .then((response) => setProductInPagee(response.data));
        setLoading(false);
    };
    useEffect(() => {
        params.gt === 'donghonam' ? (document.title = 'Đồng hồ nam') : (document.title = 'Đồng hồ nữ');
        window.scrollTo(0, 0);
        getProducts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const handlePageClick = async (event) => {
        let page = event.selected + 1;
        setSearchParams({ page });
    };

    if (loading) {
        return <Loadding />;
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    {ProductInPagee.map((product) => (
                        <ProductItem key={product._id} data={product} />
                    ))}
                </div>
                <ReactPaginate
                    className={cx('phantrang')}
                    pageClassName={cx('phantrang-page')}
                    activeClassName={cx('phantrang-PageActive')}
                    pageLinkClassName={cx('phantrang-PageLink')}
                    marginPagesDisplayed={1}
                    forcePage={+currentPage - 1}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageCount={ALLproducts.length / soLuongItemTrenTrang}
                    pageRangeDisplayed={2}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        );
    }
}

export default PhanLoai;

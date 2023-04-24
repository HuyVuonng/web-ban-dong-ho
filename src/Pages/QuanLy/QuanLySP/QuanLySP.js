import classNames from 'classnames/bind';
import styles from './QuanLySP.module.scss';
import { useEffect, useRef, useState } from 'react';
import httpRequest from '~/utils/httprequest';
import ProductItemQL from './ProductItemQL/ProductItemQL';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function QuanLySP() {
    const [productsList, setProductsList] = useState([]);
    const [ProductInPagee, setProductInPagee] = useState([]);
    let idSetTimeout = useRef('');
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(true);
    const soLuongItemTrenTrang = 10;

    const getALLProducts = async () => {
        await httpRequest.get('/products').then((res) => setProductsList(res.data));
        await httpRequest.get(`/products?page=1`).then((response) => setProductInPagee(response.data));
        setLoading(false);
    };

    useEffect(() => {
        const getProductSearch = async () => {
            await httpRequest
                .get('products/search', {
                    params: {
                        q: searchValue,
                    },
                })
                .then((response) => setProductInPagee(response.data));
        };

        if (!searchValue.trim()) {
            getALLProducts();
        } else {
            idSetTimeout.current = setTimeout(() => {
                getProductSearch();
            }, 800);
        }
        return () => clearTimeout(idSetTimeout.current);
    }, [searchValue]);

    const handlePageClick = async (event) => {
        let page = event.selected + 1;
        window.scrollTo(0, 0);
        await httpRequest.get(`/products?page=${page}`).then((response) => setProductInPagee(response.data));
    };

    if (loading) {
        return <div>Loadding...</div>;
    } else {
        return (
            <>
                <Link to={'/quanly/products/trash'}>Thùng rác</Link>
                <input
                    className={cx('search-qlSP')}
                    type="text"
                    placeholder="Tìm kiếm......."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <div className={cx('list-products')}>
                    {ProductInPagee.map((result, index) => (
                        <ProductItemQL key={index} data={result} />
                    ))}
                </div>
                <ReactPaginate
                    className={cx('phantrang')}
                    pageClassName={cx('phantrang-page')}
                    activeClassName={cx('phantrang-PageActive')}
                    pageLinkClassName={cx('phantrang-PageLink')}
                    marginPagesDisplayed={1}
                    initialPage={0}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageCount={productsList.length / soLuongItemTrenTrang}
                    pageRangeDisplayed={2}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </>
        );
    }
}

export default QuanLySP;

import classNames from 'classnames/bind';
import styles from './ThungRac.module.scss';
import { useEffect, useRef, useState } from 'react';
import httpRequest from '~/utils/httprequest';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import ProductItemDeleted from './ProductItemDeleted';

const cx = classNames.bind(styles);
function ThungRac() {
    const [products, setProducts] = useState([]);
    const [ProductInPagee, setProductInPagee] = useState([]);
    let idSetTimeout = useRef('');
    const [searchValue, setSearchValue] = useState('');
    const soLuongItemTrenTrang = 10;
    const getTrashProducts = async () => {
        await httpRequest.get('/products/trash').then((res) => setProducts(res.data));

        await httpRequest.get('/products/trash?page=1').then((res) => setProductInPagee(res.data));
    };
    useEffect(() => {
        document.title = 'Thùng rác';
    }, []);

    useEffect(() => {
        const getProductSearch = async () => {
            await httpRequest
                .get('products/searchTrash', {
                    params: {
                        q: searchValue,
                    },
                })
                .then((response) => setProductInPagee(response.data));
        };

        if (!searchValue.trim()) {
            getTrashProducts();
        } else {
            idSetTimeout.current = setTimeout(() => {
                getProductSearch();
            }, 800);
        }
        return () => clearTimeout(idSetTimeout.current);
    }, [searchValue]);

    const handlePageClick = async (event) => {
        let page = event.selected + 1;
        await httpRequest.get(`/products/trash?page=${page}`).then((response) => setProductInPagee(response.data));
    };

    return (
        <>
            <Link to={`/quanly`}>Quay lại</Link>
            {products.length > 0 ? (
                <>
                    <input
                        className={cx('search-qlSP')}
                        type="text"
                        placeholder="Tìm kiếm......."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <div className={cx('list-products')}>
                        {ProductInPagee.map((result, index) => (
                            <ProductItemDeleted key={index} data={result} />
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
                        pageCount={products.length / soLuongItemTrenTrang}
                        pageRangeDisplayed={2}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                    />
                </>
            ) : (
                <img
                    className={cx('text-trong', 'text-center')}
                    src="https://www.sketchappsources.com/resources/source-image/microsoft-outlook-empty-state-trash-icon.png"
                    alt="empty state trash icon"
                />
            )}
        </>
    );
}

export default ThungRac;

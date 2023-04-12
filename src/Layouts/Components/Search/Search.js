import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { useDebounce } from '~/hooks';
import httpRequest from '~/utils/httprequest';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResults, setShowResults] = useState(true);

    const debounceValue = useDebounce(searchValue, 800);
    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
            return;
        }
        // encodeURIComponent(searchValue) de tranh ky tu dac biet
        const fetchAPI = async () => {
            const result = await httpRequest.get('products/search', {
                params: {
                    q: debounceValue,
                },
            });
            setSearchResult(result.data);
        };

        fetchAPI();
    }, [debounceValue]);

    const handleChange = (e) => {
        const searchValue = e.target.value;
        // Khong cho nhap dau cach dau tien trong o tim kiem
        if (!searchValue.startsWith(' ') || searchValue.trim()) {
            setSearchValue(searchValue);
        }
    };
    const handleHideResults = () => {
        setShowResults(false);
    };
    return (
        <HeadlessTippy
            interactive
            offset={[-15, 6]}
            visible={showResults && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <h4 className={cx('search-title')}>Search</h4>

                    {searchResult.map((product) => {
                        let price = Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(product.price);
                        return (
                            <Link to={`/productDetails/${product._id}`} className={cx('SearchproductDetails_link')}>
                                <div className={cx('search-item')}>
                                    <img src={product.img} alt="" />
                                    <div className={cx('prod-info')}>
                                        <span className={cx('name')}>{product.name}</span>
                                        <span className={cx('price')}>{price}</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
            onClickOutside={handleHideResults}
        >
            <div className={cx('header-search')}>
                <input
                    type="text"
                    className={cx('search')}
                    placeholder="Tìm kiếm..."
                    value={searchValue}
                    onFocus={() => setShowResults(true)}
                    onChange={handleChange}
                />

                <button className={cx('header_search-btn')}>
                    <FontAwesomeIcon icon={faSearch} className={cx('header_search-btn-icon')} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;

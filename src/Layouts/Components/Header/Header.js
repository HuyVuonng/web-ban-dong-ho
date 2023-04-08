import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLocationDot, faPhone, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    let mount = useRef(true);
    useEffect(() => {
        if (mount.current) {
            const nav = document.querySelector(`.${cx('nav2')}`);
            console.log(nav);
            window.addEventListener('scroll', () => {
                var y = document.documentElement.scrollTop;
                if (y > 174) {
                    nav.classList.add(`${cx('sticky')}`);
                } else {
                    nav.classList.remove(`${cx('sticky')}`);
                }
            });
            mount.current = false;
            return () =>
                window.removeEventListener('scroll', () => {
                    var y = document.documentElement.scrollTop;
                    if (y > 174) {
                        nav.classList.add(`${cx('sticky')}`);
                    } else {
                        nav.classList.remove(`${cx('sticky')}`);
                    }
                });
        }
    }, []);
    return (
        <header className={cx('header')}>
            <div className={cx('wrapper-header')}>
                <nav className={cx('header-nav')}>
                    <ul className={cx('header-nav-list')}>
                        <li className={cx('header-nav-list-item')}>
                            <FontAwesomeIcon icon={faLocationDot} /> 319 - C16 Lý Thường Kiệt, P.15, Q.11, Tp.HCM
                        </li>
                        <li className={cx('header-nav-list-item')}>
                            <FontAwesomeIcon icon={faPhone} className={cx('telephone-icon')} />
                            <Link to="tel:076 922 0162" className={cx('telephone')}>
                                076 922 0162
                            </Link>
                        </li>
                    </ul>

                    <ul className={cx('header-nav-list')}>
                        <li className={cx('header-nav-list-item')}>
                            <Link to="/" className={cx('social')}>
                                <FontAwesomeIcon icon={faFacebook} />
                            </Link>
                        </li>
                        <li className={cx('header-nav-list-item')}>
                            <Link to="/" className={cx('social')}>
                                <FontAwesomeIcon icon={faInstagram} />
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className={cx('header-with-search')}>
                    <div className={cx('header-logo')}>
                        <Link to="/" className={cx('header-logo-link')}>
                            <img
                                src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/logo-mona-2.png"
                                alt=""
                                className={cx('header-logo-img')}
                            />
                        </Link>
                    </div>
                    <div className={cx('header-search')}>
                        <input type="text" className={cx('search')} placeholder="Tìm kiếm..." />
                        <button className={cx('header_search-btn')}>
                            <FontAwesomeIcon icon={faSearch} className={cx('header_search-btn-icon')} />
                        </button>
                    </div>
                    <div className={cx('header_action')}>
                        <div className={cx('heart')}>
                            <Link to="/" className={cx('heart-item')}>
                                <FontAwesomeIcon icon={faHeart} className={cx('heart-icon')} />
                            </Link>
                        </div>
                        <Link to="/cart" className={cx('cart-item')}>
                            <div className={cx('cart')}>
                                <FontAwesomeIcon icon={faShoppingCart} className={cx('cart-icon')} />

                                <div className={cx('cart-info')}>
                                    <span className={cx('cart-title')}>Chưa có sản phẩm trong giỏ hàng </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <nav className={cx('nav2')}>
                    <ul className={cx('nav2-list')}>
                        <li className={cx('nav2-list-item')}>
                            <Link to="/#">TRANG CHỦ</Link>
                        </li>
                        <li className={cx('nav2-list-item')}>
                            <Link to="/">GIỚI THIỆU</Link>
                        </li>
                        <li className={cx('nav2-list-item')}>
                            <Link to="/">ĐỒNG HỒ NAM</Link>
                        </li>
                        <li className={cx('nav2-list-item')}>
                            <Link to="/">ĐỒNG HỒ NỮ</Link>
                        </li>
                        <li className={cx('nav2-list-item')}>
                            <Link to="/">BLOGS</Link>
                        </li>
                        <li className={cx('nav2-list-item')}>
                            <Link to="/">LIÊN HỆ</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;

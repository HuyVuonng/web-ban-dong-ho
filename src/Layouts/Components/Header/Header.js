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
                            <a href="tel:076 922 0162" className={cx('telephone')}>
                                076 922 0162
                            </a>
                        </li>
                    </ul>

                    <ul className={cx('header-nav-list')}>
                        <li className={cx('header-nav-list-item')}>
                            <a href="/" className={cx('social')}>
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </li>
                        <li className={cx('header-nav-list-item')}>
                            <a href="/" className={cx('social')}>
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
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
                            <a href="/" className={cx('heart-item')}>
                                <FontAwesomeIcon icon={faHeart} className={cx('heart-icon')} />
                            </a>
                        </div>

                        <div className={cx('cart')}>
                            <Link to="/cart" className={cx('cart-item')}>
                                <FontAwesomeIcon icon={faShoppingCart} className={cx('cart-icon')} />
                            </Link>
                            <div className={cx('cart-info')}>
                                <span className={cx('cart-title')}>Chưa có sản phẩm trong giỏ hàng </span>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className={cx('nav2')}>
                    <ul className={cx('nav2-list')}>
                        <li className={cx('nav2-list-item')}>
                            <a href="/#">TRANG CHỦ</a>
                        </li>
                        <li className={cx('nav2-list-item')}>
                            <a href="/">GIỚI THIỆU</a>
                        </li>
                        <li className={cx('nav2-list-item')}>
                            <a href="/">ĐỒNG HỒ NAM</a>
                        </li>
                        <li className={cx('nav2-list-item')}>
                            <a href="/">ĐỒNG HỒ NỮ</a>
                        </li>
                        <li className={cx('nav2-list-item')}>
                            <a href="/">BLOGS</a>
                        </li>
                        <li className={cx('nav2-list-item')}>
                            <a href="/">LIÊN HỆ</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;

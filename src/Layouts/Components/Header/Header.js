import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from './logo-mona-2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHeart, faLocationDot, faPhone, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';

const cx = classNames.bind(styles);

function Header() {
    let mount = useRef(true);
    useEffect(() => {
        if (mount.current) {
            const nav = document.querySelector(`.${cx('nav2')}`);
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

    function show() {
        const modalMobile = document.getElementById('modal-mobile');
        modalMobile.classList.add(`${cx('open')}`);
    }

    function close() {
        const modalMobile = document.getElementById('modal-mobile');
        modalMobile.classList.remove(`${cx('open')}`);
    }

    return (
        <>
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
                                <img src={logo} alt="logo" className={cx('header-logo-img')} />
                            </Link>
                        </div>

                        {/* search */}

                        <Search />

                        <div className={cx('header_action')}>
                            <div className={cx('heart')}>
                                <Link to="/" className={cx('heart-item')}>
                                    <FontAwesomeIcon icon={faHeart} className={cx('heart-icon')} />
                                </Link>
                            </div>
                            <Link to="/cart" className={cx('cart-item')}>
                                <div className={cx('cart')}>
                                    <FontAwesomeIcon icon={faShoppingCart} className={cx('cart-icon')} />

                                    {/* <div className={cx('cart-info')}>
                                        <span className={cx('cart-title')}>Chưa có sản phẩm trong giỏ hàng </span>
                                    </div> */}
                                </div>
                            </Link>
                        </div>
                    </div>
                    <nav className={cx('nav2')}>
                        <ul className={cx('nav2-list')}>
                            <li className={cx('nav2-list-item')}>
                                <Link to="/">TRANG CHỦ</Link>
                            </li>
                            <li className={cx('nav2-list-item')}>
                                <Link to="/">GIỚI THIỆU</Link>
                            </li>
                            <li className={cx('nav2-list-item')}>
                                <Link to="/phanloai/donghonam?page=1">ĐỒNG HỒ NAM</Link>
                            </li>
                            <li className={cx('nav2-list-item')}>
                                <Link to="/phanloai/donghonu?page=1">ĐỒNG HỒ NỮ</Link>
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

            {/* header mobile */}
            <header className={cx('header-mobile')}>
                <div className={cx('header-mobi-nav')}>
                    <div className={cx('header-mobi-menu-item')} id="header-mobi-menu-item" onClick={show}>
                        {/* <i className={cx('header-mobi-menu-icon fas fa-bars')}></i> */}
                        <FontAwesomeIcon icon={faBars} className={cx('header-mobi-menu-icon')} />
                    </div>
                    <div className={cx('mobi-logo')}>
                        <Link to="/" className={cx('header-logo-link')}>
                            <img src={logo} alt="logo" className={cx('mobi-logo-img')} />
                        </Link>
                    </div>
                    <div className={cx('cart')}>
                        <Link to="/cart" className={cx('cart-item')}>
                            <FontAwesomeIcon icon={faShoppingCart} className={cx('cart-icon')} />
                        </Link>
                    </div>
                </div>
            </header>

            {/* modal mobile */}
            <div className={cx('modal-mobile')} id="modal-mobile">
                <div className={cx('modal-overlay')} id="modal-overlay" onClick={close}></div>
                <div className={cx('modal-body')}>
                    {/* <i className={cx('close-icon fas fa-times')} id="close-icon" onClick={close}></i> */}
                    <FontAwesomeIcon icon={faTimes} className={cx('close-icon')} id="close-icon" onClick={close} />
                    <ul className={cx('nav2-list-mobile')}>
                        <li className={cx('nav2-list-item-mobile')} onClick={close}>
                            <Link to="/">TRANG CHỦ</Link>
                        </li>
                        <li className={cx('nav2-list-item-mobile')} onClick={close}>
                            <Link to="/">GIỚI THIỆU</Link>
                        </li>
                        <li className={cx('nav2-list-item-mobile')} onClick={close}>
                            <Link to="/donghonam?page=1">ĐỒNG HỒ NAM</Link>
                        </li>
                        <li className={cx('nav2-list-item-mobile')} onClick={close}>
                            <Link to="/donghonu?page=1">ĐỒNG HỒ NỮ</Link>
                        </li>
                        <li className={cx('nav2-list-item-mobile')} onClick={close}>
                            <Link to="/">BLOGS</Link>
                        </li>
                        <li className={cx('nav2-list-item-mobile')} onClick={close}>
                            <Link to="/">LIÊN HỆ</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Header;

import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faSkype } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('wrapper-footer')}>
                <div className={cx('row')}>
                    <div className={cx('row1')}>
                        <div className={cx('col', 'l-4')}>
                            <h3 className={cx('footer-title')}>THÔNG TIN LIÊN HỆ</h3>
                            <ul className={cx('fotter-list')}>
                                <li className={cx('list-item')}>
                                    <FontAwesomeIcon icon={faLocationDot} className={cx('item-location')} /> 319 C16 Lý
                                    Thường Kiệt, Phường 15, Quận 11, Tp.HCM
                                </li>
                                <li className={cx('list-item')}>
                                    <FontAwesomeIcon icon={faPhone} className={cx('telephone-icon1')} />
                                    <a href="tel:076 922 0162">076 922 0162</a>
                                </li>
                                <li className={cx('list-item')}>
                                    <span className={cx('email1')}>
                                        <FontAwesomeIcon icon={faEnvelope} className={cx('email-icon')} />
                                        <a href="mailto:demonhunterg@gmail.com">demonhunterg@gmail.com</a>
                                    </span>
                                </li>
                                <li className={cx('list-item')}>
                                    <span className={cx('email2')}>
                                        <a href="mailto:mon@mona.media">mon@mona.media</a>
                                    </span>
                                </li>
                                <li className={cx('list-item')}>
                                    <FontAwesomeIcon icon={faSkype} className={cx('skyper-icon')} />
                                    <a href="skype:demonhunterp"> demonhunterp</a>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('col', 'l-4')}>
                            <h3 className={cx('footer-title')}>Liên kết</h3>
                            <ul className={cx('fotter-list')}>
                                <li className={cx('list-item')}>
                                    <a href="/">Giới thiệu</a>
                                </li>
                                <li className={cx('list-item')}>
                                    <a href="/">Đồng hồ nam</a>
                                </li>
                                <li className={cx('list-item')}>
                                    <span className={cx('')}>
                                        <a href="/">Đồng hồ nữ</a>
                                    </span>
                                </li>
                                <li className={cx('list-item')}>
                                    <span className={cx('')}>
                                        <a href="/">Blogs</a>
                                    </span>
                                </li>
                                <li className={cx('list-item')}>
                                    <a href="/">Liên hệ</a>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('col', 'l-4')}>
                            <h3 className={cx('footer-title')}>HỖ TRỢ</h3>
                            <ul className={cx('fotter-list')}>
                                <li className={cx('list-item')}>
                                    <a href="/">Hướng dẫn mua hàng</a>
                                </li>
                                <li className={cx('list-item')}>
                                    <a href="/">Hướng dẫn thanh toán</a>
                                </li>
                                <li className={cx('list-item')}>
                                    <span className={cx('email1')}>
                                        <a href="/">Chính sách bảo hành</a>
                                    </span>
                                </li>
                                <li className={cx('list-item')}>
                                    <span className={cx('')}>
                                        <a href="/">Chính sách đổi trả</a>
                                    </span>
                                </li>
                                <li className={cx('list-item')}>
                                    <a href="/">Tư vấn khách hàng</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <span className={cx('copyright')}>Bản quyền thuộc về HV</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

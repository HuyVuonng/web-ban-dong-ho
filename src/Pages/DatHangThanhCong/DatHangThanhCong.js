import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './DatHangThanhCong.module.scss';

const cx = classNames.bind(styles);
function DatHangThanhCong() {
    return (
        <div className={cx('wrapper')}>
            <img src="https://mynghedongdo.vn/uploaded/images/thankyou.jpg" alt="Đặt hàng thành công" />
            <Link to="/">Quay lại trang chủ</Link>
        </div>
    );
}

export default DatHangThanhCong;

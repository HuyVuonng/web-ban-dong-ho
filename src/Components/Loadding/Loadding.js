import classNames from 'classnames/bind';
import styles from './Loadding.module.scss';

const cx = classNames.bind(styles);
function Loadding() {
    return (
        <div className={cx('loading')}>
            <div className={cx('lds-dual-ring')}></div>
        </div>
    );
}

export default Loadding;

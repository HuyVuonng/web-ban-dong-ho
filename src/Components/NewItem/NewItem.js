import classNames from 'classnames/bind';
import styles from './NewItem.module.scss';

const cx = classNames.bind(styles);

function NewItem() {
    return (
        <div className={cx('NewItem-wrapper')}>
            <div className={cx('news')}>
                <div className={cx('news-img-transition')}>
                    <img
                        src="https://web-ban-dong-ho-be.onrender.com/img/new-4.jpg"
                        alt=""
                        className={cx('news-img')}
                    />
                </div>
                <div className={cx('news-nd')}>
                    <h3 className={cx('news-heading')}>Chiếc đồng hồ của những CEO quyền lực nhất thế giới</h3>
                    <span className={cx('new-comment')}>
                        Đối với một số doanh nhân, một chiếc đồng hồ đeo tay không chỉ là ...
                    </span>
                </div>
            </div>
        </div>
    );
}

export default NewItem;

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper-homepage')}>
            <div>Home Page</div>
        </div>
    );
}

export default Home;

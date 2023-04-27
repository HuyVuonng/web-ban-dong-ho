import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className="wrapper">
            <Header />
            <main className={cx('container')}>
                <div className="content">{children}</div>
            </main>
            <Footer />
        </div>
    );
}

export default DefaultLayout;

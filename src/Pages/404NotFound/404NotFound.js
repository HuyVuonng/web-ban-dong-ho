import classNames from 'classnames/bind';
import styles from './404NotFound.module.scss';
import PageNoteFoundIMG from './PageNotFound.jpg';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
function PageNotFound() {
    useEffect(() => {
        document.title = 'Page not found';
    }, []);
    return (
        <div className={cx('page-not-found-wrapper')}>
            <img src={PageNoteFoundIMG} alt="Page Not Found" />
        </div>
    );
}

export default PageNotFound;

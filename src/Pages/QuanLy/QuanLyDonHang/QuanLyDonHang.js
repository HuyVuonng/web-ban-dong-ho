import classNames from 'classnames/bind';
import styles from './QuanLyDonHang.module.scss';
import NewBill from './NewBill';
import DeliveringBills from './DeliveringBills';
import DeliveredBills from './DeliveredBills';
import { useState } from 'react';

const cx = classNames.bind(styles);

function QuanLyDonHang() {
    const [Page, setPage] = useState(<NewBill />);
    const changeQLHD = (e) => {
        const btn = document.querySelectorAll(`.${cx('QLDH-button-nav')}`);
        for (let i = 0; i < btn.length; i++) {
            btn[i].classList.remove(`${cx('active')}`);
        }
        e.target.classList.add(`${cx('active')}`);

        switch (e.target.innerText) {
            case 'Mới':
                setPage(<NewBill />);
                break;
            case 'Đang giao':
                setPage(<DeliveringBills />);
                break;
            case 'Đã giao':
                setPage(<DeliveredBills />);
                break;
            default:
                break;
        }
    };
    return (
        <div className={cx('QLDH-wrapper')}>
            <nav className={cx('QLDH-nav')}>
                <button className={cx('QLDH-button-nav', 'active')} onClick={changeQLHD}>
                    Mới
                </button>
                <button className={cx('QLDH-button-nav')} onClick={changeQLHD}>
                    Đang giao
                </button>
                <button className={cx('QLDH-button-nav')} onClick={changeQLHD}>
                    Đã giao
                </button>
            </nav>
            <div className={cx('QLDH-content')}>{Page}</div>
        </div>
    );
}

export default QuanLyDonHang;

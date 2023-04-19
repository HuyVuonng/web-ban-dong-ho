import classNames from 'classnames/bind';
import styles from './QuanLy.module.scss';
import { useEffect, useState } from 'react';
import ProductCreateUpdate from '../ProductCreateUpdate';
import QuanLySP from './QuanLySP';
import QuanLyTK from './QuanLyTK';

const cx = classNames.bind(styles);
function QuanLy() {
    const [Page, setPage] = useState(<QuanLySP />);
    useEffect(() => {
        document.title = 'Quản lý';
    }, []);
    // let page = <ProductCreate />;

    // const fetchdata = async () => {
    //     const res = await httpRequest.get('products/bestseller');
    //     const newproducts = await httpRequest.get('products/newproducts');
    //     setNewProduct(newproducts.data);
    //     setBestseller(res.data);
    //     setloading(false);
    // };
    // useEffect(() => {
    //     if (load.current) {
    //         fetchdata();
    //         load.current = false;
    //     }
    // }, []);

    const changeLableproc = (e) => {
        const lable = document.querySelectorAll(`.${cx('lable')}`);
        for (let i = 0; i < lable.length; i++) {
            lable[i].classList.remove(`${cx('active')}`);
        }
        e.target.classList.add(`${cx('active')}`);

        switch (e.target.innerText) {
            case 'Quản Lý Sản Phẩm':
                setPage(<QuanLySP />);
                break;
            case 'Quản Lý Tài Khoản':
                setPage(<QuanLyTK />);
                break;
            case 'Thêm sản phẩm':
                setPage(<ProductCreateUpdate />);
                break;
            default:
                break;
        }
    };

    return (
        <div className={cx('wrapper-homepage')}>
            <div className={cx('lable-products')}>
                <h2 className={cx('lable', 'active')} onClick={changeLableproc}>
                    Quản Lý Sản Phẩm
                </h2>
                <h2 className={cx('lable')} onClick={changeLableproc}>
                    Quản Lý Tài Khoản
                </h2>
                <h2 className={cx('lable')} onClick={changeLableproc}>
                    Thêm sản phẩm
                </h2>
            </div>
            {Page}
        </div>
    );
}

export default QuanLy;

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import httpRequest from '~/utils/httprequest';
import classNames from 'classnames/bind';
import styles from './ProductCreateUpdate.module.scss';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { imgToDb } from '~/utils/firebase';
import Loadding from '~/Components/Loadding';
const cx = classNames.bind(styles);

function ProductCreateUpdate() {
    let productID = useParams();
    const [title, setTitle] = useState('Thêm sản phẩm');
    const [prevIMG, setPrevIMG] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({});
    const refForm = useRef();
    const navigate = useNavigate();
    useEffect(() => {
        if (productID.id) {
            window.scrollTo(0, 0);
            httpRequest
                .get('/products', {
                    params: {
                        id: productID.id,
                    },
                })
                .then((res) => setProduct(res.data));

            setTitle('Sửa sản phẩm');
            setTimeout(() => {
                refForm.current.classList.add(`${cx('form-wrapper-responsive')}`);
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => {
            prevIMG && URL.revokeObjectURL(prevIMG.preview);
        };
    }, [prevIMG]);

    const checkFile = (e) => {
        const ipf = document.querySelector('#img');
        const imglink = {};
        if (e.target.value.trim().length > 0) {
            ipf.setAttribute('disabled', true);
            imglink.preview = e.target.value;
            setPrevIMG(imglink);
        } else {
            ipf.removeAttribute('disabled');
            setPrevIMG();
        }
    };

    const handlePrevIMG = (e) => {
        const ipurl = document.querySelector('#img2');
        if (e.target.files[0]) {
            ipurl.setAttribute('disabled', true);
            const file = e.target.files[0];
            file.preview = URL.createObjectURL(file);
            setPrevIMG(file);
        } else {
            ipurl.removeAttribute('disabled');
            setPrevIMG();
            URL.revokeObjectURL(prevIMG.preview);
        }
    };

    const xoaKhoangTrang = () => {
        const inputs = document.querySelectorAll('input:not([type="file"])');
        document.querySelector('#decription').value = document.querySelector('#decription').value.trim();
        for (const input of inputs) {
            input.value = input.value?.trim();
        }
    };
    const resetForm = () => {
        document.querySelector('#img').removeAttribute('disabled');
        document.querySelector('#img2').removeAttribute('disabled');
        setPrevIMG();
        document.querySelector('form').reset();
    };
    const handelSaveData = () => {
        xoaKhoangTrang();
        setIsLoading(true);
        const name = document.querySelector('#name').value;
        const GioiTinh = document.querySelector('#GioiTinh').value;
        const price = document.querySelector('#price').value;
        const ThuongHieu = document.querySelector('#ThuongHieu').value;
        const Decription = document.querySelector('#decription').value;
        const SoLuong = document.querySelector('#SoLuong').value;
        const img = document.querySelector('#img').files[0];
        const img2 = document.querySelector('#img2').value;
        const imgRef = ref(imgToDb, `images/${new Date().getTime()}`);
        if (img) {
            uploadBytes(imgRef, img).then((res) => {
                getDownloadURL(res.ref).then((url) => {
                    const data = {
                        name,
                        GioiTinh,
                        price,
                        ThuongHieu,
                        Decription,
                        SoLuong,
                        img: url,
                    };
                    if (!productID.id) {
                        httpRequest.post('products/create', data).then((response) => {
                            setIsLoading(false);
                            navigate('/quanly');
                            resetForm();
                        });
                    } else {
                        httpRequest.put(`products/${productID.id}/edit`, data).then((response) => {
                            setIsLoading(false);
                            navigate('/quanly');
                        });
                    }
                });
            });
        } else {
            const data = {
                name,
                GioiTinh,
                price,
                ThuongHieu,
                Decription,
                SoLuong,
                img: img2 || product.img,
            };
            if (!productID.id) {
                httpRequest.post('products/create', data).then((response) => {
                    setIsLoading(false);
                    navigate('/quanly');
                    resetForm();
                });
            } else {
                httpRequest.put(`products/${productID.id}/edit`, data).then((response) => {
                    setIsLoading(false);
                    navigate('/quanly');
                });
            }
        }
    };

    return (
        <div ref={refForm} className={cx('wraper-form')}>
            {isLoading && <Loadding />}
            <h1 className="text-[36px]">{title}</h1>
            {(() => {
                if (product.GioiTinh) {
                    const select = document.querySelector('#GioiTinh');

                    for (let i = 0; i < select.options.length; i++) {
                        if (select.options[i].value === product.GioiTinh) {
                            select.options[i].setAttribute('selected', 'selected');
                        }
                    }
                }
            })()}
            <form
                id="form"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="mb-3 mt-4">
                    <label htmlFor="name" className="form-label">
                        Tên đồng hồ
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        required
                        onInvalid={(e) => e.target.setCustomValidity('Hãy nhập tên sản phẩm')}
                        onInput={(e) => e.target.setCustomValidity('')}
                        defaultValue={product.name || ''}
                    />
                </div>

                <div className="mb-3 mt-4">
                    <label htmlFor="GioiTinh" className="form-label">
                        Giới tính
                    </label>
                    <select name="GioiTinh" className="form-control" id="GioiTinh">
                        <option value="nam">Nam</option>
                        <option value="nu">Nữ</option>
                    </select>
                </div>

                <div className="mb-3 mt-4">
                    <label htmlFor="price" className="form-label">
                        Giá bán
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        required
                        onInvalid={(e) => e.target.setCustomValidity('Giá bán sản phẩm phải là dạng số')}
                        onInput={(e) => e.target.setCustomValidity('')}
                        defaultValue={product.price || ''}
                    />
                </div>

                <div className="mb-3 mt-4">
                    <label htmlFor="ThuongHieu" className="form-label">
                        Thương hiệu
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="ThuongHieu"
                        name="ThuongHieu"
                        required
                        onInvalid={(e) => e.target.setCustomValidity('Hãy nhập tên thương hiệu')}
                        onInput={(e) => e.target.setCustomValidity('')}
                        defaultValue={product.ThuongHieu || ''}
                    />
                </div>

                <div className="mb-3 mt-4">
                    <label htmlFor="decription" className="form-label">
                        Mô tả
                    </label>
                    <textarea
                        style={{ display: 'none' }}
                        className="form-control"
                        id="decription"
                        name="Decription"
                        rows="6"
                        required
                        onInvalid={(e) => e.target.setCustomValidity('Hãy nhập mô tả')}
                        onInput={(e) => e.target.setCustomValidity('')}
                        defaultValue={product.Decription || ''}
                    ></textarea>
                    <CKEditor
                        editor={ClassicEditor}
                        data={product.Decription || ''}
                        onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            editor.editing.view.change((writer) => {
                                writer.setStyle('height', '200px', editor.editing.view.document.getRoot());
                            });
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            document.querySelector('#decription').value = data;
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    ></CKEditor>
                </div>

                <div className="mb-3 mt-4">
                    <label htmlFor="SoLuong" className="form-label">
                        Số lượng
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="SoLuong"
                        name="SoLuong"
                        required
                        onInvalid={(e) => e.target.setCustomValidity('Hãy nhập số lượng sản phẩm')}
                        onInput={(e) => e.target.setCustomValidity('')}
                        defaultValue={product.SoLuong || ''}
                    />
                </div>

                <div className="mb-3 mt-4">
                    <label htmlFor="img" className="form-label">
                        Tải ảnh lên
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="img"
                        name="img"
                        required={!product.img}
                        onChange={handlePrevIMG}
                    />
                    <label htmlFor="img" className="form-label">
                        hoặc link ảnh
                    </label>
                    <input
                        type="url"
                        className="form-control mb-3"
                        id="img2"
                        name="img"
                        required={!product.img}
                        onChange={checkFile}
                    />
                    {/* cach1 dung if else */}
                    {/* {(() => {
                        if (product.img && !prevIMG) {
                            return <img src={product.img} alt="" width="20%" />;
                        } else if (prevIMG) {
                            return <img src={prevIMG.preview} alt="" width="20%" />;
                        }
                    })()} */}
                    {/* cach2 */}
                    {product.img && !prevIMG && <img src={product.img} alt="" width="20%" />}

                    {prevIMG && <img src={prevIMG.preview} alt="" width="20%" />}
                </div>

                <button className="mb-5 btn btn-primary" onClick={handelSaveData}>
                    {productID.id ? 'Cập nhật' : 'Thêm sản phẩm'}
                </button>
            </form>
        </div>
    );
}

export default ProductCreateUpdate;

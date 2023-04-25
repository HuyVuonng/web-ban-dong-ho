import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import httpRequest from '~/utils/httprequest';
function ProductCreateUpdate() {
    let productID = useParams();
    const [title, setTitle] = useState('Thêm sản phẩm');
    const [prevIMG, setPrevIMG] = useState();
    const [product, setProduct] = useState({});
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => {
            prevIMG && URL.revokeObjectURL(prevIMG.preview);
        };
    }, [prevIMG]);

    const handlePrevIMG = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            file.preview = URL.createObjectURL(file);
            setPrevIMG(file);
        }
    };

    const xoaKhoangTrang = () => {
        const inputs = document.querySelectorAll('input');
        document.querySelector('#decription').value = document.querySelector('#decription').value.trim();
        for (const input of inputs) {
            input.value = input.value.trim();
        }
    };

    return (
        <>
            <h1>{title}</h1>
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
                method="post"
                action={
                    !productID.id
                        ? 'http://localhost:3000/products/create'
                        : `http://localhost:3000/products/${productID.id}/edit?_method=PUT`
                }
                encType="multipart/form-data"
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
                        className="form-control"
                        id="decription"
                        name="Decription"
                        rows="6"
                        required
                        onInvalid={(e) => e.target.setCustomValidity('Hãy nhập mô tả')}
                        onInput={(e) => e.target.setCustomValidity('')}
                        defaultValue={product.Decription || ''}
                    ></textarea>
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
                        Link ảnh
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="img"
                        name="img"
                        required={!product.img}
                        onChange={handlePrevIMG}
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

                <button type="submit" className="mb-5 btn btn-primary" onClick={xoaKhoangTrang}>
                    {productID.id ? 'Cập nhật' : 'Thêm sản phẩm'}
                </button>
            </form>
        </>
    );
}

export default ProductCreateUpdate;

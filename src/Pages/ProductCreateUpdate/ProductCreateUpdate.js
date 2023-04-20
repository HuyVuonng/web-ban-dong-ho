import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import httpRequest from '~/utils/httprequest';
function ProductCreateUpdate() {
    let productID = useParams();
    const [title, setTitle] = useState('Thêm sản phẩm');
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
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
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
                        defaultValue={product.Decription || ''}
                    ></textarea>
                </div>

                <div className="mb-3 mt-4">
                    <label htmlFor="SoLuong" className="form-label">
                        Số lượng
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="SoLuong"
                        name="SoLuong"
                        defaultValue={product.SoLuong || ''}
                    />
                </div>

                <div className="mb-3 mt-4">
                    <label htmlFor="img" className="form-label">
                        Link ảnh
                    </label>
                    <input type="text" className="form-control" id="img" name="img" defaultValue={product.img || ''} />
                </div>

                <button type="submit" className="mb-5 btn btn-primary">
                    {productID.id ? 'Cập nhật' : 'Thêm sản phẩm'}
                </button>
            </form>
        </>
    );
}

export default ProductCreateUpdate;

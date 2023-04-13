function ProductCreate() {
    return (
        <form method="post" action="http://localhost:3000/products/create">
            <div class="mb-3 mt-4">
                <label for="name" class="form-label">
                    Tên đồng hồ
                </label>
                <input type="text" class="form-control" id="name" name="name" />
            </div>

            <div class="mb-3 mt-4">
                <label for="price" class="form-label">
                    Giá bán
                </label>
                <input type="text" class="form-control" id="price" name="price" />
            </div>

            <div class="mb-3 mt-4">
                <label for="ThuongHieu" class="form-label">
                    Thương hiệu
                </label>
                <input type="text" class="form-control" id="ThuongHieu" name="ThuongHieu" />
            </div>

            <div class="mb-3 mt-4">
                <label for="decription" class="form-label">
                    Mô tả
                </label>
                <input type="text" class="form-control" id="decription" name="Decription" />
            </div>

            <div class="mb-3 mt-4">
                <label for="SoLuong" class="form-label">
                    Số lượng
                </label>
                <input type="text" class="form-control" id="SoLuong" name="SoLuong" />
            </div>

            <div class="mb-3 mt-4">
                <label for="img" class="form-label">
                    Link ảnh
                </label>
                <input type="text" class="form-control" id="img" name="img" />
            </div>

            <button type="submit" class="mb-5 btn btn-primary">
                Thêm sản phẩm
            </button>
        </form>
    );
}

export default ProductCreate;

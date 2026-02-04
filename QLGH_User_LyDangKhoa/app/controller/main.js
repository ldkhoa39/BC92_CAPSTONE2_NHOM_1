import Api from '../services/api.js';
import Product from '../models/products.js';

const api = new Api();

let productList = []; // Mảng chứa danh sách sản phẩm gốc từ Server

// Tạo hàm async để lấy danh sách sản phẩm từ API
const getListProduct = async () => {
    try {
        // Hiện loader khi bắt đầu gọi API
        const loader = document.getElementById("loader");
        if(loader) loader.style.display = "flex"; 

        const result = await api.fetchProductsApi();
        productList = result.data;
        renderUI(productList);

    } catch (error) {
        console.log(error);
    } finally {
        // Luôn ẩn loader khi đã có kết quả (kể cả thành công hay thất bại)
        const loader = document.getElementById("loader");
        if(loader) loader.style.display = "none";
    }
};

// Render danh sách sản phẩm ngoài trang chủ
const renderUI = (data) => {
    let content = "";
    data.forEach((product, index) => {
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.id}</td>
                <td><strong>${product.name}</strong></td>
                <td>${parseInt(product.price).toLocaleString()}</td>
                <td>${product.screen}</td>
                <td>${product.frontCamera}</td>
                <td>${product.backCamera}</td>
                <td>
                    <img src="${product.img}" width="50" alt="${product.name}" />
                </td>
                <td>${product.desc}</td>
                <td>${product.type}</td>
                <td> 
                    <button class="btn btn-info btn-sm" onclick="addToCart('${product.id}')">Add to cart</button>
                </td>
            </tr>
        `;
    });
    document.getElementById("tblDanhSachSP").innerHTML = content;
};

// Lọc sản phẩm
window.filterProduct = () => {
    const type = document.getElementById("loaiSP").value;
    let filteredList = [];

    if (type === "all") {
        filteredList = productList;
    } else {
        filteredList = productList.filter((product) => {
            return product.type.toLowerCase() === type.toLowerCase();
        });
    }
    renderUI(filteredList);
};

// Gọi API lấy danh sách sản phẩm
getListProduct();

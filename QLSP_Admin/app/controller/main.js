import Api from '../services/api.js';
import Product from '../models/products.js';

const api = new Api();

const renderUI = (data) => {
    let content = "";

    data.forEach((product, index) => {
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.id}</td>
                <td><strong>${product.name}</strong></td>
                <td>${product.price}</td>
                <td>${product.screen}</td>
                <td>${product.frontCamera}</td>
                <td>${product.backCamera}</td>
                <td>
                    <img src="${product.img}" width="50" />
                </td>
                <td>${product.desc}</td>
                <td>${product.type}</td>
                <td> 
                    <button class="btn btn-danger btn-sm" onclick="handleDelete('${product.id}')">Delete</button>
                    <button class="btn btn-info btn-sm" onclick="handleEdit('${product.id}')">Edit</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("tblDanhSachSP").innerHTML = content;
};
const getListProducts = () =>{
    // request to server => get list products

    // pending: chờ(resquest to server--> gửi đi --> server ktra và trả phản hồi)
    // Mở loader
    // document.getElementById("loader").style.display = "block";

    const promise = api.fetchProductsApi();

    promise
        .then((result) => {
            console.log(result.data);
            renderUI(result.data);

            // tắt loader
            document.getElementById("loader").style.display = "none";
        })// thành công 

        .catch((error) =>{
            console.log(error);

            // tắt loader
            document.getElementById("loader").style.display = "none";
        })// thất bại
};

getListProducts();

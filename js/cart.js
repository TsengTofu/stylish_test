// 輸出購物車的內容
const orderContent = document.querySelector(".order_list_content");
const ordertContentUl = document.querySelector(".order_list_content ul");
// console.log(orderContent);



function renderCart() {
    var totalpayment = 0;
    //沒有買任何東西
    if (orderList.length === 0) {
        const nothing = document.createElement('div');
        nothing.className = "nothing";
        nothing.textContent = "購物車裡面沒有商品，請前往選購！";
        orderContent.appendChild(nothing);
    } else {
        let j = 0;
        orderList.forEach(orderItem => {
            const {
                id,
                mainImg,
                name,
                color,
                colorName,
                size,
                qty,
                price
            } = orderItem;

            // 這裡不能用innerHTML，因為會把內容物清空
            // create物件的最外層<li></li>，每個產品就是一個<li></li>
            const ordertContentLi = document.createElement('li');
            ordertContentLi.className = "clearfix";

            // 產品圖片
            // left圖片跟產品詳情
            const orderProductLeft = document.createElement('div');
            orderProductLeft.className = "order_left_content clearfix";

            const orderProductImg_left = document.createElement('div');
            orderProductImg_left.className = "image_left";
            // 圖片連結
            const orderProductImg = document.createElement('img');
            orderProductImg.src = `${mainImg}`;
            orderProductImg_left.appendChild(orderProductImg);
            orderProductLeft.appendChild(orderProductImg_left);
            // 外層
            ordertContentLi.appendChild(orderProductLeft);
            ordertContentUl.appendChild(ordertContentLi);
            orderContent.appendChild(ordertContentUl);

            // left圖片跟產品詳情的右半邊
            const orderProductRight = document.createElement('div');
            orderProductRight.className = "right_detail";
            orderProductRight.innerHTML = `<p>${name}</p><p>${id}</p><p>顏色｜${colorName}</p><p>尺寸｜${size}</p>`;
            orderProductLeft.appendChild(orderProductRight);

            // right
            const orderRightContent = document.createElement('div');
            orderRightContent.className = "order_right_content clearfix";
            ordertContentLi.appendChild(orderRightContent);

            // 計算數量
            const orderCount = document.createElement('div');
            orderCount.className = "order_count";
            const orderMbTitle = document.createElement('p');
            orderMbTitle.className = "mb_title";
            orderMbTitle.textContent = "數量";
            orderCount.appendChild(orderMbTitle);
            orderRightContent.appendChild(orderCount);

            const select = document.createElement('select');
            select.title = j;
            for (var i = 1; i < 11; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                if (i === parseInt(qty)) {
                    option.selected = "selected";
                }
                select.appendChild(option);
            }
            orderCount.appendChild(orderMbTitle);
            orderCount.appendChild(select);

            // right_price
            const orderPrice = document.createElement('div');
            orderPrice.className = "order_price";
            const orderMbTitle2 = document.createElement('p');
            orderMbTitle2.className = "mb_title";
            orderMbTitle2.textContent = "單價";

            orderPrice.appendChild(orderMbTitle2);
            orderRightContent.appendChild(orderPrice);

            const orderPriceNum = document.createElement('p');
            orderPriceNum.textContent = `NT.${price}`;
            orderPrice.appendChild(orderPriceNum);

            // right total single product
            const orderTotalSingle = document.createElement('div');
            orderTotalSingle.className = "order_total_price";
            const orderMbTitle3 = document.createElement('p');
            orderMbTitle3.className = "mb_title";
            orderMbTitle3.textContent = "小計";
            orderRightContent.appendChild(orderTotalSingle);
            orderTotalSingle.appendChild(orderMbTitle3);

            const orderTotalSingle_priceNum = document.createElement('p');
            orderTotalSingle_priceNum.textContent = `NT.${price * qty}`;
            orderTotalSingle.appendChild(orderTotalSingle_priceNum);

            // btn
            const orderDeleteBtn = document.createElement('div');
            orderDeleteBtn.className = "order_delete_btn";
            orderRightContent.appendChild(orderDeleteBtn);

            totalpayment = totalpayment + (qty * price);
        })
        deleteProduct();
        changeQuantity();

    }
    // 購物車目前商品項目 不是總數
    const cartCount = document.querySelector("#total_amount");
    cartCount.textContent = orderList.length;
    const total = document.querySelector("#total");
    const shippingPrice = document.querySelector("#ship_price");
    const sumPrice = document.querySelector("#payment_final");

    total.textContent = totalpayment;
    total.value = totalpayment;
    shippingPrice.value = 30;
    shippingPrice.textContent = shippingPrice.value;
    sumPrice.textContent = `${parseInt(totalpayment)+ parseInt(shippingPrice.value)}`;
}

renderCart();

function deleteProduct() {
    const cartDelete = document.querySelectorAll('.order_delete_btn');

    for (var i = 0; i < cartDelete.length; i++) {
        cartDelete[i].addEventListener("click", (e) => {
            orderList.splice(e.target.value, 1);
            // 點一個刪除一個的意思
            localStorage.setItem('orderList', JSON.stringify(orderList));
            while (ordertContentUl.firstChild) {
                ordertContentUl.removeChild(ordertContentUl.firstChild);
            }
            renderCart();
            addItemToCart();
        });
    }
}

function changeQuantity() {
    const orderCount = document.querySelectorAll(".order_count select");
    for (var i = 0; i < orderCount.length; i++) {
        orderCount[i].addEventListener("change", (e) => {
            // change
            orderList[e.target.title].qty = e.target.value;
            // console.log(e.target.value); 點選要改成的值
            localStorage.setItem('orderList', JSON.stringify(orderList));
            while (ordertContentUl.firstChild) {
                ordertContentUl.removeChild(ordertContentUl.firstChild);
            }
            renderCart();
            addItemToCart();
        });

    }
}
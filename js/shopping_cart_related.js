// localStorage存活得比較久 清空Cache時才會消失
// localStorage.getItem(); 讀取
// localStorage.setItem("key","value"); 更新
// localStorage.removeItem(); 刪除
// F12 > Application > 左半邊會有storage，可以看到key/value

// 購物車的抓資料
var orderList = JSON.parse(localStorage.getItem('orderList')) || [];
// localstorage 只能接受字串
// 確認一下使用者使否登入 
var access_token = JSON.parse(JSON.stringify(localStorage.getItem('accessToken')) || [];
console.log(access_token);
addItemToCart();
function addItemToCart() {
    var count = 0;
    for (var i = 0; i < orderList.length; i++) {
        count = parseInt(orderList[i].qty) + parseInt(count);
    }
    // alert(count);確認一下購物車的數量
    const cartCount = document.getElementById("cart_number");
    cartCount.innerHTML = count;
}


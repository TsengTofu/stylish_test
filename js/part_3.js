//思考：讀取資料Request >> JSON.parse將資料轉成ObjectData(JSON is not an Object) >>輸出資料
// >>輸出資料前Loading
// switch button是另外一個功能
const hostName = "api.appworks-school.tw";
const apiVersion = "1.0";
//用const是因為這些值不會改變
//Const 只會在目前的{ }內有效，定義時必須 initialize，而且不能更改
const productList = document.querySelector("#shopList");
//最後List要顯示的位置
//console.log(productList);
var productPages = 0;
var productCategory = "";
//category是字串

const getData = api => {
  return new Promise((resolve, reject) => {
    // promise ----ES6
    const xhr = new XMLHttpRequest();
    xhr.open("get", `https://${hostName}/api/${apiVersion}/${api}`);
    // console.log(`${api}`); 直接把api當成變數
    // Q：但為何這樣就可以直接抓到women / men / all /...?
    // `模版字符串（template literal）` ----ES6
    xhr.onload = function () {
      resolve(this.responseText);
    };
    xhr.onerror = function () {
      reject("There is Nothing.");
    };
    xhr.send();
  });
};

//因為api的值是一直變的
const getDataParse = api => {
  return getData(api).then(result => {
    const productsAll = JSON.parse(result);
    productPages = productsAll.paging;
    const productsAllPages01 = productsAll.data;
    //data是JSON物件裡面的key
    printData(productsAllPages01);
  });
  // .catch((err) => {
  //     console.log(err);
  // })
};

// all products
getDataParse("products/all");
productCategory = "products/all";
//指定productCategory的位置

// 輸出資料
const printData = data => {
  data.forEach(item => {
    const { main_image, price, title, colors, id } = item;
    // 宣告變數
    const productLi = document.createElement("li");
    const productLink = document.createElement("a");

    productLink.setAttribute("href", `product.html?id=${id}`);
    const productPhoto = document.createElement("img");
    productPhoto.src = main_image;

    const productDetail = document.createElement("div");
    productDetail.className = "product_detail";

    const productColorList = document.createElement("ul");
    productColorList.className = "color_list clearfix";

    const productColor = document.createElement("li");
    productColor.className = "color";
    const productName = document.createElement("div");
    productName.className = "product_name";
    productName.textContent = title;

    const productPrice = document.createElement("div");
    productPrice.className = "price";
    productPrice.textContent = `TWD.${price}`;
    colors.forEach(color => {
      const { code } = color;
      const productColor = document.createElement("li");
      productColor.className = "color";
      productColor.style.backgroundColor = `#${code}`;
      if (code === "FFFFFF") {
        productColor.style.border = "1px solid #ddd";
        //加上邊框
        productColor.style.boxSizing = "border-box";
        //避免加了邊框大小不同
      }
      productColorList.appendChild(productColor);
    });

    /*
        //呈現的樣子
        <li>
            <a href="#">
                <img src="img/01_shopList.jpg">
                <div class="product_detail">
                    <ul class="color_list clearfix">
                        <li class="color_9baac2"></li>
                    </ul>
                    <div class="product_name">後鬆緊牛仔落地寬褲</div>
                    <div class="price">TWD.590</div>
                </div>
            </a>
        </li>
        */

    productList.appendChild(productLi);
    productLi.appendChild(productLink);
    productLink.appendChild(productPhoto);
    productLink.appendChild(productDetail);
    productDetail.appendChild(productColorList);
    productDetail.appendChild(productName);
    productDetail.appendChild(productPrice);
    productColorList.appendChild(productColor);
  });
};

const categoryMenus = document.querySelector(".menu");
const categoryMenuList = document.querySelectorAll(".menu li");
const changeBtn = btn => {
  //只有切換按鈕的時候才需要刪除
  while (productList.firstChild) {
    productList.removeChild(productList.firstChild);
  }
  if (btn.target.textContent === "女裝") {
    getDataParse("products/women");
    productCategory = "products/women";
  } else if (btn.target.textContent === "男裝") {
    getDataParse("products/men");
    productCategory = "products/men";
  } else {
    getDataParse("products/accessories");
    productCategory = "products/accessories";
  }
};

categoryMenus.addEventListener("click", changeBtn);

// 以上是part3


var categoryMenu = new URL(window.location.href);
console.log(categoryMenu);
let params = categoryMenu.searchParams;
var tagName = params.get('tag');
if (tagName === "women") {
  getDataParse("products/women");
  productCategory = "products/women";
} else if (tagName === "woman") {
  getDataParse("products/men");
  productCategory = "products/men";
} else {
  getDataParse("products/accessories");
  productCategory = "products/accessories";
}

//part4_search engine api
document.querySelector(".submit").addEventListener(
  "click",
  function (event) {
    while (productList.firstChild) {
      productList.removeChild(productList.firstChild);
    }
    const keyword = document.querySelector(".searchWords").value;
    // 但我不懂這裡為什麼要.value而不是.val();
    // console.log(keyword);
    if (keyword.length === 0) {
      getDataParse("products/all");
    } else if (!isNaN(keyword)) {
      // NaN  not a number
      // isNaN 判斷是否是數字 他是一個function
      // 所以有值的時候就會是true
      // 沒有值的時候就會是false
      const wrongMessage = document.createElement("h2");
      wrongMessage.innerHTML = `請嘗試搜索其他關鍵字`;
      wrongMessage.style.margin = "0 auto";
      wrongMessage.style.padding = "4vw";
      productList.appendChild(wrongMessage);
    } else {
      getDataParse(`products/search?keyword=${keyword}`);
    }

    // event.preventDefault();
  },
  false
);


//part_4_scroll
//scroll底部的時候抓資料
window.addEventListener("scroll", () => {
  //getBoundingClientRect可以獲得頁面中某個元素的左，上，右和下分別相對瀏覽器視窗的位置。
  //getBoundingClientRect是DOM元素到瀏覽器可視範圍的距離（不包含文檔捲起的部分）。
  //視窗可視範圍的意思 固定的
  const windowHeight = window.innerHeight;
  // console.log(windowHeight);
  const farBottomHeight = productList.getBoundingClientRect().bottom;
  // console.log(farBottomHeight);
  if (farBottomHeight < windowHeight) {
    // console.log("check it when true will run");

    if (productPages > 0 && productPages !== undefined) {
      // http://[HOST_NAME]/api/[API_VERSION]/products/all?paging=1
      getDataParse(`${productCategory}?paging=${productPages}`);
      console.log(`${productCategory}?paging=${productPages}`);
    }
    productPages = false;
    // 停止ajax直到下一次觸發事件    
  }
});
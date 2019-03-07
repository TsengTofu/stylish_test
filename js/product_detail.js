// -----使用JavaScript 解析網址與處理網址中的參數（URL Parameters）
var productDetailUrl = new URL(window.location.href);
const hostName = "api.appworks-school.tw";
const apiVersion = "1.0";
const productDetails_All = document.querySelector("#product_continer");

// Get Product Detail Data
const getProductData = function () {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    // http://18.214.165.31/api/1.0/products/details?id=201807242222
    xhr.open(
      "get",
      `https://${hostName}/api/${apiVersion}/products/details${productDetailUrl.search}`
    );
    xhr.onload = function () {
      // loader
      const loading = document.querySelector('.loader');
      loading.style.display = "block";
      resolve(this.responseText);
    };
    xhr.onerror = function () {
      reject("There is Nothing.");
    };
    xhr.send();
  });
};

console.log(
  `https://${hostName}/api/${apiVersion}/products/details${
  productDetailUrl.search
  }`
);

const getProductDataParse = function () {
  return getProductData().then(result => {  

    const productsDetail = JSON.parse(result);
    //data是JSON物件裡面的key
    printProductDetailData(productsDetail);
    checkStock(productsDetail);
  });
  // .catch((err) => {
  //     console.log(err);
  // })
};

getProductDataParse()
// console.log();



// 輸出資料
const printProductDetailData = productsDetail => {
  const {
    data
  } = productsDetail;
  const {
    id,
    title,
    description,
    price,
    texture,
    place,
    note,
    story,
    main_image,
    images
  } = data;
  // 宣告變數 在css裡面要給他class
  const main_imageURL = main_image;
  const productName = title;
  const productId = id;
  const productPrice = `TWD.${price}`;
  const description_apart = description.split("\r\n");
  const productDescription = `${note}<br>${texture}<br>${
    description_apart[0]
    }<br>${description_apart[1]}<br>素材產地：${place}<br>加工產地：${place}`;
  const storyDescribe = story;
  const productImages = images;

  const contentInBanner = `   
        <div class="product_intro clearfix">
          <div class="product_left_content">
            <img src="${main_imageURL}" alt="" />
          </div>
          <div class="product_right_content">
            <div class="product_name">${productName}</div>
            <p class="product_number">${productId}</p>
            <div class="price">${productPrice}</div>
            <div class="line"></div>
            <ul class="detail_items">
              <li class="colors_detail clearfix">
                <p class="title">顏色</p>
                <ul class="color_list">
                </ul>
              </li>
              <li class="clearfix size">
                <p class="title">尺寸</p>
                <ul class="size_list clearfix">
                </ul>
              </li>
              <li class="clearfix">
                <p class="title">數量</p>
                <div class="quantity_btn">
                  <button class="reduce">-</button>
                  <input type="text" id="count">
                  <button class="plus">+</button>
                </div>
              </li>
            </ul>
            <button class="add_to_cart" href="#">加入購物車</button>
            <p class="additional_detail">
                ${productDescription}
            </p>
          </div>
        </div>
        <section class="detail_information">
          <div class="detail_big_title clearfix">
            <p class="detail_title">細部說明
              <div class="line"></div>
            </p>
          </div>
          <p class="detail_paragraph">${storyDescribe}</p>
          <img src="${productImages[0]}" alt="">
          <p class="detail_paragraph">${storyDescribe}</p>
          <img src="${productImages[1]}" alt="">
        </section>`;
  productDetails_All.innerHTML = contentInBanner;
  // console.log(contentInBanner);
  // colors generator

  data.colors.forEach(colors => {
    const {
      code,
      name
    } = colors;
    const colorList = document.createElement("li");
    const color = document.createElement("a");
    color.className = "color_list_single";
    color.setAttribute("title", `${name}`);
    const colorParent = document.querySelector(".color_list");
    color.style.backgroundColor = `#${code}`;
    color.style.border = "1px solid rgba(255,255,255,0)";
    color.style.boxSizing = "border-box";
    color.style.outlineOffset = " 0.3vw";

    if (code === "FFFFFF") {
      color.style.border = "1px solid #ddd";
      //加上邊框
      color.style.boxSizing = "border-box";
      //避免加了邊框大小不同
    }
    color.value = code;
    colorList.appendChild(color);
    colorParent.appendChild(colorList);
    // console.log(`${color.title}`);
  });


  //sizes
  data.sizes.forEach(size => {
    const sizeParent = document.querySelector(".size_list");
    const productSize = document.createElement("div");
    productSize.className = "size_link";
    productSize.textContent = size;
    sizeParent.appendChild(productSize);
    // console.log(productSize.textContent);
  });
}


//-----------week_2_part_3-----------//
const checkStock = productsDetail => {
  const {
    data
  } = productsDetail;

  // 紀錄value
  var nowColor = 0;
  var nowSize = 0;
  var nowColorName;
  // 顏色中文名稱
  const plusNum = document.querySelector(".plus");
  const reduceNum = document.querySelector(".reduce");
  // quantity btn 加減按鈕搭配填入數字作加減運算
  count.value = 0;
  var countEl = document.querySelector("#count");
  countEl.value = 0;


  // 加的時候
  plusNum.addEventListener('click', function () {
    count += 1;
    countEl.value = parseInt(countEl.value) + 1;
    // var nowQuantity = countEl.value;
    // console.log(nowQuantity);

  });

  // 減的時候
  reduceNum.addEventListener('click', function () {
    if (count > 0 || 0 < count < countEl.value) {
      count -= 1;
      countEl.value = parseInt(countEl.value) - 1;
      // var nowQuantity = countEl.value;
      // console.log(nowQuantity);
    }
  });

  const addToCart = document.querySelector(".add_to_cart");
  // console.log(addToCart);
  if (nowColor === 0 || nowSize === 0) {
    addToCart.className = "disabled";
  }
  const touchColorList = document.querySelector(".color_list")
  const touchColor = document.querySelectorAll(".color_list a");
  // console.log(touchColorList);
  // console.log(touchColor);
  // 選到全部的色塊 
  touchColorList.addEventListener(
    "click",
    function (e) {
      for (var i = 0; i < touchColor.length; i++) {
        if (touchColor[i].className === "color_hover") {
          touchColor[i].className = "color_list_single";
        }
      }
      if (e.target.value !== undefined && e.target.className !== "disabled" && e.target.tagName === "A") {
        e.target.className = "color_hover";
        nowColor = e.target.value;
        nowColorName = e.target.title;
        //抓住顏色的title值
        // console.log(e.target.className);
      }
      if (nowColor !== undefined) {
        countEl.value = 0;
      }
    })

  // 尺寸的部分
  const touchSizeList = document.querySelector(".size_list")
  const touchSize = document.querySelectorAll(".size_list div");
  touchSizeList.addEventListener(
    "click",
    function (e) {
      for (var i = 0; i < touchSize.length; i++) {
        if (touchSize[i].className === "size_link_hover") {
          touchSize[i].className = "size_link";
        }
      }
      // console.log(e.target.textContent);
      // console.log(e.target.tagName);
      if (e.target.textContent !== undefined && e.target.className !== "disabled" && e.target.tagName === "DIV") {
        e.target.className = "size_link_hover";
        nowSize = e.target.textContent;
      }

      if (nowSize !== undefined) {
        countEl.value = 0;
      }
    })

  const order = document.querySelector(".detail_items");
  order.addEventListener(
    "click",
    function () {
      data.variants.forEach(item => {
        let {
          size,
          stock,
          color_code
        } = item;
        // 如果點選的顏色跟尺寸有對到的話
        if (nowColor === color_code && nowSize === size) {
          // alert("good");
          stock = stock - countEl.value;
          // console.log(stock);
          console.log(countEl.value);

          if (stock > 0) {
            addToCart.className = "add_to_cart";
            addToCart.textContent = "加入購物車";
            plusNum.disabled = false;
          } else if (stock <= 0) {
            addToCart.className = "disabled";
            addToCart.textContent = "已達庫存上限";
            plusNum.disabled = true;
          } else {

            for (var i = 0; i < touchColor.length; i++) {
              if (touchColor[i].className === "color_hover") {
                touchColor[i].className = "color_list_single";
              }
            }

            for (var i = 0; i < touchSize.length; i++) {
              if (touchSize[i].className === "size_link_hover") {
                touchSize[i].className = "size_link";
              }
            }
          }
        }
        // console.log(variants);
        // console.log(variants['size']);
      });
    })


  // 監聽這個按鈕是否有被點選
  // var orderList = JSON.parse(localStorage.getItem('orderList')) || [];
  // 如果localStorage裡面有東西就把它轉成JSON  如果是空的就是陣列
  addToCart.addEventListener(
    "click",
    function () {
      var orderItems = {
        'id': data.id,
        // console.log(id);
        'name': data.title,
        // console.log(name);
        'price': data.price,
        // console.log(price);
        'mainImg': data.main_image,
        // console.log(mainImg);
        'colorName': nowColorName,
        // 'colorName':productsDetail['data'].colors[].name,
        // console.log(colorName);
        'color': nowColor,
        // console.log(productsDetail['data'].colors[0].code);
        // 這樣可以抓到單一顏色的名稱 colors是陣列
        // 'nowColor':nowColor,
        // console.log(nowColor);
        // 目前選擇的顏色
        'size': nowSize,
        // console.log(nowSize);
        // 目前選擇的尺寸
        'qty': countEl.value
        // console.log(countEl.value);
        // 購買的數量
      };
      var t = 0;
      // console.log(orderList.length);
      if (orderList.length > 0) {
        for (var i = 0; i < orderList.length; i++) {
          if (orderList[i].id === data.id && orderList[i].colorName === nowColorName && orderList[i].size === nowSize) {
            orderList[i].qty = parseInt(orderList[i].qty) + parseInt(countEl.value);
          } else {
            t++;
          }
        }

        if (t === orderList.length) {
          orderList.push(orderItems);
        }
        localStorage.setItem('orderList', JSON.stringify(orderList));
      } else {        
        orderList.push(orderItems);
        localStorage.setItem('orderList', JSON.stringify(orderList));
        // 即使頁面刷新他還是會一直存在
      }
      addItemToCart();
    })




}



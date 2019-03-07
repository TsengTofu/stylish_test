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
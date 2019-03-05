// 抓網址的參數
var orderDetailUrl = new URL(window.location.href);
// console.log(orderDetailUrl.search);
// ?number=2422364623
// 抓網址參數裡面的key的value
let params = orderDetailUrl.searchParams;
var orderNumber = params.get('number');
// console.log(orderNumber);

// 這個是數字要填入的位置
const orderNum = document.querySelector('#orderNumber');
console.log(orderNum);
// 把訂單數字帶入
orderNum.textContent=orderNumber;

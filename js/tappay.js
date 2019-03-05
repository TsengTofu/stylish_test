const HOST_NAME = "api.appworks-school.tw";
const API_VERSION = "1.0";
// 根據TapPay文件
TPDirect.setupSDK(12348, 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF', 'sandbox');
TPDirect.card.setup({
    fields: {
        number: {
            // css selector
            element: '#card-number',
            placeholder: '**** **** **** ****'
        },
        expirationDate: {
            // DOM object
            element: document.getElementById('card-expiration-date'),
            placeholder: 'MM / YY'
        },
        ccv: {
            element: '#card-ccv',
            placeholder: '後三碼'
        }
    },
    styles: {
        // Style all elements
        'input': {
            'color': 'gray'
        },
        // Styling ccv field
        'input.cvc': {
            // 'font-size': '16px'
        },
        // Styling expiration-date field
        'input.expiration-date': {
            // 'font-size': '16px'
        },
        // Styling card-number field
        'input.card-number': {
            // 'font-size': '16px'
        },
        // style focus state
        ':focus': {
            // 'color': 'black'
        },
        // style valid state
        '.valid': {
            'color': 'green'
        },
        // style invalid state
        '.invalid': {
            'color': 'red'
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        '@media screen and (max-width: 400px)': {
            'input': {
                'color': 'orange'
            }
        }
    }
})


TPDirect.card.onUpdate(function (update) {
    // update.canGetPrime === true
    // --> you can call TPDirect.card.getPrime()
    if (update.canGetPrime) {
        // Enable submit Button to get prime.
        // submitButton.removeAttribute('disabled')
    } else {
        // Disable submit Button to get prime.
        // submitButton.setAttribute('disabled', true)
    }

    // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unknown']
    if (update.cardType === 'visa') {
        // Handle card type visa.
    }

    // number 欄位是錯誤的
    if (update.status.number === 2) {
        // setNumberFormGroupToError()
    } else if (update.status.number === 0) {
        // setNumberFormGroupToSuccess()
    } else {
        // setNumberFormGroupToNormal()
    }

    if (update.status.expiry === 2) {
        // setNumberFormGroupToError()
    } else if (update.status.expiry === 0) {
        // setNumberFormGroupToSuccess()
    } else {
        // setNumberFormGroupToNormal()
    }

    if (update.status.cvc === 2) {
        // setNumberFormGroupToError()
    } else if (update.status.cvc === 0) {
        // setNumberFormGroupToSuccess()
    } else {
        // setNumberFormGroupToNormal()
    }
})

// call TPDirect.card.getPrime when user submit form to get tappay prime
// $('form').on('submit', onSubmit)

function onSubmit(event) {
    event.preventDefault()

    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus()

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
        alert('信用卡資訊錯誤，請確認資訊是否正確，謝謝！')
        return false;
    }

    // Get prime
    const prime = new Promise((resolve, reject) => {
        TPDirect.card.getPrime((result) => {
            const {
                status,
                msg,
                card
            } = result;
            const {
                prime
            } = card;

            if (status !== 0) {
                reject(`Get prime error`);
            }
            resolve(prime);

            // send prime to your server, to pay with Pay by Prime API .
            // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
        });
    });

    return prime;
}


const submitBtn = document.querySelector('.final_order_btn');
const customerInfo = document.querySelectorAll('#form_information input');
const recordeInfo = document.querySelector('#form_information');
console.log(customerInfo);
// 確認購物車有沒有東西
function checkCartList() {
    if (orderList.length > 0) {
        return true;
    } else {
        alert("購物車內沒有東西");
        return false;
    }
}

// submitBtn.addEventListener("click",checkCartList); 
// 確認一下他會動

// 所以會得到一個true / false的值
// 確認基本資訊
function checkCustomerInfo() {
    for (var i = 0; i < customerInfo.length; i++) {
        if (customerInfo[i].value !== "" && customerInfo[i].value !== null) {
            alert("訂購資料全部填妥，很棒！");
            return true;
        } else {
            alert("訂購資料尚未填妥，請再確認是否資訊完整。");
            return false;
        }
    }
}

// submitBtn.addEventListener("click", checkCustomerInfo); 
// 確認一下他會動

// post傳送資料
function postData(data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("POST", `https://${HOST_NAME}/api/${API_VERSION}/order/checkout`);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        // 後來新放上去的
        xhr.setRequestHeader('Authorization', `Bearer x${access_token}`);
        
        xhr.onload = function () {
            resolve(this.responseText);
            return this.responseText;
        }
        xhr.onerror = function () {
            reject("Something wrong!");
        }

        xhr.send(data);
    });
}


// 偵測送出資料按鈕被點
submitBtn.addEventListener("click", () => {

    if (checkCartList() !== false && checkCustomerInfo() !== false) {
        submitBtn.textContent = '處理中';

        // 參考107行code
        var checkCardStatus = onSubmit(event);
        const formData = new FormData(recordeInfo);
        const totalPriceNum = document.querySelector("#total");

        if (checkCardStatus !== false) {
            return checkCardStatus.then((result) => {
                for (var i = 0; i < orderList.length; i++) {
                    delete orderList[i].img;
                }

                // 參考api寫法把值帶入
                var checkOutOrder = {
                    prime: result,
                    order: {
                        shipping: "delivery",
                        payment: "credit_card",
                        subtotal: totalPriceNum.value,
                        freight: 30,
                        total: totalPriceNum.value + 30,
                        recipient: {
                            name: formData.get('name'),
                            phone: formData.get('phone'),
                            email: formData.get('email'),
                            address: formData.get('address'),
                            time: formData.get('time')
                        },
                        list: orderList
                    }

                };

                checkOutOrder = JSON.stringify(checkOutOrder);
                // 送出資料並取得number
                let orderData = postData(checkOutOrder);
                // console.log(orderData);
                orderData.then((result) => {
                    const responseMsg = JSON.parse(result);

                    // 確認是否拿到正確的資料
                    if (responseMsg.error === undefined) {
                        let orderNumber = responseMsg.data.number;
                        // 清空購物車
                        localStorage.clear();
                        window.location.href = `thankyou.html?number=${orderNumber}`;
                        // 連到Thank you Page 可以指定網址是訂單編號
                    } else {
                        alert('請再次檢查資訊，謝謝');
                        window.location.href = "cart.html";
                    }

                });

            })
        }

    }

});
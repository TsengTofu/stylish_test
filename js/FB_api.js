// 載入facebook javascript sdk
(function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");


window.fbAsyncInit = function () {
    FB.init({
        appId: "306113546764828", // 這是自己的app ID
        cookie: true, // enable cookies allow the server to access
        xfbml: true, // parse social plugins on this page
        version: "v3.2" // The Graph API version to use for the call
    });
    FB.AppEvents.logPageView();
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
    
};




function statusChangeCallback(response) {
    console.log("statusChangeCallback");
    console.log(response);
    // response object 會回傳目前的 status，讓 app 知道目前使用者的 login status
    if (response.status === "connected") {
        testAPI();
        var accessToken = response.authResponse.accessToken;
        localStorage.setItem('accessToken', response.authResponse.accessToken);
        
    } else {
        // 目前使用者並沒有登入或是我們不知道發生了甚麼事
        //   document.getElementById("status").innerHTML =
    }
}



function testAPI() {
    // console.log("Welcome!  Fetching your information.... ");
    FB.api('/me?fields=id,name,email,picture', function (response) {
        // console.log(response.picture.data.url);
        // console.log(response.picture.data.height);
        // console.log(response.picture.data.width);
        const imgUrl = `https://graph.facebook.com/${response.id}/picture?width=9999`;
        const profileInfo = document.querySelector(".profile_content_login_membership");
        profileInfo.style.display = "block";
        profileInfo.innerHTML = `
        <div class="user_photo"><img src="${imgUrl}" alt=""></div>
      <div class="user_detail">
        <ul>
          <li>${response.id}</li>
          <li>${response.name}</li>
          <li>${response.email}</li>
        </ul>
      </div>
      `;
        
        const loginMember = document.querySelector(".member");
        const loginMemberOrigin = document.querySelector(".member img");
        loginMemberOrigin.style.display = "none";
        loginMember.style.background = `url(${imgUrl}) center no-repeat`;
        loginMember.style.zIndex = 999;
        loginMember.style.borderRadius = "999em";
        loginMember.style.width = "44px";
        loginMember.style.height = "44px";
        loginMember.style.backgroundSize = "contain";

        const fbBtn = document.querySelector(".fb");
        fbBtn.style.display = "none";
    });



}

// 當使用者按了登入按鈕並執行登入的動作，就會呼叫這個function
// 檢查登入狀態
function checkLoginState() {
    FB.login(function (response) {
        statusChangeCallback(response);
    }, {
        scope: 'email,user_photos',
        return_scopes: true
    });
}

//  localStorage.setItem('token', 'ImLogin')
// const isLogin = localStorage.getItem('token') == 'ImLogin' ;
//  if(isLogin)  ===>就是有登入

// if (response.authResponse) {
//同意授權並且登入執行這段
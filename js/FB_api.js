// 這邊是ESLINT要解決的問題，所以下面註解不可以刪掉
/* exported checkLoginState */

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {

        localStorage.setItem('accessToken', response.authResponse.accessToken);
        let currentUrl = window.location.href;
        console.log(currentUrl);
        if (currentUrl.includes('profile')) {
            alert("url contains profile");
            // 如果是在profile頁面
            testAPI();
        } else {
            // 如果不是
            testAPI_2();
        }
    } else {
        // The person is not logged into your app or we are unable to tell.
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    }, {
            scope: 'email,user_photos',
            return_scopes: true
        });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '306113546764828',
        cookie: true,  // enable cookies to allow the server to access 
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v3.2' // The Graph API version to use for the call
    });
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

};

// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



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

        const login = document.querySelector(".member_apart");
        const loginMember = document.querySelector(".member");
        const loginMemberOrigin = document.querySelector(".member img");
        loginMemberOrigin.style.display = "none";
        loginMember.style.background = `url(${imgUrl}) center no-repeat`;
        loginMember.style.zIndex = 999;
        loginMember.style.borderRadius = "999em";
        loginMember.style.width = "44px";
        loginMember.style.height = "44px";
        loginMember.style.backgroundSize = "contain";
        login.classList = "no-before";


    });
}


function testAPI_2() {
    FB.api('/me?fields=id,name,email,picture', function (response) {
        // console.log(response.picture.data.url);
        // console.log(response.picture.data.height);
        // console.log(response.picture.data.width);
        const imgUrl = `https://graph.facebook.com/${response.id}/picture?width=9999`;
        const login = document.querySelector(".member_apart");
        const loginMember = document.querySelector(".member");
        const loginMemberOrigin = document.querySelector(".member img");
        loginMemberOrigin.style.display = "none";
        loginMember.style.background = `url(${imgUrl}) center no-repeat`;
        loginMember.style.zIndex = 999;
        loginMember.style.borderRadius = "999em";
        loginMember.style.width = "44px";
        loginMember.style.height = "44px";
        loginMember.style.backgroundSize = "contain";
        login.classList = "no-before";
    });
}
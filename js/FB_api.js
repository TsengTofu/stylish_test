function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        localStorage.setItem('accessToken', response.authResponse.accessToken);
        console.log(localStorage.setItem('accessToken', response.authResponse.accessToken))
        testAPI();
    } else {
        // The person is not logged into your app or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
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

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
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












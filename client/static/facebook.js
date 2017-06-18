function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  if (response.status === 'connected') {
    testAPI();
  } else {
    FB.login(function(response) {
      if (response.authResponse) {
       console.log('Welcome!  Fetching your information.... ');
       FB.api('/me', function(response) {
         console.log('Good to see you, ' + response.name + '.');
       });
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
    });
  }
}



function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response)
  });
}

function logoutFacebook() {
  FB.getLoginStatus(function(response) {
    if(response.status == 'connected') {
      FB.logout(function(response) {
        localStorage.removeItem("token");
        console.log(response);
      });
    } else {
      localStorage.removeItem("token");
    }
    window.location.href = '/login.html'
  });
}

function testAPI() {
  FB.api('/me',{fields: 'name, email'}, function(response) {
    axios.post('http://localhost:3001/fblogin',{
      email : response.email,
      name : response.name
    })
    .then((result)=>{
      localStorage.setItem('token', result.data);
      window.location.href = './index.html'
    })
    .catch((err)=>{
      console.log(err)
    })
  });
}
 //
 // window.fbAsyncInit = function() {
 //   FB.init({
 //     appId: '1693290074304262',
 //     cookie: true, // enable cookies to allow the server to access
 //     // the session
 //     xfbml: true, // parse social plugins on this page
 //     version: 'v2.9' // use graph api version 2.8
 //   });

 // Now that we've initialized the JavaScript SDK, we call
 // FB.getLoginStatus().  This function gets the state of the
 // person visiting this page and can return one of three states to
 // the callback you provide.  They can be:
 //
 // 1. Logged into your app ('connected')
 // 2. Logged into Facebook, but not your app ('not_authorized')
 // 3. Not logged into Facebook and can't tell if they are logged into
 //    your app or not.
 //
 // These three cases are handled in the callback function.
//
//  FB.getLoginStatus(function(response) {
//    statusChangeCallback(response);
//  });
//
//  };
//
//
// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.9&appId=1693290074304262";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));
//
//
// function checkLoginState() {
//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response)
//   });
// }
//
// function logoutFacebook() {
//   FB.getLoginStatus(function(response) {
//     if(response.status == 'connected') {
//       FB.logout(function(response) {
//         localStorage.removeItem("token");
//         console.log(response);
//       });
//     } else {
//       localStorage.removeItem("token");
//     }
//     window.location.href = '/login.html'
//   });
// }
//
// function testAPI() {
//   FB.api('/me',{fields: 'name, email'}, function(response) {
//     axios.post('http://localhost:3000/fblogin',{
//       email : response.email,
//       name : response.name
//     })
//     .then((result)=>{
//
//       if (typeof response.email !== 'undefined') {
//         console.log('hahaha')
//          $('#callLogin').prop('email', response.email);
//          $('#callLogin').click();
//       }
//
//       localStorage.setItem('token', result.data);
//       window.location.href = './index.html'
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   });
// }

// Contact GitHub API Training Shop Blog About

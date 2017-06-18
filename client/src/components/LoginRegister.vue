<template>
<div class="container" style="padding-top:5%;">
  <div class="row">
    <div class="col-md-5" style="margin:auto">
      <b-tabs>
        <b-tab title="Login" active>

          <form class="frm frm-login frm-login--padding">
            <b-form-fieldset label="Email">
              <b-form-input type="email" id="l_email" placeholder="Please Input your email"></b-form-input>
            </b-form-fieldset>
            <b-form-fieldset description="10-20 Char long" label="Password">
              <b-form-input type="password" id="l_password" placeholder="Please Input your password"></b-form-input>
            </b-form-fieldset>
            <input type="submit" class="btn btn-primary btn-block" value="LOGIN" @click.prevent="login">
            <span><br/><br/></span>
            <span>
                <label>... OR login with Facebook</label><br/>
                <div class="fb-login-button"
                  data-max-rows="1"
                  data-size="large"
                  data-button-type="continue_with"
                  data-show-faces="false"
                  data-auto-logout-link="true"
                  data-use-continue-as="true"
                ></div>
                <!-- <a id="fb-login" class="btn">Login with facebook</a> -->
              </span>
          </form>
        </b-tab>
        <b-tab title="Register">
          I
          <form class="frm frm-login frm-login--padding">
            <b-form-fieldset label="Email">
              <b-form-input id="r_email" type="email" placeholder="Please Input your email" required></b-form-input>
            </b-form-fieldset>
            <b-form-fieldset description="10-20 Char long" label="Password">
              <b-form-input id="r_password" type="password" placeholder="Please Input your password" required></b-form-input>
            </b-form-fieldset>
            <input type="submit" class="btn btn-primary btn-block" value="REGISTER" @click.prevent="register">

          </form>
        </b-tab>
      </b-tabs>
    </div>
  </div>
  <div id="status">
  </div>
  <button id="fb-login" @click.prevent="fblogin">Login fb yu</button>

</div>
</template>

<script type="text/javascript">
export default {
  name: 'LoginRegister',
  data() {
    return {
    }
  },
  methods: {
    register: function() {
      let user = {
        email: $('#r_email').val() || '',
        password: $('#r_password').val() || ''
      }
      this.$store.dispatch('register', user)
    },
    login: function() {
      let user = {
        email: $('#l_email').val() || '',
        password: $('#l_password').val() || ''
      }
      this.$store.dispatch('login', user)
    },
    fblogin: function() {
      console.log('clicked')
      window.fbAsyncInit = function() {
        FB.init({
          appId: '1693290074304262',
          cookie: true, // enable cookies to allow the server to access
          // the session
          xfbml: true, // parse social plugins on this page
          version: 'v2.9' // use graph api version 2.8
        });
      }
      FB.getLoginStatus(function(response) {
        checkLoginState();
      });
    }
      // this.$store.dispatch('fblogin', {email : $('#callLogin').prop('email')});

  }
};
</script>
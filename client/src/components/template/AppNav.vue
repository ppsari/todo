<template lang="html">
  <b-navbar toggleable type="inverse" variant="success">
    <b-nav-toggle target="nav_collapse"></b-nav-toggle>
    <b-link class="navbar-brand" to="#">
      <span>JUSTDOIT</span>
    </b-link>
    <b-collapse is-nav id="nav_collapse" v-if="token !== null">
      <!-- <b-nav is-nav-bar>
        <b-nav-item>Support</b-nav-item>
        <b-nav-item>Docs</b-nav-item>
        <b-nav-item>Contact Us</b-nav-item>
      </b-nav> -->

      <b-nav is-nav-bar class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="text">
            <span style="font-weight: bold;">User</span>
          </template>
          <b-dropdown-item to="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  name: 'AppNav',
  data() {
    return {
      token : localStorage.getItem('token') || null
    }
  },
  methods: {
    logout: function () {
      console.log('logout')
      this.$store.dispatch('logout');
      this.token = null;
    }
  }
}
</script>
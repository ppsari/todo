<template>
  <div>
    <app-nav></app-nav>
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppNav from './components/template/AppNav';

export default {
  name: 'app',
  components: {
    AppNav
  }
}
</script>

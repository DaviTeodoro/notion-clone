<template>
  <ul class="btn-group main-menu">
    <li class="btn"><nuxt-link to="/" exact>Home</nuxt-link></li>
    <li class="btn" v-if="isAuthenticated"><nuxt-link to="/protected">Protected</nuxt-link></li>
    <li class="btn" v-if="isAuthenticated"><a href="#" @click.prevent="exit">Sign out</a></li>
    <li class="btn" v-else><nuxt-link to="/sign-in">Sign in</nuxt-link></li>
  </ul>
</template>

<script>
import { mapActions, mapState } from 'vuex'; // eslint-disable-line import/no-extraneous-dependencies

export default {
  computed: {
    ...mapState('auth', ['user']), // Not updating consistently ¯\_(ツ)_/¯

    isAuthenticated() {
      return !!this.user;
    },
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),

    async exit() {
      await this.logout();
      this.$router.replace('/');
    },
  },
};
</script>

<style scoped>
.main-menu {
  font-size: 0;
  list-style: none;
  padding: 0.9rem 0;
  text-align: center;
}

.btn {
  display: inline-block;
  font-size: 1rem;
}

.btn a {
  color: rgb(82, 82, 82);
  text-decoration: none;
}

.btn .nuxt-link-active {
  color: rgb(80, 131, 126);
}

.btn + .btn {
  margin-left: 1rem;
}
</style>

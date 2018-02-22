<template>
  <main class="protected">
    <h1>Protected</h1>
    <p>This is the private part of your application, the one available only to logged in users.</p>
    <form>
      <fieldset>
        <legend>Change password</legend>
        <label>
          New password
          <input type="password" v-model="password">
        </label>
        <button :disabled="!password" @click.prevent="changePassword">Submit</button>
      </fieldset>
      <p v-if="success" class="success">Password changed!</p>
      <p v-if="error" class="error">Oopsie! Couldn't change the password :(</p>
    </form>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  middleware: 'check-auth',

  data() {
    return {
      password: '',
      error: false,
      success: false,
    };
  },

  computed: {
    ...mapState('auth', {
      user: 'user',
    }),
  },

  methods: {
    ...mapActions({
      patchUser: 'users/patch',
    }),

    async changePassword() {
      const payload = { password: this.password };

      if (this.password) {
        this.error = false;
        this.success = false;

        try {
          /* eslint-disable no-underscore-dangle */
          await this.patchUser([this.user._id, payload]);
          this.success = true;
        } catch (e) {
          throw e;
        }
      }
    },
  },

  watch: {
    success() {
      if (this.success) {
        setTimeout(() => {
          this.success = false;
        }, 3000);
      }
    },

    error() {
      if (this.error) {
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
.protected form {
  margin: 2rem auto;
  width: 15rem;
}

.protected .success {
  color: green;
}

.protected .error {
  color: firebrick;
}
</style>


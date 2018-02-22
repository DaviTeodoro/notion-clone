<template>
  <main class="sign-in">
    <div class="container">
      <legend>Sign in</legend>
      <a href="/auth/google">Login with Google</a>
      <a href="/auth/facebook">Login with Facebook</a>
    </div>
  </main>
</template>

<style>
.sign-in {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
}

.sign-in .container {
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
}

.sign-in a {
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin: 0.5rem;
}

.sign-in legend {
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}
</style>


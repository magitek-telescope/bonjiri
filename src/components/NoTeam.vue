<template lang="html">
  <div class="noteam">

    <h1>No Team.</h1>
    <p>
      Please add the first team from "Add Team" in the upper left of the window.
    </p>
  </div>
</template>

<style lang="css" scoped>
.noteam{
  width: calc(100% - 200px);
  height: 100%;
  display: flex;

  color: rgba(0,0,0,0.4);
  background: #F3F3F3;

  text-shadow: 0 1px 1px rgba(0,0,0,0.4) inset;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  filter: grayscale(100%);
}

h1{
    font-size: 60px;
    margin-bottom: 0;
}

p{
  font-size: 20px;
}
</style>

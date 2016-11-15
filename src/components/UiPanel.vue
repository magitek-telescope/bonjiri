<template lang="html">
  <div class="panel" v-on:click="showModal">
    <img :src="'./assets/plus.svg'" alt="">
    <div class="info">
      <strong>Add New Team</strong>
    </div>
  </div>
</template>

<style lang="css" scoped>
.panel{
  margin: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  cursor: pointer;

  position: relative;

  opacity: 0.8;
}

.panel:hover{
  background: transparent;
  opacity: 1.0;
}

.panel img{
  width: 36px;
  height: 36px;
  margin-right: 5px;
  background: transparent;

  border-radius: 5px;
}

.panel.setting{
  position: absolute;
  left: 0;
  bottom: 0;
}

.panel .info strong{
  font-size: 14px;
  font-weight: bold;
}

.panel .info span{
  display: block;
  font-size: 12px;
  opacity: 0.5;
}

.panel .badge{
  position: absolute;
  left: 38px;
  top: 2px;

  width: 14px;
  height: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 10px;
  font-weight: bold;

  border-radius: 50%;

  color: #fff;
  background: linear-gradient(#FF6060, #E65555);
  border: solid 1px #CB4141;
}
</style>

<script>
module.exports = {
  data: () => {
    return {
      stores: {
        ApplicationStore: require("../stores/ApplicationStore.js")
      }
    }
  },

  methods: {
    showModal: function(){
      console.log(this);
      this.stores.ApplicationStore.isShowModal = true;
    }
  }
}
</script>

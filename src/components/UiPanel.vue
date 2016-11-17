<template>
  <div class="panel" v-on:click="showModal">
    <img src="assets/plus.svg" alt="Add New Team">
    <div class="info">
      <strong>Add New Team</strong>
    </div>
  </div>
</template>

<style scoped>
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
</style>

<script>
module.exports = {
  data: () => {
    return {
      stores: require("../stores/Stores.js")
    }
  },

  methods: {
    showModal: function(){
      this.stores.ModalStore.setVisible(true);
    }
  }
}
</script>

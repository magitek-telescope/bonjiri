<template>
  <div class="panel" :data-id="teamdata.id" :data-domain="teamdata.domain" :data-order="teamdata.order" v-on:click="switchTeam">
    <img :src="teamdata.icon || ''" alt="Team Icon">
    <div class="info">
      <strong>{{ teamdata.name }}</strong>
      <span>{{ teamdata.domain }}</span>
    </div>
    <div class="badge" v-show="teamdata.unread"> </div>
    <div class="panel-number">⌘{{count}}</div>
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
}

.panel:hover{
  background: rgba(255, 255, 255, 0.025);
}

.panel img{
  width: 36px;
  height: 36px;
  margin-right: 5px;
  background: #fff;

  border-radius: 5px;
}

.panel .info strong{
  font-size: 14px;
  font-weight: bold;
}

.panel .info span{
  display: block;
  font-size: 12px;
  opacity: 0.5;

  width: 106px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  background: linear-gradient(rgba(255,0,0,0.8), rgba(255,0,0,0.8));
  border: solid 1px #CB4141;
}

.panel-number{
  position: absolute;
  right: 6px;
  bottom: 11px;

  color: rgba(255,255,255,0.5);
  font-size: 12px;
}

:not(.panel){
  pointer-events: none;
}
</style>

<script>
module.exports = {
  props: ["count", "teamdata"],
  data: () => {
    return {
      stores: require("../stores/Stores.js")
    }
  },
  methods: {
    switchTeam: function(){
      this.stores.TeamsStore.setActiveTeam(this.teamdata.id);
    }
  }
}
</script>

<template>
	<div id="app">
		<draggable></draggable>
		<navigation></navigation>
    <teamview v-if="stores.TeamsStore.getTeams().length" v-for="team in stores.TeamsStore.getTeams()" :teamdata="team" :isshow="team.id == stores.ApplicationStore.activeTeam"></teamview>
		<noteam v-if="stores.TeamsStore.getTeams().length == 0"></noteam>
		<modal></modal>
	</div>
</template>

<style scoped>
#app{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
</style>

<script>
module.exports = {
  data: () => {
    return {
      stores: require("./stores/Stores.js")
    }
  },
  created: function(){
    if(this.stores.TeamsStore.getTeams().length){
      this.stores.ApplicationStore.activeTeam = this.stores.TeamsStore.getTeams()[0].id;      
    }
  }
}
</script>

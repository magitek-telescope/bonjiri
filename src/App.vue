<template>
	<div id="app">
		<draggable></draggable>
		<navigation></navigation>
    <teamview v-if="stores.TeamsStore.getTeams().length" v-for="team in stores.TeamsStore.getTeams()" :teamdata="team" :isshow="team.id == stores.TeamsStore.getActiveTeam()"></teamview>
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
    const $ = e=>document.querySelector(e);
    if(this.stores.TeamsStore.getTeams().length) this.stores.TeamsStore.setActiveTeam(this.stores.TeamsStore.getTeams()[0].id);

    $("body").addEventListener("keydown", (e)=>{
      if(!e.metaKey || e.keyCode < 48 ||  e.keyCode > 57) return;
      let target = e.keyCode - 49;
      target = (target < 0) ? this.stores.TeamsStore.getTeams().length-1 : Math.min(target, this.stores.TeamsStore.getTeams().length-1);
			this.stores.TeamsStore.setActiveTeam(this.stores.TeamsStore.getTeams()[target].id);
    });
  }
}
</script>

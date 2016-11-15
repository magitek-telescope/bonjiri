<template lang="html">
  <nav id="main-navigation" :style="'background:' + (activeTeam !== undefined ? activeTeam.color : '#4D394B;') ">
    <ul>
      <li v-for="team in stores.TeamsStore.getTeams()">
        <team-panel :teamdata="team"></team-panel>
      </li>

      <li class="panel ui-parts">
        <ui-panel></ui-panel>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav{
    width: 200px;
    height: calc(100% - 18px);
    padding-top: 18px;

    overflow: auto;

    color: #fff;
    transition: all 0.4s ease-out;
}

nav h1{
  margin: 5px;
}

nav ul{
  margin: 0;
  padding: 0;

  list-style: none;
  position: relative;

  height: 100%;
}
</style>

<script>
module.exports = {
  data: () => {
    return {
      stores: {
        TeamsStore : require("../stores/TeamsStore.js"),
        ApplicationStore : require("../stores/ApplicationStore.js")
      }
    }
  },
  computed: {
    activeTeam: function(){
      const t = this.stores.TeamsStore.getTeams().find((team) => {
        return team.id == this.stores.ApplicationStore.activeTeam;
      });
      console.log("ActiveTeam: " +t);
      return t;
    }
  }
}
</script>

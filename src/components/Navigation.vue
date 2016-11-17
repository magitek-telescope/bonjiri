<template>
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

    -webkit-user-select: none;

    z-index: 10;
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
      stores: require("../stores/Stores.js")
    }
  },
  computed: {
    activeTeam: function(){
      return this.stores.TeamsStore.getTeams().find((team) => {
        return team.id == this.stores.TeamsStore.getActiveTeam();
      });
    }
  }
}
</script>

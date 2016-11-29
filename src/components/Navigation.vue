<template>
  <nav id="main-navigation" :style="'background:' + (activeTeam !== undefined ? activeTeam.color : '#4D394B;') ">
    <ul>
      <li v-for="(team, count) in sortedTeam"
        draggable="true" :data-domain="team.domain" :data-order="team.order" v-on:dragstart="dragstart" v-on:dragenter="dragenter" v-on:dragend="dragend"
      >
        <team-panel :teamdata="team" :count="count+1"></team-panel>
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
  transition: all 0.2s ease-out;

  -webkit-user-select: none;

  z-index: 10;
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
      dragging : {order: null, domain: null},
      target   : {order: null, domain: null},
      stores   : require("../stores/Stores.js")
    }
  },
  computed: {
    sortedTeam: function(){
      const _ = require("lodash");
      console.log("Sorted:", _.sortBy(this.stores.TeamsStore.getTeams(), ["order"]));
      return _.sortBy(this.stores.TeamsStore.getTeams(), ["order"]);
    },

    activeTeam: function(){
      return this.stores.TeamsStore.getTeams().find((team) => {
        return team.id == this.stores.TeamsStore.getActiveTeam();
      });
    }
  },
  methods: {
    dragstart: function(e){
      this.dragging = {
        order: e.target.dataset.order,
        domain: e.target.dataset.domain
      };
    },

    dragenter: function(e){
      this.target = (e.target.domain == this.dragging.domain) ? null : {
        order: e.target.dataset.order,
        domain: e.target.dataset.domain
      };
    },

    dragend: function(){
      if(this.target === null) return;
      console.log(`Teams:[${this.target.domain}, ${this.dragging.domain}]`);

      this.stores.TeamsStore.setTeams(
        this.stores.TeamsStore.getTeams().map((team, count) => {
          if(team.domain == this.target.domain  ) team.order = this.dragging.order;
          if(team.domain == this.dragging.domain) team.order = this.target.order;
          return team;
        })
      );
    }
  }
}
</script>

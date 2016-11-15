<template lang="html">
  <div id="modal-area" v-bind:class="stores.ApplicationStore.isShowModal ? 'show' : 'hide'">
    <div id="modal-background" v-on:click="hideModal" v-show="stores.ApplicationStore.isShowModal"></div>
    <div id="modal" v-bind:style="'opacity:' + (stores.ApplicationStore.isShowModal ? '1' : '0' + ';')">
      <header>
        <img :src="'./assets/logo.png'" alt="" height="80">
      </header>
      <form v-on:submit.prevent="addTeam">
        <p>
          <label>Team Name</label>
          <input placeholder="Display name type here…" v-model="form.name">
        </p>

        <p>
          <label>Team ID</label>
          <input placeholder="Slack Team ID here…" v-model="form.domain">
        </p>

        <p>
          <label>Team Icon URL</label>
          <input placeholder="Icon URL here…" v-model="form.icon">
        </p>

        <p style="text-align:center;">
          <button type="submit">Add Team</button>
        </p>
      </form>
    </div>
  </div>
</template>

<style lang="css" scoped>
#modal{
  width: 360px;
  height: 470px;

  position: absolute;
  top: calc(50% - 235px);
  left: calc(50% - 200px);

  padding: 0 20px;

  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.08);

  transition: opacity 0.2s ease-out;
}

#modal header{
  width: 100%;
  text-align: center;
  margin: 25px auto;
}

#modal label{
  display: block;

  color: #95989A;
  font-size: 16px;
  margin:0 0 10px 0;
  font-weight: 600;
}

#modal input{
  width: 100%;
  background: transparent;
  border: none;

  padding: 5px 0;

  font-size: 14px;

  border-bottom: solid 1px #B2B2B2;
  margin-bottom: 20px;
  outline: none;
}

#modal button{
  width: 100px;
  height: 34px;
  font-weight: 600;

  color: #fff;
  font-size: 16px;
  background: linear-gradient(#53A5FC, #4B94E3);
  border: none;
  border-radius: 2px;

  cursor: pointer;
}

#modal-background{
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background: rgba(0,0,0,0.4);

  content: "";
}

#modal-area.hide{
  opacity: 0.0;
  pointer-events: none;
}

#modal-area.show{
  opacity: 1.0;
  pointer-events: auto;
}

</style>

<script>
module.exports = {
  data: () => {
    return {
      form: {
        name: "",
        domain: ""
      },
      stores: require("../stores/Stores.js")
    }
  },

  methods: {
    addTeam: function(e){
      e.preventDefault();
      console.log("Teams:", this.stores.TeamsStore.getTeams());
      this.stores.TeamsStore.setTeams(
        this.stores.TeamsStore.getTeams().concat(
          [{
            id     : this.form.name,
            name   : this.form.name,
            domain : `${this.form.domain}.slack.com`,
            icon   : this.form.icon,
            color  : "#4D394B",
            unread : 0
          }]
        )
      );
      console.log("Teams:", this.stores.TeamsStore.getTeams());
      this.stores.ApplicationStore.isShowModal = false;
    },

    hideModal: function(){
      this.stores.ApplicationStore.isShowModal = false;
    }
  }
}
</script>

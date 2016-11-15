<template lang="html">
  <div id="modal-area" v-bind:class="stores.ModalStore.getVisible() ? 'show' : 'hide'">
    <div id="modal-background" v-on:click="hideModal" v-show="stores.ModalStore.getVisible()"></div>
    <div id="modal" v-bind:style="'opacity:' + (stores.ModalStore.getVisible() ? '1' : '0' + ';')">
      <header>
        <img :src="'./assets/logo.png'" alt="" height="80">
      </header>
      <form v-on:submit.prevent="addTeam">
        <p>
          <label>Team Name</label>
          <input placeholder="Display name type here…" v-model="form.name">
        </p>

        <p style="position:relative;">
          <label>Team ID</label>
          <input placeholder="Slack Team ID here…" v-model="form.domain">
          <span class="suffix" style="position: absolute; right:0; bottom: 25px;">.slack.com</span>
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

<style scoped>
::-webkit-input-placeholder{
  transition: all 0.3s ease-out;
}

#modal{
  width: 360px;
  height: 470px;

  position: absolute;
  top: calc(50% - 235px);
  left: calc(50% - 220px);

  padding: 0 40px;

  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.08);

  transform: scaleY(0);
  transition: all 0.2s ease-out;
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

  color: #53A5FC;
  font-size: 14px;

  border-bottom: solid 1px #B2B2B2;
  margin-bottom: 20px;
  outline: none;

  transition: all 0.3s ease-out;
}

#modal .suffix{
  color: #B2B2B2;
  font-size: 14px;
}

#modal input:focus{
  border-bottom: solid 1px #53A5FC;
}

#modal input:focus::-webkit-input-placeholder{
  color: #53A5FC;;
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

#modal-area{
  transition: opacity 0.3s ease-out;
}

#modal-area.show{
  opacity: 1.0;
  pointer-events: auto;
}

#modal-area.show #modal{
  transform: scaleY(1.0);
}

</style>

<script>
module.exports = {
  data: () => {
    return {
      form: {
        name   : "",
        domain : "",
        icon   : ""
      },
      stores: require("../stores/Stores.js")
    }
  },

  methods: {
    addTeam: function(e){
      e.preventDefault();
      const formData = this.form;
      this.form = {name: "",domain: "",icon: ""};

      this.stores.TeamsStore.setTeams(
        this.stores.TeamsStore.getTeams().concat(
          [{
            id     : formData.name,
            name   : formData.name,
            domain : `${formData.domain}.slack.com`,
            icon   : formData.icon,
            color  : "#4D394B",
            unread : 0
          }]
        )
      );

      this.stores.TeamsStore.setActiveTeam(formData.name);
      this.stores.ModalStore.setVisible(false);
    },

    hideModal: function(){
      this.stores.ModalStore.setVisible(false);
    }
  }
}
</script>

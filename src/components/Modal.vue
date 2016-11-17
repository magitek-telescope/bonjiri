<template>
  <div id="modal-area" v-bind:class="stores.ModalStore.getVisible() ? 'show' : 'hide'">
    <div id="modal-background" v-on:click="hideModal" v-show="stores.ModalStore.getVisible()"></div>
    <div id="modal" v-bind:style="'opacity:' + (stores.ModalStore.getVisible() ? '1' : '0' + ';')">
      <header>
        <!-- <img :src="'./assets/logo.png'" alt="" height="80"> -->
        Bonjiri
      </header>
      <form v-on:submit.prevent="addTeam">
        <p>
          <label>Team Name</label>
          <input placeholder="Display name type here…" v-model="form.name">
          <span class="error" v-show="errors.name">{{ errors.name }}</span>
        </p>

        <p style="position:relative;">
          <label>Team Domain</label>

          <select v-model="form.kind">
            <option value="slack">Slack</option>
            <option value="discord">Discord</option>
          </select>

          <input :placeholder="form.kind == 'slack' ? 'Slack Team ID' : 'discord-id'" v-model="form.domain" :class="form.kind == 'slack' ? 'slack-form' : 'discord-form'">

          <span class="suffix" style="position: absolute; right:0; top: 34px;" v-if="form.kind == 'slack'">.slack.com</span>
          <span class="suffix" style="position: absolute; left:0; top: 34px;" v-if="form.kind == 'discord'">discordapp.com/</span>

          <span class="error" v-show="errors.domain">{{ errors.domain }}</span>
        </p>

        <p>
          <label>Team Icon URL</label>
          <input placeholder="Icon URL here…" v-model="form.icon">
          <span class="error" v-show="errors.icon">{{ errors.icon }}</span>
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
  height: 480px;

  position: absolute;
  top: calc(50% - 240px);
  left: calc(50% - 220px);

  padding: 0 40px;

  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.08);

  transform: scaleY(0);
  transition: all 0.2s ease-out;

  -webkit-user-select: none;

  z-index: 100;
}

#modal header{
  width: 100%;
  text-align: center;
  padding: 25px 40px;
  background: linear-gradient(-30deg, #5A9FBE, #7474C7);
  margin-left: -40px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 3px 0 rgba(0,0,0,0.163);
  margin-bottom: 10px;
}

#modal p{
  margin-bottom: 25px;
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
  outline: none;

  transition: border-bottom color 0.3s ease-out;
}

#modal .suffix{
  color: #B2B2B2;
  font-size: 14px;
}

#modal .error{
  color: #F77644;
  font-size: 12px;
}

#modal input:focus{
  border-bottom: solid 1px #53A5FC;
}

#modal select{
  position: absolute;
  top: 3px;
  right: 0;
}

#modal input.discord-form{
  padding-left: 103px;
  width: calc(100% - 103px);
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

  z-index: 50;
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
        icon   : "",
        kind   : "slack"
      },
      errors: {
        name   : "",
        domain : "",
        icon   : ""
      },
      stores: require("../stores/Stores.js")
    }
  },

  methods: {
    resetForm: function(){
      this.form = {name: "",domain: "",icon: "",kind: "slack"};
      this.errors = {name: "",domain: "",icon: ""};
    },

    validation: function(){
      let flag = true;
      const formData = this.form;

      Object.keys(this.errors).map((name) =>{
        this.errors[name] = "";
      })

      Object.keys(formData).map((name) => {
        if(formData[name]) return;
        this.errors[name] = `Please enter team ${name}.`;
        flag = false;
      });
      return flag;
    },

    addTeam: function(){
      if(!this.validation()) return;

      const formData = this.form;
      this.resetForm();

      this.stores.TeamsStore.setTeams(
        this.stores.TeamsStore.getTeams().concat(
          [{
            id     : formData.name,
            name   : formData.name,
            domain : formData.kind == "slack" ? `${formData.domain}.slack.com` : `discordapp.com/${formData.domain}`,
            icon   : formData.icon,
            color  : formData.kind == "slack" ? "#4D394B" : "#2E3136",
            unread : 0
          }]
        )
      );

      this.stores.TeamsStore.setActiveTeam(formData.name);
      this.stores.ModalStore.setVisible(false);
    },

    hideModal: function(){
      this.resetForm();
      this.stores.ModalStore.setVisible(false);
    }
  }
}
</script>

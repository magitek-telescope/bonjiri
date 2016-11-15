<template lang="html">
  <div :class="isshow ? 'teamview show' : 'teamview hide'" :data-id="teamdata.id">
    <webview allowpopups autosize="on" :src="'https://'+teamdata.domain"></webview>
  </div>
</template>

<style scoped>
.teamview{
  width: calc(100% - 200px);
  height: 100%;
  display: none;
}

.teamview.show{
  display: flex;
}

.teamview.hide{
  display: flex;
  width: 0.05px;
}

webview{
  width: 100%;
  height: 100%;
}
</style>

<script>

/*globals openExternal */

module.exports = {
  props: ["teamdata", "isshow"],
  data: () => {
    return {
      stores: require("../stores/Stores.js")
    }
  },
  mounted: function(){
    const self = this;
    const $ = e=>document.querySelector(e);
    const webview = $(`.teamview[data-id='${this.teamdata.id}'] webview`);
    const checkUnread = ()=>{
      webview.executeJavaScript(
        "{unread:document.title}",
        false,
        function(title){
          console.log(title);
          self.stores.TeamsStore.setTeams(
            self.stores.TeamsStore.getTeams().map((team) => {
              if(team.id == self.teamdata.id) team.unread = title.slice(0,1) == "!";
              return team;
            })
          );
        }
      );
    };

    webview.addEventListener("new-window", openExternal);

    webview.addEventListener("did-stop-loading", ()=>{
      // webview.openDevTools();
      webview.executeJavaScript(
        "{color:$('#col_channels_bg').css('backgroundColor')}",
        false,
        function(color){
          const teamData = self.stores.TeamsStore.getTeams().map((team) => {
            if(team.id == self.teamdata.id) team.color = color;
            return team;
          })
          self.stores.TeamsStore.setTeams(teamData);
        }
      );
      setInterval(checkUnread, 1000);
    });
  }
}
</script>

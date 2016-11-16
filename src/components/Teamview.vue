<template lang="html">
  <div :class="isshow ? 'teamview show' : 'teamview hide'" :data-id="teamdata.id" :data-isdiscord="teamdata.domain.indexOf('discordapp') != -1 ? '1' : '0'">
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
  opacity: 0;

  position: absolute;
  right: 0;
  top: 0;
  pointer-events: none;
}

webview{
  width: 100%;
  height: 100%;
}

.teamview.show[data-isdiscord="1"]{
  position: absolute;
  top: 0;
  right: 0;

  width: calc(100vw - 120px);
}

.teamview.show[data-isdiscord="1"] webview{
  width: calc(100vw - 120px);
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
    if(this.teamdata.domain.indexOf("slack.com") == -1) return;

    const self = this;
    const $ = e=>document.querySelector(e);
    const webview = $(`.teamview[data-id='${this.teamdata.id}'] webview`);
    const checkUnread = () => {
      webview.executeJavaScript(
        "{unread:document.title}",
        false,
        function(title){
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

const TeamsStore = function(){
  this.teams = [];
  this.teamColors = {};
  this.activeTeam = "";

  if("teams" in localStorage){
    this.teams = JSON.parse(localStorage.teams);
  }

  this.getTeams = () => {
    return this.teams;
  };

  this.setTeams = (data) => {
    this.teams = data;
    localStorage.teams = JSON.stringify(this.teams);
  };

  this.getActiveTeam = () => {
    return this.activeTeam;
  };

  this.setActiveTeam = (data) => {
    this.activeTeam = data;
  };
};

module.exports = new TeamsStore();

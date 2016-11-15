const TeamsStore = function(){
  this.teams = [];
  this.teamColors = {};

  if("teams" in localStorage){
    this.teams = JSON.parse(localStorage.teams);
  }

  this.getTeams = () => {
    return this.teams;
  };

  this.setTeams = (data) => {
    this.teams = data;
    localStorage.teams = JSON.stringify(this.teams);
  }
};

module.exports = new TeamsStore();

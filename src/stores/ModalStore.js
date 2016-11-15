const ModalStore = function(){
  this.visible = false;

  this.getVisible = () => {
    return this.visible;
  };

  this.setVisible = (data) => {
    this.visible = data;
  }
};

module.exports = new ModalStore();

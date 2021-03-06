angular.module('buildBikes')
       .controller('BikesController', BikesController);

BikesController.$inject = ['$http'];

function BikesController($http){
  
  var self = this;
  self.spinWheel       = spinWheel;
  self.showBikes       = showBikes;
  self.getPartCategory = getPartCategory;
  self.saveBike        = saveBike;
  self.deleteBike      = deleteBike;
  self.getParts        = getParts;
  self.selectBike      = selectBike;
  self.newBike         = newBike;
  self.parts           = [];
  self.bikes           = [];
  self.displayedBike   = {};
  self.clearBike       = clearBike;
  self.showTab         = showTab;
  self.completedBikesTab = false;
  self.partsTab        = false;
  self.nameTab         = false;
  self.colorTab        = false;
  self.newTab          = false;
  self.saveTab         = false;
  showBikes();

  function showTab(tabText) {
    self.completedBikesTab = false;
    self.partsTab = false;
    self.nameTab = false;
    self.colorTab = false;
    self.newTab = false;
    self.saveTab = false;

    if (tabText === 'completedBikesTab') {
      self.completedBikesTab = true;
    }else if (tabText === 'partsTab') {
      self.partsTab = true;
    }else if(tabText === 'colorTab') {
      self.colorTab = true;
    }else if(tabText === 'nameTab') {
      self.nameTab = true;
    }else if(tabText === 'newTab') {
      self.newTab = true;
    }else if(tabText === 'saveTab') {
      self.saveTab = true;
    }
  }

  function newBike() {
    self.clearBike();
    self.showTab("newTab");
  }

  function getParts() {

      $http
        .get('/parts')
        .then(function(response){
          self.parts = response.data;
      });

  }

  function getPartCategory(category){
   $http
     .get('/category/' + category)
     .then(function(response){
       self.parts = response.data;
     })
  }

  function saveBike(){
      if(self.displayedBike._id) {
          $http
            .put('/bikes/' + self.displayedBike._id, self.displayedBike)
            .then(function(response){ 
              self.displayedBike = response.data.bike;
          }); 

      } else {
          $http
            .post('/bikes', self.displayedBike)
            .then(function(response){ 
              self.displayedBike = response.data.bike;
          });

      } 
    showBikes(); 
    self.showTab("saveTab");
  }

  function getBike(id) {
      $http
        .get('/bikes/' + id)
        .then(function(response){

          self.displayedBike = response.data.bike;
      });
  }

  function showBikes() {
      $http
        .get('/bikes/')
        .then(function(response){

          self.bikes = response.data;
      });

  }

  function selectBike(bike) {

    self.displayedBike = bike;
    console.log("working");

  }

  function deleteBike(bike){
    $http
      .delete('/bikes/' + bike._id)
      .then(function(response){
        var index = self.bikes.indexOf(bike);
        self.bikes.splice(index, 1);
        self.clearBike();
      });
  }

  function clearBike(){
    self.displayedBike = {};
  }

  function spinWheel(){

    spinWheels1 = document.getElementsByClassName('frontWheel');
    spinWheels2 = document.getElementsByClassName('rearWheel');
    spinWheels1[0].classList.add('spinWheel');
    spinWheels2[0].classList.add('spinWheel');

  }

}
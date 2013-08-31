/*
var Products = new Meteor.Collection("Products");

if (Meteor.isClient) {

Template.Products.ProductArr = function(){
   return Products.find({}, {sort: {Name: 1}});
};


Template.Products.events = {
   "click .Product" : function(){
      if(this.InStock)
         confirm("Would you like to buy a " + this.Name + " for " + this.Price + "$");
      else
         alert("That item is not in stock");
   }
 }


};

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
*/
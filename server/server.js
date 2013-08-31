// server/server.js
Ribbits = new Meteor.Collection('ribbits');
Meteor.publish('ribbits', function () {
  return Ribbits.find({});
});
// client/main.js
Ribbits = new Meteor.Collection('ribbits');
 
Template.buddiescontent.helpers({
  fullName: function () {
    return Meteor.user().profile.name;
  },
 
  userName: function () {
    return Meteor.user().username;
  },
 
  noOfRibbits: function () {
    var ribbits = Ribbits.find({user_id: Meteor.userId()}),
      retVal;
    if (ribbits.count() === 1) {
      retVal = "1 Ribbit";
    } else {
      retVal = ribbits.count() + " Ribbits";
    }
    return retVal;
  },
 
  lastRibbit: function () {
    var lastRibbit = Ribbits.findOne({user_id: Meteor.userId()}, {sort: {created_at: -1}}),
      retVal;
 
    if (lastRibbit) {
      retVal = lastRibbit.ribbit;
    } else {
      retVal = 'This user has no Ribbits';
    }
 
    return retVal;
  },

  ribbits: function () {
    return Ribbits.find({}, {sort: {created_at: -1}});
  },

  buddyFullName: function (ribbitUserId) {
    var theUser = Meteor.users.findOne({_id: ribbitUserId});
    return theUser.profile.name;
  },

  buddyUserName: function (ribbitUserId) {
    var theUser = Meteor.users.findOne({_id: ribbitUserId});
    return theUser.username
  },

  elapsedTime: function (text) {
    var currentDate = new Date(),
    ribbitDate,
    minutes_elapsed,
    hours_elapsed,
    days_elapsed,
    retVal,
    record = Ribbits.findOne({ribbit: text});

    ribbitDate = new Date(record.created_at);
    minutes_elapsed = (currentDate - ribbitDate) / 60000;
    if (minutes_elapsed > 60) {
      hours_elapsed = minutes_elapsed / 60;
      if (hours_elapsed > 24) {
        days_elapsed = hours_elapsed / 24;
        retVal = parseInt(days_elapsed, 10) + "d";
      } else {
        retVal = parseInt(hours_elapsed, 10) + "h";
      }
    } else {
      retVal = parseInt(minutes_elapsed, 10) + "m";
    }
    return retVal;
  }


});


Template.content.helpers({
  currentPage: function (type) {
    var thePage = Session.get("currentPage");
    return thePage === type;
  }
});
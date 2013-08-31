// client/client.js

Session.set("currentPage", "buddies");

Ribbits = new Meteor.Collection('ribbits');
Meteor.subscribe('ribbits');

// handling click event on the Log In button
Template.header.events({
  'click #btnLogOut': function (event, template) {
    if (Meteor.userId()) {
      Meteor.logout();
    } else {
      var userName     = template.find('#username').value,
        userPassword = template.find('#password').value;
      Meteor.loginWithPassword(userName, userPassword, function (error) {
        if (error) {
          console.log(error);
        }
      });
    }
  }

  'click #public': function (event, template) {
    Session.set("currentPage", "public");
  },

  'click #buddies': function (event, template) {
    Session.set("currentPage", "buddies");
  },

});

Template.homecontent.events({
  'click #btnCreateAccount': function (event, template) {
    var userEmail = template.find('#email').value,
      userName  = template.find('#newusername').value,
      password  = template.find('#newpassword').value,
      password2 = template.find('#password2').value,
      name      = template.find('#fullname').value;
 
    Accounts.createUser({
      username: userName,
      email:    userEmail,
      password: password,
      profile: {
        name: name
      }
    }, function (error) {
      if (error) {
        console.log("Cannot create user");
      }
    });
  }
});

// handling the click event on the Ribbit button
Template.buddiescontent.events({
  'click #createTheRibbit': function (event, template) {
    var ribbitContent= template.find('.ribbitText').value;
 
    Ribbits.insert({
      user_id: Meteor.user()._id,
      ribbit: ribbitContent,
      created_at: new Date()
    });
    template.find('.ribbitText').value = "";
  }
});

Template.public.helpers({
  ribbits: function () {
    return Ribbits.find({}, {sort: {created_at: -1}});
  },
 
  publicUserFull: function (currentRibbitId) {
    var theUser = Meteor.users.findOne({_id: currentRibbitId});
 
    return theUser.profile.name;
  },
 
  publicUserName: function (currentRibbitId) {
    var theUser = Meteor.users.findOne({_id: currentRibbitId});
 
    return theUser.username;
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
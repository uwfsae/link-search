Links = new Mongo.Collection('links');

Links.attachSchema(new SimpleSchema({
  _name: {
    type: String,
    label: "Link Name",
    max: 200
  },
  description: {
    type: String,
    label: "Description"
  },
  url: {
    type: String,
    label: "Url",
  }
}));

Links.allow({
  insert: function(userId, doc) {
    // Allow anyone to insert links
    return true;
  },
});

if(Meteor.isServer) {
  Links._ensureIndex({_name: 1, description: 1});
}


Router.configure({
  layoutTemplate: 'Layout'
});

Router.route('/', function () {
  this.render('Home');
}, {
  name: 'home'
});

Router.route('/add', function () {
  this.render('Add');
}, {
  name: 'add'
});

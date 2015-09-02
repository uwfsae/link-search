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

if(Meteor.isServer) {
  Links._ensureIndex({_name: 1, description: 1});
}

Router.route('/', function () {
  this.render('Home');
});

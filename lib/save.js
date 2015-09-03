SaveLink = function(name, data) {
  data = _.clone(data);
  delete data._id;
  Links.update(name, {$set: data}, {upsert: true});
};
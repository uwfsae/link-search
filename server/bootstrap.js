// Prepopulate the database if the database is empty.

var linksDump = Assets.getText('links.dump').split('\n').filter(function(p) {
  return !!p;
});

if(Links.find().count() < linksDump.length) {
  console.log("adding initial set of links (%s)", linksDump.length);
  for(var lc=0; lc<linksDump.length; lc++) {
    if(lc > 0 && lc % 500 == 0) {
      console.log("  added links: ", lc);
    }
    var p = linksDump[lc];
    p = EJSON.parse(p);
    SaveLink(p._name, p);
  };
  console.log("completed!");
}




SearchSource.defineSource('links', function(searchText, options) {
  var options = {sort: {_name: -1}, limit: 20};

  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {_name: regExp},
      {description: regExp}
    ]};

    return Links.find(selector, options).fetch();
  } else {
    return Links.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}
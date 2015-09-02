var options = {
  keepHistory: 1000 * 60, // 1 minute
  localSearch: false
};
AutoForm.setDefaultTemplateForType('quickForm', 'plain-fieldset');

var fields = ['_name', 'description'];

LinkSearch = new SearchSource('links', fields, options);

function getLinks () {
  return LinkSearch.getData({
    transform: function(matchText, regExp) {
      return matchText.replace(regExp, "<b>$&</b>")
    },
    sort: {_name: 1}
  });
}

Template.searchResults.helpers({
  getLinks: getLinks,
});
Template.searchBox.helpers({
  isLoading: function() {
    return LinkSearch.getStatus().loading;
  }
});

Template.searchResult.events({
    'click .del': _.throttle(function(e){
      Links.remove({_id: this._id});
    }, 200)

});

Template.searchResults.rendered = function() {
  LinkSearch.search('');
};

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {

    // If enter was pressed, navigate to the first link
    if (e.which === 13) {
      var data = getLinks();
      if (data.length > 0) {
        window.location.href = data[0].url;
      }
    }

    var text = $(e.target).val().trim();

    // Perform Search
    LinkSearch.search(text);

    // Update clear X
    if (text.length > 0) {
      $('.searchRemove').show();
    } else {
      $('.searchRemove').hide();
    }
  }, 200),
  "click .searchRemove": function(e) {
    $(e.target).hide();
    $('#search-box').val('').focus().trigger('keyup');
  }
});

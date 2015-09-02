var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
AutoForm.setDefaultTemplateForType('quickForm', 'plain-fieldset');

var fields = ['_name', 'description'];

LinkSearch = new SearchSource('links', fields, options);

Template.searchResults.helpers({
  getLinks: function() {
    return LinkSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")
      },
      sort: {_name: -1}
    });
  },

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
    var text = $(e.target).val().trim();
    LinkSearch.search(text);
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

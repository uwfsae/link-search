/** Constants **/
AppName = "UW FSAE Go Links";

/** Setup **/
var options = {
  keepHistory: 1000 * 60, // 1 minute
  localSearch: false
};

var fields = ['_name', 'description'];

LinkSearch = new SearchSource('links', fields, options);

/** Global Helpers **/
Template.registerHelper("AppName", function () {
    return AppName;
});

Template.Home.rendered = Template.Add.rendered = function () {
  $('input').first().focus();
}

/** searchResult **/
Template.searchResults.helpers({
  getLinks: GetLinks,
});

Template.searchResults.rendered = function() {
  LinkSearch.search('');
};

/** Search Box **/
Template.searchBox.helpers({
  isLoading: function() {
    return LinkSearch.getStatus().loading;
  }
});

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {

    // If enter was pressed, navigate to the first link
    if (e.which === 13) {
      document.querySelector('.result a').click();
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

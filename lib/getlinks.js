GetLinks = function () {
  return LinkSearch.getData({
    transform: function(matchText, regExp) {
      return matchText.replace(regExp, "<b>$&</b>")
    },
    sort: {_name: 1}
  });
}
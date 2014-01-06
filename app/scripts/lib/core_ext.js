define(function() {

  var CoreExt = {

    include: function() {

      String.prototype.insert = function(index, str) {
        if (index > 0) {
          return this.substring(0, index) + str + this.substring(index, this.length);
        } else {
          return string + this;
        }
      };
    }
  };

  return CoreExt;
});

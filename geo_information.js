/**
 * Geo Information - ProBoards Plugin
 * Version 1.0.0
 * Keys Used: None
 *
 * Written by Bob Hensley (bob@bobbyhensley.com)
 *
 * Licensed under GNU General Public (GPL) Version 2
 * See http://choosealicense.com/licenses/gpl-v2/ for license details
 */

var GeoInformation = {

  /**
   * URL of the API we're to use
   *
   * @type string (URL)
   */
  api: 'http://freegeoip.net/',
  
  /**
   * What format we want the API to return to us
   *
   * @type string
   */
  format: 'json',

  /**
   * Snag the moderation menu for each post, get the IP of the user and
   * append our new menu item, with its onclick functionality.
   *
   * @return void
   */
  init: function () {
    var self = this;

    $('.searchIP.ui-menu-has-sub-menu > ul').each(function () {
      var ip = $(this).parent().data('ip');

      $(this).append($('<li></li>').html(
        $('<a></a>').text('Geo Info')
        .click(function () {
          var data = self.retrieve_data(ip);
        })
      ));
    });
  },

  /**
   * Send the request off to the API, put the details we wish to use into
   * a JSON object and then send that off to be displayed.
   *
   * @return void
   */
  retrieve_data: function (ip) {
    var ret = null,
      self = this;

    $.get(this.api + this.format + '/' + ip, function (data) {
      ret = {
        'country':  data.country_name,
        'city':     data.city,
        'region':   data.region_name,
        'zip':      data.zipcode,
        'ip':       data.ip
      };
    }).done(function () {
      self.display_data(ret);
    });
  },

  /**
   * Create a modal window displaying the data we retrieved.
   *
   * @return void
   */
  display_data: function (data) {
    pb.window.dialog('geoinfo-' + data.ip, {
      'title': 'Geo Information for ' + data.ip,
      'show': true,
      'height': 120,
      'width': 350,
    }).html('<strong>Country:</strong> ' + data.country + '<br><strong>Region:</strong> ' + data.region + '<br><strong>City:</strong> ' + data.city + '<br><strong>Zip Code:</strong> ' + data.zip);
  }
};

$(document).ready(function () {
  GeoInformation.init();
});
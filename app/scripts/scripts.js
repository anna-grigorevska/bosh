"use strict";
'use strict';

$(document).ready(function () {
  $('.technics input').on('change', function (e) {
    $('.technics input').prop("disabled", true);
    $('.section-toggle.open').removeClass('open');
    setTimeout(function () {
      $('.' + e.target.id).addClass('open');
      $('.technics input').prop("disabled", false);
    }, 900);
  });
});
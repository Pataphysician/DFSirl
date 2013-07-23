util = {

  create2DArray: function (r, c) {
    var arr = [];
    for (var i=0;i<r;i++) {
       arr[i] = [];
       for (var j = 0; j < c; j++) {
         arr[i].push(0);
       }
    }
    return arr;
  },

  randomPickFromArray: function (array) {
    return array[Math.floor(Math.random() * array.length)];
  }

};

// TODO: remove timeout
setTimeout(function(){
  var max_cols = saveGame.find({userId: Meteor.userId()},{sort:[["timestamp", "desc"]]}).fetch()[0].board.width,
      max_rows = saveGame.find({userId: Meteor.userId()},{sort:[["timestamp", "desc"]]}).fetch()[0].board.height,
      grid = util.create2DArray(max_rows, max_cols),
      //pos = {row: 0, col: 0},
      pos = {row: saveGame.find({userId: Meteor.userId()}, {sort: [["timestamp", "desc"]]}).fetch()[0].placement[0].y, col: saveGame.find({userId: Meteor.userId()}, {sort: [["timestamp", "desc"]]}).fetch()[0].placement[0].x},
      colors = ['green', 'green', 'green', 'green-2', 'teal', 'teal-2'],
      i, j, randomBG, square;


  var moveToSpot = function(pos, r, c) {
    if (r < 0 || r >= max_rows) {
      return pos;
    }
    if (c < 0 || c >= max_cols) {
      return pos;
    }
    console.log('moving');
    $('#board').find('.center').removeClass('center');
    grid[r][c].addClass('center');
    centered(grid[r][c]);
    return {'row': r, 'col': c};
  }

  var centered = function(el){
    var grid = $('#board');
    var forestBg = $('.forest-bg');
    if (grid.length) {
      var leftPos = el.offset().left - grid.offset().left;
      var topPos = el.offset().top - grid.offset().top;

      grid.css({
        'margin-left': -(leftPos + 32),
        'margin-top': -(topPos + 32),
      });
      forestBg.css({
        'margin-left': -(leftPos / 4),
        'margin-top': -(topPos / 4),
      });

      /*setTimeout(function() {

      el.each(function(){
        if (isFullyVisible($(this)) === true){
          $(this).addClass('visible');
        } else {
          $(this).removeClass('visible');
        }
      });

      }, 200);*/
    }
  }

  /*var isFullyVisible = function (elem) {
    var off = elem.offset();
    var et = off.top;
    var el = off.left;
    var eh = elem.height();
    var ew = elem.width();
    var wh = window.innerHeight;
    var ww = window.innerWidth;
    var wx = window.pageXOffset;
    var wy = window.pageYOffset;
    return (et >= wy && el >= wx && et + eh <= wh + wy && el + ew <= ww + wx);
  }*/

  for (i = 0; i < max_rows; i++) {
    for (j =0; j < max_cols; j++) {
      randomBG = util.randomPickFromArray(colors);
      square = $(document.createElement('li')).addClass('square').addClass('floor-forest').attr('data-background', randomBG).append('<div class="icon"></div><div class="hero"></div><div class="skeleton-icon"></div><div class="chest-icon"></div>');
      $('#board').append(square);
      grid[i][j] = square;
    }
  }
  
  grid[0][0].addClass('center');
  
  grid[saveGame.find({userId: Meteor.userId()}, {sort: [["timestamp", "desc"]]}).fetch()[0].placement[2].y][saveGame.find({userId: Meteor.userId()}, {sort: [["timestamp", "desc"]]}).fetch()[0].placement[2].x].addClass('chest');
  
  grid[saveGame.find({userId: Meteor.userId()}, {sort: [["timestamp", "desc"]]}).fetch()[0].placement[1].y][saveGame.find({userId: Meteor.userId()}, {sort: [["timestamp", "desc"]]}).fetch()[0].placement[1].x].addClass('skeleton');
    
  //saveGame.find({userId: Meteor.userId()}, {sort: [["timestamp", "desc"]]}).fetch()[0].placement[0].x
  
  
  $('#board').css('width', $('.square').width() * max_cols);

  $('#board').show();


  moveToSpot(pos, pos.row, pos.col);
  
  $(document).keydown(function(e){
    // up key
    if (e.keyCode == 38) {
      pos = moveToSpot(pos, pos.row - 1, pos.col);
      return false;
    }
    // down key
    if (e.keyCode == 40) {
      pos = moveToSpot(pos, pos.row + 1, pos.col);
      return false;
    }
    // left key
    if (e.keyCode == 37) {
      pos = moveToSpot(pos, pos.row, pos.col - 1);
      return false;
    }
    // right key
    if (e.keyCode == 39) {
      pos = moveToSpot(pos, pos.row, pos.col + 1);
      return false;
    }
  });
}, 500);
(function(){
  "use strict"
  var root = this,
      $ = root.jQuery;
  if(typeof root.matrix === 'undefined'){ root.matrix = {} }

  var manager = {
    selects: {},

    init: function(){
      manager.selects = {
        $period: $('#period'),
        $support: $('#support'),
        $combine: $('#combine')
      }

      manager.selects.$period.on('change', function(){
        if(manager.profileId !== false){
          manager.hardReload();
        }
      });
      manager.selects.$support.on('change', function(){
        if(manager.profileId !== false){
          manager.softReload();
        }
      });
      manager.selects.$combine.on('change', function(){
        if(manager.profileId !== false){
          manager.hardReload();
        }
      });
      $('#wrapper').on('click', 'thead th', function(){
        var index = $(this).index() - 3;
        if(index > -1){
          matrix.template($('#wrapper'), 'browser-table', {
            results: matrix.browsers.getData(index),
            days: matrix.browsers.getDays()
          });
        }
      });
      manager.loadStats();
    },
    loadStats: function(){
      matrix.graph.init();
      matrix.browsers.fetchData(manager.renderStats);
    },
    renderStats: function(){
      var stats = matrix.browsers.getData(),
          days = matrix.browsers.getDays();
      matrix.template($('#wrapper'), 'browser-table', {
        results: stats,
        days: days
      });
      matrix.graph.addData(days, matrix.browsers.getSupportedData());
    },
    getPeriod: function(){
      return manager.selects.$period.val();
    },
    getSupport: function(){
      return parseInt(manager.selects.$support.val(), 10);
    },
    browserIndex: function(){
      return manager.selects.$combine.val();
    },
    reset: function(){
      $('#wrapper').html('');
      $('#graph').html('');
      matrix.graph.reset();
      matrix.browsers.reset();
      matrix.user.reset();
    },
    hardReload: function(){
      manager.reset();
      manager.loadStats();
    },
    softReload: function(){
      $('#wrapper').html('');
      $('#graph').html('');
      matrix.graph.reset();
      matrix.graph.init();
      manager.renderStats();
    }
  };
  root.matrix.manager = manager;
}).call(this);

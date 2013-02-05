(function(){
  "use strict"
  var root = this,
      $ = root.jQuery;
  if(typeof root.matrix === 'undefined'){ root.matrix = {} }

  var graph = {
    svg: false,
    x: false,
    y: false,
    width: 600,
    height: 300,

    init: function(){
      var padding = 20,
          axis, axisCords;

      graph.svg = d3.select('#graph')
        .append('svg:svg')
          .attr('width', (graph.width + padding * 2))
          .attr('height', (graph.height + padding * 2))
          .attr('class', 'multiLine')
        .append('g')
          .attr('transform', 'translate('+padding+','+padding+')'),
      axis = graph.svg.append('g').attr('class', 'axis'),
      axisCords = [
        // [ y1, y2, x1, x2 ]
        [ 0.5, graph.width+.5, graph.height+.5, graph.height+.5 ],
        [ 0.5, 0.5, 0.5, graph.height+.5 ],
        [ graph.width+.5, graph.width+.5, 0.5, graph.height+.5 ]
      ];

      graph.lines = graph.svg.append('g').attr('class', 'lines')

      axisCords.map(function(d){
        axis.append('svg:line')
          .attr('x1', d[0]).attr('x2', d[1]).attr('y1', d[2]).attr('y2', d[3]);
      });

      graph.y = d3.scale.linear().domain([0, 22]).range([graph.height, 0]).nice();

      graph.line = d3.svg.line()
        .interpolate('basis')
        .x(function(d, i) { return graph.x(i); })
        .y(function(d, i) { return graph.y(d); });
    },
    addData: function(days, data){
      var i, _i, line;
      graph.x = d3.scale.linear().domain([0, days.length-1]).range([0, graph.width]);

      line = graph.lines.selectAll('.line')
      .data(data);

      line.transition()
          .duration(750)
            .attr('d', function(d){ console.log(d); return graph.line(d.days); });

      
      line.enter()
          .append('path')
            .attr('class', 'line')
            .attr('d', function(d){ console.log(d); return graph.line(d.days); });
    }
  };
  root.matrix.graph = graph;
}).call(this);
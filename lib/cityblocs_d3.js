Meteor.cityblocs_functions = Meteor.cityblocs_functions || {};

Meteor.cityblocs_functions.draw_about_graph = function (destId) {
  var nodes = [{name: 'Adam'}, {name:'Paul'}, {name:'Michael'}];
  var links = [{source:0,target:1},{source:1,target:2},{source:2,target:0}];

  var width = $(destId).width() - 15;
  var height = 431;

  var svg = d3.select(destId).append('svg')
      .attr('width', width)
      .attr('height', height);

  var force = d3.layout.force()
      .nodes(d3.values(nodes))
      .links(links)
      .size([width, height])
      .friction(0.9)
      .linkDistance(300)
      .charge(-100)
      .on('tick', tick)
      .start();

  var link = svg.selectAll('.link')
      .data(force.links())
      .enter().append('line')
      .attr('class', 'link');

  var node = svg.selectAll('.node')
      .data(force.nodes())
      .enter().append('g')
      .attr('class', 'node')
      .call(force.drag);

  node.append('image')
      .attr('xlink:href', function(d) { return 'img/' + d.name + '.png'; })
      .attr('x', -70)
      .attr('y', -70)
      .attr('width', 140)
      .attr('height', 140);

  node.append('text')
      .attr('dx', 55)
      .attr('dy', 55)
      .attr('width', 170)
      .attr('class', 'devname')
      .text(function(d) { return d.name; });

  function tick () {
    node.attr('transform', function(d) {
      d.x = Math.max(70, Math.min(width - 102, d.x));
      d.y = Math.max(70, Math.min(height - 73, d.y));
      return 'translate(' + d.x + ',' + d.y + ')';
    });
    link.attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });
  }
};

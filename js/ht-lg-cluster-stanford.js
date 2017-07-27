function ht_lg_cluster_stan() {

var svg = d3.select("#ht-lg-cluster-stan").append("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 65},
    width = 960,
    height = 500,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
	.rangeRound([0, width])
	.paddingInner(0.1);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

d3.tsv("./data/cluster-stanford.tsv", type, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.sentiment; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("# of ads/total ads per cluster");

  g.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.sentiment); })
      .attr("width", x.range()[1]/6)
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); });
	  //.style("fill", function(d) { return d.color; });
	  //.style("fill", function(d) { return color(d.name); });
	  //.style("fill", color);
});

function type(d) {
  d.frequency = +d.frequency;
  return d;
}


}

ht_lg_cluster_stan();
var nv = require('../lib/nv.d3.js');

var _data = {
    
    skills:[
        {
            "key": "p_skills",
            "color": "steelblue",
            "values": [
              { 
                "label" : "1 Begginer" ,
                "value" : 2
              } , 
              { 
                "label" : "2" ,
                "value" : 1
              } , 
              { 
                "label" : "3" ,
                "value" : 1
              } , 
              { 
                "label" : "4" ,
                "value" : 1
              } , 
              {
                "label" : "5 Expert" ,
                "value" : 0
              }
            ]
        }
    ],
    last:[ 
        {
          key: "Cumulative Return",
          values: [
            { 
              "label" : "< 6 months ago" ,
              "value" : 3
            } , 
            { 
              "label" : "6 months ago" , 
              "value" : 1
            } , 
            { 
              "label" : "1 year ago" , 
              "value" : 0
            } , 
            { 
              "label" : "2 years ago" , 
              "value" : 0
            } , 
            { 
              "label" : "> 2 years ago" , 
              "value" : 1
            } , 
          ]
        }
    ],
    os:[{"label" : "Mac OS" , "value" : 4},{"label" : "Windows" , "value" : 1},{"label" : "Linux" , "value" : 0}],
    lang:[
        {"label" : "JavaScript" , "value" : 1},
        {"label" : "C" , "value" : 0},
        {"label" : "C++" , "value" : 1},
        {"label" : "Python" , "value" : 2},
        {"label" : "Java" , "value" : 1},
        {"label" : "Ruby" , "value" : 0},
        {"label" : "Perl" , "value" : 0},
        {"label" : "PHP" , "value" : 0},
        {"label" : "other" , "value" : 0}
    ],
    techs:[
        {
            "key": "Weighted Average",
            "color": "steelblue",
            "values": [
              { 
                "label" : "HyperText Markup Language (HTML)" ,
                "value" : 4
              } , 
              { 
                "label" : "Cascading Style Sheets (CSS)" ,
                "value" : 3
              } , 
              { 
                "label" : "Node Package Manager (NPM)" ,
                "value" : 1.6
              } , 
              { 
                "label" : "Browserify" ,
                "value" : 1.20
              }
            ]
        }
    ]
};

function donnutChart(el, data){
    var chart = nv.models.pieChart()
      .x(function(d) { return d.label; })
      .y(function(d) { return d.value; })
      .showLabels(true)     //Display pie labels
      .labelThreshold(0.05) //Configure what type of data to show in the label. Can be "key", "value" or "percent"
      .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
      .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
      ;

    d3.select(el)
        .datum(data)
        .transition().duration(350)
        .call(chart);

  return chart;
}

function multiBarHorizontalChart(el, data, yValues){
    
    yValues = (yValues !== 'undefined') ? yValues : [];
    
     var chart = nv.models.multiBarHorizontalChart()
        .x(function(d) { return d.label; })
        .y(function(d) { return d.value; })
        .margin({top: 30, right: 20, bottom: 50, left: 175})
        .showValues(true).showControls(false)
        .forceY(yValues);

    chart.yAxis
        .tickFormat(d3.format(',.2f'));
    
    //chart.xAxis
      //  .tickFormat(d3.format(',.2f'));

    d3.select(el)
        .datum(data)
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
}

function discreteBarchar(el, data){

    var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label; })    //Specify the data accessors.
      .y(function(d) { return d.value; })
      .showValues(true);

    
    
  d3.select(el)
      .datum(data)
      .call(chart);

  nv.utils.windowResize(chart.update);

  return chart;
}

function _chart(el){
    var id = el.id;
    
    if(id === 'skills'){
        nv.addGraph(multiBarHorizontalChart(el, _data[id]));
    }else if(id === 'last'){
        nv.addGraph(discreteBarchar(el, _data[id]));
    }else if(id === 'os' || id === 'lang'){
        nv.addGraph(donnutChart(el, _data[id]));
    }else if(id === 'techs'){
        nv.addGraph(multiBarHorizontalChart(el, _data[id], [0,10]));
    }
    
}

function chartFactory(){}

chartFactory.slideChange = function(e){
    
    var el = e.currentSlide.querySelector('.chart');
    if(el !== null) _chart(el);
};

module.exports = chartFactory;
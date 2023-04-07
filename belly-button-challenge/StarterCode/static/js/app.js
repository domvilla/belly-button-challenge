// Set url as constant
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

//d3 func
d3.json(url).then(function(data) {
    console.log(data);
});

// build charts
function Charts(sample) {
  
  // sam data
  d3.json(url).then((data) => {
    var samples_values= data.samples;
    var array= samples_values.filter(sampleobject => 
        sampleobject.id == sample);
    var output= array[0]
  
    var ids = output.otu_ids;
    var l = output.otu_labels;
    var v = output.sample_values;

    // bar chart
    var bar_chart =[
    {
      y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x:v.slice(0,10).reverse(),
      text:l.slice(0,10).reverse(),
      type:"bar",
      orientation:"h"

    }
    ];

     var bar_l = {
    title: "TOP 10",
    margin: { t: 50, l: 180 }
    };

     // Plot
    Plotly.newPlot("bar", bar_chart, bar_l);


    // bubble chart
    var Bubbles = {
      margin: { t: 0 },
      xaxis: { title: "ID OTU" },
      hovermode: "closest",
      };
  
      var Bubble_data = [ 
      {
        x: ids,
        y: v,
        text: l,
        mode: "markers",
        marker: {
          color: ids,
          size: v,
          }
      }
    ];
    
    // Plot 
    Plotly.newPlot("bubble", Bubble_data, Bubbles);
    });
}

//  MetaData
function Meta_data(sample) {
    d3.json(url).then((data) => {
        var metadata_value= data.metadata;
        var array= metadata.filter(sampleobject => 
            sampleobject.id == sample);
        var output= array[0]
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(output).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
}

// Create a function
function init() {

    
    var selected = d3.select("#selDataset"); 

    // Populate select options with list of samples
    d3.json(url).then((data) => {
        var sample_names = data.names;
        sample_names.forEach((sample) => {
            selected
            .append("option")
            .text(sample)
            .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots
        const firstSample = sample_names[0];
        Charts(firstSample);
        Meta_data(firstSample);
    });
}

// Grab new data and build charts/metadata when new sample is selected
function optionChanged(newSample) {
    Charts(newSample);
    Meta_data(newSample);
}

// Initialize the dashboard
init();
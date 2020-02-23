function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var meta_url = `/metadata/${sample}`;
  var meta_data = d3.json(meta_url).then(function(data) {
    console.log(data);
    var age = data.AGE;
    console.log(age);
  
    // Use d3 to select the panel with id of `#sample-metadata`
    var metaPanel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    metaPanel.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(data).forEach(function([key, value]) {
      // Append a cell to the row for each value
      // in the weather report object
      var key_value = `${key}:  ${value}`;
      var para = metaPanel.append("p");
      console.log(key_value);
      para.text(key_value);
    });
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
  });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var sample_url = `/samples/${sample}`;
  d3.json(sample_url).then(function(data){
    var top_sample_values = data.sample_values.slice(0,10);
    var top_otu_labels = data.otu_labels.slice(0,10);
    var top_otu_ids = data.otu_ids.slice(0,10);
    console.log(top_otu_ids);
    
    var pie_data = [{
      values: top_sample_values,
      labels: top_otu_ids,
      type: 'pie'
    }]
    
    var pie_layout = {
      height: 400,
      width: 500
    };
    
    Plotly.newPlot('pie', pie_data, pie_layout);

  });
  
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log(firstSample);
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

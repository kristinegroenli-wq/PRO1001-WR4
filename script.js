fetch('https://fakestoreapi.com/products') 
    .then(response => { 

        if (!response.ok) { 
            throw new Error('Could not get products'); 
        }

        return response.json(); 
    })

    .then(function (products) { 

        
      const names = products.map(product => product.title);
      const scores = products.map(product => product.rating.rate);
      const category = products.map(product => product.category);


      //Creating a counter for the specified ranges. Every range starts at 0, and then the code adds 1 
      // if it finds any product that matches the specified range
      const ranges = {
        'Under 2': 0,
        '2 to under 3': 0,
        '3 to under 4': 0,
        '4 to 5': 0
      };

      //Using the forEach method described in module 5 to go through all the scores in the array. 
      // I used the highchart assist to help me figure out how to write the function   
      products.forEach(product => {
        const score = product.rating.rate;

        if (score < 2) {
          ranges['Under 2']++;
        } else if (score < 3) {
          ranges['2 to under 3']++;
        } else if (score < 4) {
          ranges['3 to under 4']++;
        } else {
          ranges['4 to 5']++;
        }
      });

      Highcharts.chart('score-chart', {
        chart: { type: 'column' },
        title: { text: 'Product rating scores' },
        xAxis: {
          title: { text: 'Products' },
          categories: names,
          labels: { rotation: -45 }
        },
        yAxis: {
          title: { text: 'Rating score' },
          min: 0,
          max: 5
        },
        accessibility: { enabled: true },
        series: [{
          name: 'Rating',
          data: scores
        }]
      });

      Highcharts.chart('rating-range-chart', {
        chart: { type: 'pie' },
        title: { text: 'Products by rating range' },
        accessibility: { enabled: true },
        series: [{
          name: 'Products',
          data: Object.entries(ranges).map(([name, count]) => ({
            name: name,
            y: count
          }))
        }]
      });
    })

   .catch(err => {
    console.error('Failed to fetch data:', err);
  });
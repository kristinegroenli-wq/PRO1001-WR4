

fetch('https://fakestoreapi.com/products')
  .then(Response => Response.json())
  .then(products => {
    console.log(products);
   
    const categories = products.map(p => p.title);
    const values = products.map(p => p.rating.rate);

Highcharts.chart('RatingDistribution', {
      chart: { type: 'column' },
      title: {
    text: 'Example Chart With Accessibility'
  },
  xAxis: {
    categories: categories,
    title: { text: 'Category' }
  },
  yAxis: {
    title: { text: 'Value' }
      },
      series: [{
        name: 'Rating',
        data: values
      }]
    });
  })
  .catch(err => {
    console.error('Failed to fetch data:', err);
  });
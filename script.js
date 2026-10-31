

fetch('https://fakestoreapi.com/products')
  .then(Response => Response.json())
  .then(products => {
    console.log(products);
   
        const ratedProducts = products.filter(
            product => Number.isFinite(product.rating?.rate)
        );

        const bucketCount = 10;
        const counts = Array(bucketCount).fill(0);

        ratedProducts.forEach(product => {
            const rating = product.rating.rate;

            if (rating >= 0 && rating <= 5) {
                const bucket = Math.min(
                    Math.floor(rating * 2),
                    bucketCount - 1
                );
                counts[bucket]++;
            }
        });

        const categories = counts.map((_, index) => {
            const start = (index * 0.5).toFixed(1);
            const end = ((index + 1) * 0.5).toFixed(1);

            return index === bucketCount - 1
                ? `${start}–${end}`
                : `${start}–<${end}`;
        });

        Highcharts.chart(RatingDistribution, {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Product Rating Distribution'
            },
            subtitle: {
                text: 'Ratings grouped into 0.5-star columns'
            },
            xAxis: {
                categories,
                title: {
                    text: 'Rating (out of 5)'
                }
            },
            yAxis: {
                min: 0,
                allowDecimals: false,
                title: {
                    text: 'Number of products'
                }
            },
            tooltip: {
                pointFormat: '<b>{point.y}</b> products'
            },

            accessibility: {
             enabled: true,
             description:
              'A simple column chart showing the product rating distribution. ' +
              'Each column represents the number of products in the rating range.'
           },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'Products',
                data: counts
            }]
        });

        const topProducts = [...ratedProducts]
            .sort((a, b) => b.rating.rate - a.rating.rate)
            .slice(0, 10);

        Highcharts.chart(TopRatedProducts, {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Top Rated Products'
            },
            xAxis: {
                categories: topProducts.map(product => product.title),
                reversed: true,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                max: 5,
                title: {
                    text: 'Rating (out of 5)'
                }
            },
            tooltip: {
                formatter: function () {
                    const product = topProducts[this.point.index];

                    return `<b>${product.title}</b><br>
                        Rating: ${product.rating.rate} / 5<br>
                        Rating count: ${product.rating.count}`;
                }
            },

            accessibility: {
             enabled: true,
             description:
             'A simple bar chart showing the top 10 products. ' +
             'Each bar represents the product rating.'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{y:.2f}'
                    }
                }
            },
            series: [{
                name: 'Rating',
                data: topProducts.map(product => product.rating.rate)
            }]
        });
    })
    
  .catch(err => {
    console.error('Failed to fetch data:', err);
  });

  
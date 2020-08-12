https://www.chartjs.org/

### Usage way 1:
**ChartJS** component can be used directly with these properties:

          type='bar'
          title='Sales'
          labels={["Jan", "Feb", "March"]}
          data={[86, 2, 115]}

          (optional:)
          color={[]} or 'name'

**type** can be any chartjs type supported by ChartJS 2.9.3
**title** is the title of the chart

**labels** are the titles for data.
**data** is the actual data. 
Note that labels and data walk hand in hand so the arrays must match each other.
**color**
color is the backgroundcolor and can be either predefined theme under style/chartjs/colors (String name) or your own Array of colors.
color={['red','green','orange']} or 'oceanColors'

### Usage way 2:
(Requires one to dig deeper into components)
Chartjs can be used inside a form model defined under models like so:

        {
            title: 'Sales',
            type: FieldType.Chart,
            charttype: ChartType.Bar,
            db: 'salesdata',
        },

**title** is the title of the chart
**type** field type is chart
**charttype** can be any chartjs type supported by ChartJS 2.9.3

BUT This is not enough as such. Here comes the development part !!!

**db** is the key picked from attributes for data.
Component inside FormEntries.js needs to match backend response format for this type of data or transformed to usable format after call (Best place Redux).

Inside FormEntries ChartJS component takes properties same as above (Way1):

          type='bar'
          title='Sales'
          labels={["Jan", "Feb", "March"]}
          data={[86, 2, 115]}

Missing attributes will not crash react but you will also get no chart rendered.
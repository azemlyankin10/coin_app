import { el, mount, setChildren } from "redom"
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
)


const graphComponent = (data) => {
  const container = el('div', {class: 'graph'})
  const title = el('h2', {class: 'graph__title'}, 'Динамика баланса')
  const canvas = el('canvas', {height: 100})

  new Chart(canvas, {
    type: 'bar',
    data: {
        labels: data.currentMonths,
        datasets: [{
            data: data.currentSum,
            backgroundColor: '#116ACC',
        }]
    },
    options: {

      scales: {
        y: {
          position: 'right',
          grid: {
            display: false
          },

          ticks: {
            color: 'black',
            font: {
              size: '20'
            },
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: 'black',
            font: {
              size: '20'
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      layout: {
        padding: {

        }
      }
    },
    plugins: [
      {
        beforeDraw(chart, args, options) {
          const {ctx, chartArea: {left, top, width, height}} = chart;
          ctx.save();
          ctx.strokeStyle = options.borderColor;
          ctx.lineWidth = 1;
          ctx.setLineDash(options.borderDash || []);
          ctx.lineDashOffset = options.borderDashOffset;
          ctx.strokeRect(left, top, width, height);
          ctx.restore();
        }
      }
    ]
  })


  setChildren(container, [
    title,
    canvas
  ])
  return container
}

export default graphComponent

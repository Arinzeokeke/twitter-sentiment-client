import React from 'react'
import PropTypes from 'prop-types'
import { Doughnut, Line } from 'react-chartjs-2'
import { Grid, Row, Col } from '@smooth-ui/core-sc'

const getFrequency = data => {
  let counts = {}

  data.forEach(d => {
    const rounded = Math.round(d * 10) / 10
    counts[rounded] = counts[rounded] ? counts[rounded] + 1 : 1
  })
  const orderedLabels = Object.keys(counts).sort()
  const vals = orderedLabels.map(l => counts[l])
  return [orderedLabels, vals]
}

const StatisticChart = props => {
  const { keyword, stats, count, time_elapsed_in_sec } = props
  if (!stats) {
    return null
  }
  const { aggregate, probabilities } = stats

  const doughnutData = {
    labels: ['Negative Sentiment', 'Positive Sentiment', 'Neutral Sentiment'],
    datasets: [
      {
        data: [aggregate.neg, aggregate.pos, aggregate.neu],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  }

  const [negLabels, negData] = getFrequency(probabilities.neg)

  const negativeLineData = {
    labels: negLabels,
    datasets: [
      {
        label: 'Negative Sentiment Probability Distribution',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#FF6384',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: negData
      }
    ]
  }

  const [posLabels, posData] = getFrequency(probabilities.pos)

  const posLineData = {
    labels: posLabels,
    datasets: [
      {
        label: 'Positive Sentiment Probability Distribution',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#36A2EB',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: posData
      }
    ]
  }

  const [neuLabels, neuData] = getFrequency(probabilities.neu)

  const neuLineData = {
    labels: neuLabels,
    datasets: [
      {
        label: 'Neutral Sentiment Probability Distribution',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#FFCE56',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: neuData
      }
    ]
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        Sentiment Statistical Analysis for keyword "{keyword}". ( {count} tweets
        analyzed)
      </h1>
      <div style={{ paddingBottom: '2rem' }} />

      <Grid>
        <Row>
          <Col>
            <h2>Sentiment Pie Distribution</h2>
            <Doughnut data={doughnutData} />
          </Col>
          <Col>
            <h2> Negative Sentiment Probability Distribution</h2>
            <Line data={negativeLineData} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2> Positive Sentiment Probability Distribution</h2>
            <Line data={posLineData} />
          </Col>
          <Col>
            <h2> Neutral Sentiment Probability Distribution</h2>
            <Line data={neuLineData} />
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

StatisticChart.propType = {
  keyword: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  time_elapsed_in_sec: PropTypes.string.isRequired
}
export default StatisticChart

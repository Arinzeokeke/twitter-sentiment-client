import React, { useState } from 'react'
import styled from 'styled-components'
import { Normalize, Input, Button } from '@smooth-ui/core-sc'
import axios from 'axios'
import { Form, Field } from 'react-final-form'
import { CenterContainer } from './styles'
import Loading from './components/Loading'
import StatisticChart from './components/StatisticChart'

const Body = styled.div`
  padding-top: 3rem;
  /* background-color: black; */
  min-height: 100vh;
`

const Header = styled.h1`
  text-align: center;
  color: pink;
  font-family: 'Major Mono Display', cursive;
  font-size: 3rem;
`

const adapt /* ⬅️ this is a HOC */ = Component => ({
  input,
  meta: { valid },
  ...rest
}) => <Component {...input} {...rest} valid={valid} />
const AdaptedInput = adapt(Input)
const required = value => (value ? undefined : 'Required')

const App = props => {
  const [stats, setStats] = useState({
    data: null,
    error: null,
    loading: false
  })

  const resetStats = () => {
    setStats({
      data: null,
      error: null,
      loading: false
    })
  }
  const submitForm = async values => {
    setStats({ ...stats, loading: true })
    try {
      const res = await axios.post(
        'http://localhost:5000/api/twitter-search',
        values
      )
      setStats({ ...stats, data: res.data, error: null, loading: false })
    } catch (error) {
      setStats({ ...stats, data: null, error, loading: false })
    }
  }
  console.log(stats)
  return (
    <>
      <Body>
        <Normalize />

        <CenterContainer>
          <div>
            <Header> Twitter Sentiment Classifier</Header>
            <Form
              onSubmit={submitForm}
              render={({ handleSubmit }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Field
                      name="keyword"
                      component={AdaptedInput}
                      control
                      height={70}
                      minWidth={'80vw'}
                      size="lg"
                      placeholder="Search for keyword..."
                      validate={required}
                    />
                    <CenterContainer>
                      <Button size="lg" backgroundColor="pink" type="submit">
                        Classify Tweets
                      </Button>
                      {stats.data && (
                        <Button
                          size="lg"
                          type="button"
                          backgroundColor="green"
                          onClick={resetStats}
                          style={{ marginLeft: '0.5rem' }}
                        >
                          Clear Search Result
                        </Button>
                      )}
                    </CenterContainer>
                  </form>
                )
              }}
            />
          </div>
        </CenterContainer>

        {stats.loading ? (
          <Loading />
        ) : stats.data ? (
          <StatisticChart {...stats.data} />
        ) : null}
      </Body>
    </>
  )
}

export default App

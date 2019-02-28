import React from 'react'
import { CenterContainer } from '../styles'
import Spinner from 'react-spinkit'

const Loading = () => (
  <CenterContainer style={{ padding: '1rem' }}>
    <Spinner name="circle" color="#2f80ed" />
  </CenterContainer>
)

export default Loading

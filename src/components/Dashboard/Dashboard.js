import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import Axios from 'axios'
import './Dashboard.css';
import Footer from '../Footer/navigation-footer';
import car from '../../assets/car-compact-svgrepo-com.svg';
import shower from '../../assets/bathtub-with-opened-shower-svgrepo-com.svg';
import house from '../../assets/real-estate-house-property-for-business-svgrepo-com.svg';


class Setting extends Component {
  state = {
    data: [],
    greatest: { emissions: 0 }
  }
  fetchData = () => {
    Axios.get('/days/data').then(response => {
      console.log(response)
      this.setState({
        ...this.state,
        data: response.data
      })
      this.findGreatest();
    }).then(error => {
      console.log(error)
    })
  }
  findGreatest = () => {
    let array = this.state.data;
    for (let i in array) {
      if (array[i].emissions > this.state.greatest.emissions) {
        this.setState({
          ...this.state,
          greatest: array[i]
        })
      }
    }
  }
  componentDidMount = () => {
    this.fetchData();
  } 

  render() {
    return (
      <div className={'app-container graph'}>
        <div>
          <h2>Your Carbon FoodPrint:</h2>
          {/* <LineChart width={400} height={200} data={this.state.data} className='chart'>
            <Line type="monotone" dataKey="emissions" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="day" />
            <YAxis />
          </LineChart> */}
          {/* <p className='rotate'>Emissions (kg)</p> */}
          <BarChart width={300} height={200} data={this.state.data} className='chart'>
            <XAxis dataKey="day" />
            <YAxis dataKey='emissions' label={{value: 'Emissions (kg)', orientation: 'right', angle: -90}}/>
            <Bar type="monotone" dataKey="emissions" barSize={30} fill="#f46036" />
          </BarChart>
        </div>
        <div className={'emissions-data smaller'}>
          <h3>Your peak emission day: <strong>{this.state.greatest.emissions} kg</strong></h3>
        </div>
        <div className={'metrics'}>
          <h4 className={'metrics-heading'}>
              Which has the same impact as:
          </h4>
          <div className={'metrics-container'}>
            <div className={'metrics-item'}>
              <img className={'icon'} src={car} alt={''}/>
              <span className={'metrics-data'}><strong>{this.state.greatest.miles}</strong> Miles Driven</span>
            </div>
            <div className={'metrics-item'}>
              <img className={'icon'} src={shower} alt={''}/>
              <span><strong> {this.state.greatest.showers}</strong> Showers (8 minutes)</span>
            </div>
            <div className={'metrics-item'}>
              <img className={'icon'} src={house} alt={''}/>
              <span><strong>{this.state.greatest.heating}</strong> Days heating a house</span>
            </div>
          </div>
        </div>
        <Footer 
          dashboardLink={'dashboard'}
          homeLink={'/home'}
          summaryLink={'/summary'}
          titleDashboardLink={'Dashboard'}
          titleHomeLink={'Home'}
          titleSummaryLink={'Summary'}
        />


      </div>
    )
  }
}
export default Setting;
import React, { Component } from 'react';
import FoodSummaryData from './food-summary-data'
import Footer from '../Footer/navigation-footer';

class FoodData extends Component {

    render() {

        return (
            <>
            <div className={'app'}>
            <FoodSummaryData />
            </div>
            <Footer 
                dashboardLink={'dashboard'}
                homeLink={'/home'}
                summaryLink={'/summary'}
                titleDashboardLink={'Dashboard'}
                titleHomeLink={'Home'}
                titleSummaryLink={'Summary'}
            />
            </>
        )
    }
}

export default FoodData;
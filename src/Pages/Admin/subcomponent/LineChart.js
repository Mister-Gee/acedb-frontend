import {Line} from 'react-chartjs-2';

const LineChart = () => {
    const data = {
        labels: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
        datasets: [{
            label: "Male",
            data: [93, 80, 36, 39, 50, 99, 82, 91, 22, 99, 58, 59, 21],
            borderColor: ['#4FC3F7'],
            backgroundColor: ['rgb(79, 195, 247, 0.3)'],
            pointBackgroundColor: '#4FC3F7',
            pointBorderColor: '#4FC3F7'
        }, {
            label: "Female",
            data: [13, 30, 56, 19, 10, 89, 72, 11, 88, 99, 75, 99, 91],
            borderColor: ['#2962FF'],
            backgroundColor: ['rgba(41, 98, 255, 0.3)'],
            pointBackgroundColor: '#2962FF',
            pointBorderColor: '#2962FF'
        }]
    }

    const options = {
        maintainAspectRatio: false,
        title:{
            display: false
        },
        legend: {
            display: false,
            
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 20
                    }
                }
            ]
        }
    }

    return (
        <div className="linechart">
            <Line data={data} height={250} options={options}/>
        </div>
    )
}

export default LineChart;
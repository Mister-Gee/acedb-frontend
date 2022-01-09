import {Line} from 'react-chartjs-2';
import {getStudentChart} from '../../../services/StudentServices';
import {useState, useEffect} from 'react';

const LineChart = () => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try{
                const res = await getStudentChart()
                setChartData(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    }, [])

    const data = {
        labels: chartData.session,
        datasets: [{
            label: chartData.maleStudents.label,
            data: chartData.maleStudents.registeredStudentPerSession,
            borderColor: ['#4FC3F7'],
            backgroundColor: ['rgb(79, 195, 247, 0.3)'],
            pointBackgroundColor: '#4FC3F7',
            pointBorderColor: '#4FC3F7'
        }, {
            label: chartData.femaleStudents.label,
            data: chartData.femaleStudents.registeredStudentPerSession,
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
                        max: 10,
                        stepSize: 1
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
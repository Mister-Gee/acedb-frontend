import {Table} from 'react-bootstrap'

const ResultTable = () => {
    return (
        <div className="result-table">
            <Table size="md" responsive hover bordered>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Course of Study</th>
                    <th>Unit</th>
                    <th>Lecturer</th>
                    <th>Score</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>COM112 - Computer programming 2</td>
                    <td>2</td>
                    <td>Alh. Mohammend Bello</td>
                    <td>60</td>
                    <td>B</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>TMT101 - Trignometry Maths 2</td>
                    <td>4</td>
                    <td>Alh. Abdulahai Sulami</td>
                    <td>63</td>
                    <td>BC</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>COM111 - Computer programming 1</td>
                    <td>3</td>
                    <td>Mr. Boladji Gbega Ojo</td>
                    <td>70</td>
                    <td>A</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>TMT101 - Trignometry Maths 2</td>
                    <td>4</td>
                    <td>Alh. Abdulahai Sulami</td>
                    <td>60</td>
                    <td>BC</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>COM111 - Computer programming 1</td>
                    <td>3</td>
                    <td>Mr. Boladji Gbega Ojo</td>
                    <td>73</td>
                    <td>A</td>
                </tr>
            </tbody>
        </Table>
        </div>
    )
}

export default ResultTable

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table,Button} from 'reactstrap';

export default class Example extends Component {

    constructor() {
        super()
        this.state = {
            tasks : []
        }
    }
    render(){
        return (
            <div className="container">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Rinkal</td>
                            <td>this is my first page</td>
                            <td>
                                <Button color="success" size="md" className="mr-2">Edit</Button>
                                <Button color="danger" size="md">Delete</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
    
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}

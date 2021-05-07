import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, ModalHeader, ModalFooter, ModalBody,Input, FormGroup, Label } from 'reactstrap';
import axios from 'axios';

export default class Example extends Component {

    constructor() {
        super()
        this.state = {
            tasks : [],
            newTaskModel:false,
            newTaskData:{
                name: "",
                description: "",
            },
            editTaskModel:false,
            editTaskData:{
                id:"",
                name:"",
                description: "",
            },
        }
    }

    loadTask(){
        axios.get('http://127.0.0.1:8000/api/tasks').then((response) => {
            this.setState({
                tasks:response.data
            })
        })
    }

    
    addTask(){
        axios.post('http://127.0.0.1:8000/api/tasks',this.state.newTaskData).then((response) => {
            let { tasks } = this.state
            this.loadTask()
            this.setState({
                tasks,
                newTaskModel: false,
                newTaskData : {
                    name: "",
                    description: "",
                }
            })

        })
    }
    
    editTask(id,name,description){
       this.setState({
           editTaskData:{
               id,
               name,
               description,
           },
           editTaskModel: !this.state.editTaskModel
       })
    }

    updateTask(){
        let {name, description} = this.state.editTaskData

        axios.put('http://127.0.0.1:8000/api/tasks/'+this.state.editTaskData.id,{
            name,
            description,
        }).then((response) => {
            this.loadTask()
            this.setState({
                editTaskModel: false,
                editTaskData: {
                    id:"",
                    name: "",
                    description:""
                }
            })
        })
    }

    deleteTask(id){
        axios.delete('http://127.0.0.1:8000/api/tasks/'+id).then((response) => {
            this.loadTask()
        })
    }
    componentWillMount(){
        this.loadTask();
    }
    
    toggleNewTaskModel(){
        this.setState({
            newTaskModel: !this.state.newTaskModel
        })
    }

    toggleEditTaskModel(){
        this.setState({
            editTaskModel: !this.state.editTaskModel
        })
    }

    render(){

        let tasks = this.state.tasks.map((task) => {
            return(
                <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>
                        <Button color="success" 
                                size="md" 
                                className="mr-2" 
                                onClick={this.editTask.bind(this,task.id,task.name,task.description)}
                        >
                        Edit
                        </Button>
                        <Button 
                            color="danger" 
                            size="md" 
                            onClick={this.deleteTask.bind(this,task.id)}>
                        Delete
                        </Button>
                    </td>
                </tr>
            )
        })
        return (
            <div className="container">
                <Button color="primary" onClick={this.toggleNewTaskModel.bind(this)}>Add new</Button>

                {/* Add new task model */}
                <Modal isOpen={this.state.newTaskModel} toggle={this.toggleNewTaskModel.bind(this)} >
                    <ModalHeader toggle={this.toggleNewTaskModel.bind(this)}>Modal title</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name" value={this.state.newTaskData.name}
                                onChange={(e) => {
                                    let {newTaskData} = this.state
                                    newTaskData.name = e.target.value
                                    this.setState({newTaskData})
                                }}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input id="description"
                                value={this.state.newTaskData.description}
                                onChange={(e) => {
                                    let {newTaskData} = this.state
                                    newTaskData.description = e.target.value
                                    this.setState({newTaskData})
                                }}></Input>
                        </FormGroup>
                        
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.addTask.bind(this)}>Add Task</Button>{' '}
                    <Button color="secondary" onClick={this.toggleNewTaskModel.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                {/*  Edit task Model */}
                <Modal isOpen={this.state.editTaskModel} toggle={this.toggleEditTaskModel.bind(this)} >
                    <ModalHeader toggle={this.toggleEditTaskModel.bind(this)}>Edit Task</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name" value={this.state.editTaskData.name}
                                onChange={(e) => {
                                    let {editTaskData} = this.state
                                    editTaskData.name = e.target.value
                                    this.setState({editTaskData})
                                }}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input id="description"
                                value={this.state.editTaskData.description}
                                onChange={(e) => {
                                    let {editTaskData} = this.state
                                    editTaskData.description = e.target.value
                                    this.setState({editTaskData})
                                }}></Input>
                        </FormGroup>
                        
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.updateTask.bind(this)}>Edit Task</Button>{' '}
                    <Button color="secondary" onClick={this.toggleEditTaskModel.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

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
                        {tasks}
                    </tbody>
                </Table>
            </div>
        );
    }
    
}



if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}

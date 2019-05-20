import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { getNotes , saveNotes } from '../actions/notesActions';
import _ from 'lodash';

class form extends Component {
    constructor(props){
        super(props);
        this.state ={
            title:'',
            body:'',
            notes:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderNotes = this.renderNotes.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
        });
    }

    componentDidMount(){
        this.props.getNotes();
    }

    handleSubmit(e){
        e.preventDefault();
        const note = {
            title : this.state.title,
            body : this.state.body
        }
        this.props.saveNotes(note);
        this.setState({
            title:'',
            body:''
        })
    }

    renderNotes(){
        return _.map(this.props.notes,(note , key )=>{
            return (
                <div key ={key}>
                    <h1>{note.title}</h1>
                    <p>{note.body}</p>
                </div>
            )
        })
    }

    render() {
        return (
            <div style ={{marginLeft:'30%'}}>
                <Form className ="col-md-8" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="exampleTitle">title</Label>
                        <Input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange ={this.handleChange}
                            id="exampleTitle"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleNote">Note</Label>
                        <Input
                            type="textarea"
                            name="body"
                            value={this.state.body}
                            onChange ={this.handleChange}
                            id="exampleNote"
                        />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
                {this.renderNotes()}
            </div>
        )
    }
}

function mapStateToProps( state , ownProps ){
    return {
        notes: state.notes
    }

}


export default connect(mapStateToProps , { getNotes , saveNotes })(form);
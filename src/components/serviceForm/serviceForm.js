import React, { Component } from 'react';
import '../containers/App.css';
import '../css/serviceForm.css';


const DEFAULT_QUERY = 'redux';

export default class ServiceForm extends Component {
    constructor(props){
        super(props);

    }
    componentDidMount(){

    }



    render() {
        return (
            <div>
                <div>
                    <form>
                        <fieldset>
                            <legend>Add new service</legend>
                            <div class="form-group">
                            <label for="exampleInputName">Name</label>
                            <input type="name" class="form-control" id="exampleName" aria-describedby="emailHelp" placeholder="Enter name of service"/>
                            </div>
                            <legend>Related Party</legend>
                            <div class="form-group">
                                <label for="exampleInputRole">Role</label>
                                <input type="role" class="form-control" id="exampleRole" aria-describedby="emailHelp" placeholder="Enter role"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputID">ID</label>
                                <input type="id" class="form-control" id="exampleID" aria-describedby="emailHelp" placeholder="Enter ID"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputHref">HREF</label>
                                <input type="name" class="form-control" id="exampleHref" aria-describedby="emailHelp" placeholder="href"/>
                            </div>
                            <div class="form-group">
                            <label for="exampleTextarea">Description</label>
                            <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
                            </div>
                            {/*<fieldset class="form-group">
                            <legend>Radio buttons</legend>
                            <div class="form-check">
                                <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked=""/>
                                Option one is this and that—be sure to include why it's great
                                </label>
                            </div>
                            <div class="form-check">
                            <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2"/>
                                Option two can be something else and selecting it will deselect option one
                                </label>
                            </div>
                            <div class="form-check disabled">
                            <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" disabled=""/>
                                Option three is disabled
                                </label>
                            </div>
                            </fieldset>
                            <fieldset class="form-group">
                            <legend>Checkboxes</legend>
                            <div class="form-check">
                                <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" value="" checked=""/>
                                Option one is this and that—be sure to include why it's great
                                </label>
                            </div>
                            <div class="form-check disabled">
                                <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" value="" disabled=""/>
                                Option two is disabled
                                </label>
                            </div>
                            </fieldset>*/}
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </fieldset>
                        </form>


                 </div>
                
            </div>


        );
    }
}
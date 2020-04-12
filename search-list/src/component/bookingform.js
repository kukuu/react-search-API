import React, { Component } from "react";
import "./Bookingform.css";

const txtFieldState = {
    value: "",
    valid: true,
    typeMismatch: false,
    errMsg: "" //this is where our error message gets across
};

const ErrorValidationLabel = ({ txtLbl }) => (
    <label htmlFor="" style={{ color: "red" }}>
        {txtLbl}
    </label>
);

const Field = ({ valid, type, fieldId, fieldName, typeMismatch, formatErrorTxt, requiredTxt }) => {
    const renderErrorLabel = !valid ? <ErrorValidationLabel txtLbl={typeMismatch ? formatErrorTxt : requiredTxt} /> : "";

    return (
        <>
            <input type={type} name={fieldId} placeholder={fieldName} required />
            <br/>
            {renderErrorLabel}
            <br/>
        </>
    );
}


class Bookingform extends Component {
    state = {
        email: { ...txtFieldState, fieldName: "Email", required: true, requiredTxt: "Email is required", formatErrorTxt: "Incorrect email format", type: "email" },
        firstname: { ...txtFieldState, fieldName: "First Name", required: true, requiredTxt: "First Name is required", type: "text" },
        lastname: { ...txtFieldState, fieldName: "Last Name", required: false, requiredTxt: "Last Name is required", type: "text" },
        allFieldsValid: false
    };

    reduceFormValues = formElements => {
        const arrElements = Array.prototype.slice.call(formElements); //we convert elements/inputs into an array found inside form element

        //we need to extract specific properties in Constraint Validation API using this code snippet
        const formValues = arrElements
            .filter(elem => elem.name.length > 0)
            .map(x => {
                const { typeMismatch } = x.validity;
                const { name, type, value } = x;

                return {
                    name,
                    type,
                    typeMismatch, //we use typeMismatch when format is incorrect(e.g. incorrect email)
                    value,
                    valid: x.checkValidity()
                };
            })
            .reduce((acc, currVal) => { //then we finally use reduce, ready to put it in our state
                const { value, valid, typeMismatch, type } = currVal;
                const {
                    fieldName,
                    requiredTxt,
                    formatErrorTxt
                } = this.state[currVal.name]; //get the rest of properties inside the state object
                
                //we'll need to map these properties back to state so we use reducer...
                acc[currVal.name] = {
                    value,
                    valid,
                    typeMismatch,
                    fieldName,
                    requiredTxt,
                    formatErrorTxt
                };

                return acc;
            }, {});

        return formValues;
    }

    checkAllFieldsValid = (formValues) => {
        return !Object.keys(formValues)
            .map(x => formValues[x])
            .some(field => !field.valid);
    };


    onSubmit = e => {
        e.preventDefault();
        const form = e.target;

        //we need to extract specific properties in Constraint Validation API using this code snippet
        const formValues = this.reduceFormValues(form.elements);
        const allFieldsValid = this.checkAllFieldsValid(formValues);
        //note: put ajax calls here to persist the form inputs in the database.

        //END

        this.setState({ ...formValues, allFieldsValid }); //we set the state based on the extracted values from Constraint Validation API
    };

    mapFieldInputs = () =>{
        //we filter out `allFieldsValid` property as this is not included state for our input fields
        return Object.keys(this.state).filter(x => x !== "allFieldsValid").map(field => {
            return {
                fieldId: field,
                ...this.state[field]
            };
        });
    }

    render() {
        const { allFieldsValid } = this.state;
        const successFormDisplay = allFieldsValid ? "block" : "none";
        const inputFormDisplay = !allFieldsValid ? "block" : "none";
        const fields = this.mapFieldInputs();

        const renderFields = fields.map(x => <Field {...x} />);

        return (
            <>
                <div style={{display: successFormDisplay}}>
                    <h1 style={{ textAlign: "center" }}>Success!</h1>
                    <p style={{ textAlign: "center" }}>
                        You have successfully submitted a form.
                    </p>
                </div>

                <div className="form-input" style={{display: inputFormDisplay}}>
                    <h1 style={{ textAlign: "center" }}>
                        React / HTML5 Form Validation
                    </h1>
                    <form
                        className="form-inside-input"
                        onSubmit={this.onSubmit}
                        noValidate
                    >
                        {renderFields}

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </>
        );
    }
}

export default Bookingform;
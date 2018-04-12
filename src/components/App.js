import React from 'react';
import ProgressStepper from './ProgressStepper';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';



export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			useCaseIndex: 0,
			currentStep: 0
		}
	}

	handleUseCaseChange = (event)=>{
		this.setState({
			useCaseIndex:  event.target.value,
			currentStep: 0
		});
	}

	handleNext = ()=>{
		this.setState((previousState, props)=>{
			return {
				currentStep: previousState.currentStep+1
			}
		})
	}

	

	render() {
		var useCases = [];
		const {useCaseIndex, currentStep} =  this.state;
		useCases[0] =  [{
			"label": "Client for an org initiated",
			"status": "success",
			"desc": "Some relevant description"
			},
			{
				"label": "Got hold of the channel",
				"status": "success"	,
				"desc": "Some relevant description"
			},
			{
				"label": "Creation of a transaction",
				"status": "failed",
				"desc": "Some relevant description"
			},
			{
				"label": "Send transaction for Validation",
				"status": "failed",
				"children": [{
					"label": "result1",
					"status": "notStarted"
				},
				{
					"label": "result2",
					"status": "notStarted"
				},
				{
					"label": "result3",
					"status": "notStarted"
				}],
				"desc": "Some relevant description"
			},
			{
				"label": "Transaction sent to ordering service",
				"status": "failed",
				"desc": "Some relevant description"
			}]

		useCases[1] =  [{
			"label": "Client for an org initiated",
			"status": "success",
			"desc": "Some relevant description"
			},
			{
				"label": "Got hold of the channel",
				"status": "intermediate"	,
				"desc": "Some relevant description"
			},
			{
				"label": "Creation of a transaction",
				"status": "success",
				"desc": "Some relevant description"
			},
			{
				"label": "Send transaction for Validation",
				"status": "intermediate",
				"children": [{
					"label": "result1",
					"status": "notStarted"
				},
				{
					"label": "result2",
					"status": "notStarted"
				},
				{
					"label": "result3",
					"status": "notStarted"
				}],
				"desc": "Some relevant description"
			},
			{
				"label": "Transaction sent to ordering service",
				"status": "success",
				"desc": "Some relevant description"
			}]

		useCases[2] =  [{
			"label": "Client for an org initiated",
			"status": "intermediate",
			"desc": "Some relevant description"
			},
			{
				"label": "Got hold of the channel",
				"status": "intermediate"	,
				"desc": "Some relevant description"
			},
			{
				"label": "Creation of a transaction",
				"status": "intermediate",
				"desc": "Some relevant description"
			},
			{
				"label": "Send transaction for Validation",
				"status": "intermediate",
				"children": [{
					"label": "result1",
					"status": "notStarted"
				},
				{
					"label": "result2",
					"status": "notStarted"
				},
				{
					"label": "result3",
					"status": "notStarted"
				}],
				"desc": "Some relevant description"
			},
			{
				"label": "Transaction sent to ordering service",
				"status": "failed",
				"desc": "Some relevant description"
			}];
		var disabled = false;
		const stepperData = useCases[useCaseIndex];
		if(stepperData.length-1 === currentStep || stepperData[currentStep].status ==="failed") {
			disabled = true;
		}


		return (
			<div>	
				 <FormControl component="fieldset"> 
				 	<FormLabel component="legend">Choose a use case</FormLabel>
				 	<RadioGroup
			            aria-label="Use case"
			            name="useCase"
			            value={this.state.useCaseIndex}
			            onChange={this.handleUseCaseChange}
			          >
			            <FormControlLabel value="0" control={<Radio />} label="1" />
			            <FormControlLabel value="1" control={<Radio />} label="2" />
			            <FormControlLabel value="2" control={<Radio />} label="3" />
			            
			          </RadioGroup>
				 </FormControl>
				 <Button variant="raised" disabled={disabled} color="primary" onClick={()=>this.handleNext()}>
			        Next
      			</Button>
				<ProgressStepper stepperData={stepperData} activeStep={currentStep}></ProgressStepper>

			</div>
			);
	}
}
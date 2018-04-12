import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepContent, StepButton } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  progressWidth: {
    width: "100px"
  }
});

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}

class VerticalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  

  failedCase = (stepObj) =>{
    return (stepObj.status === "failed")
  }

  completedCase = (stepObj) => {
    return (stepObj.status === "")
  }
  render() {
    const { classes } = this.props;
    const steps = this.props.stepperData;
    const activeStep  = this.props.activeStep;



    return (
      <div className={classes.root}>
          
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((stepObj, index) => {
            const labelProps = {};
            const stepContentProps = {};
            if(this.props.activeStep >= index &&     stepObj.status === "failed" ) {
              labelProps.optional = (
                  <Typography variant="caption" color="error">
                    Alert message
                  </Typography>
                );
               labelProps.error = true;
               stepContentProps.color = "error";
               stepContentProps.variant = "caption";                
            }
            return (
              <Step key={stepObj.label}>

                <StepLabel {...labelProps}>{stepObj.label}</StepLabel>
                <StepContent>
                  <Typography {...stepContentProps}>{stepObj.desc}</Typography>
                  <div className={classes.actionsContainer}>
                    <div >
                      {(stepObj.status ==="intermediate")?<LinearProgress className={classes.progressWidth} />:""}
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);

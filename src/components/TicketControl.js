import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      timesClicked: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = () => {
    if (this.state.formVisibleOnPage){
      this.setState(({
        formVisibleOnPage: false,
        timesClicked: 0
      }));
      
      // this.setState(({timesClicked: 0}))

    }
    else{
      this.setState(({ timesClicked: this.state.timesClicked + 1}));
    }
    
    if (this.state.timesClicked === 3) {
      this.setState(({ formVisibleOnPage: true }))
    }
  }
    render(){
      let currentlyVisibleState = null;
      let buttonText = null;
      let Message = null;
      if (this.state.timesClicked === 1){
        Message = "Have you gone through all the steps on the Learn How to Program debugging lesson?";
        buttonText = "Really Add Ticket?";
      }
      else if (this.state.timesClicked === 2){
        Message = "Have you asked another pair for help?";
        buttonText = " Really Really Add Ticket?";
      }
      else if (this.state.timesClicked === 3){
        Message = "Have you spent 15 minutes going through through the problem documenting every step?";
        buttonText = "Really, Really, Really Add Ticket?";
      }
      else if (this.state.formVisibleOnPage && this.state.timesClicked > 3) {
        currentlyVisibleState = <NewTicketForm />;
        buttonText = "Return to Ticket List";
      } else {
        currentlyVisibleState = <TicketList />;
        buttonText = "Add Ticket";
      }
      return (
        <React.Fragment>
          {currentlyVisibleState}
          <p>{Message}</p>
          <button onClick={this.handleClick}>{buttonText}</button>
        </React.Fragment>
      );
    }

}

export default TicketControl;
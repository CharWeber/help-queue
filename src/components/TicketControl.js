import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timesClicked: 0,
      selectedTicket: null,
      editing: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticketToEdit;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }


  handleAddingNewTicketToList = (newTicket) => {
    const {dispatch} = this.props;
    const {id, names, location, issue} = newTicket;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action)
    const action2 = {
      type: 'TOGGLE_FORM'
    }
    dispatch(action2);
    this.setState({ timesClicked: 0});
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_TICKET',
      id: id
    }
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleEditClick = () => {
    this.setState({editing: true})
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false
      });
    } else if (this.props.formVisibleOnPage) {
      this.setState({
        timesClicked: 0,
      });
    } else {
      this.setState({ timesClicked: this.state.timesClicked + 1 });
    }

    if (this.state.timesClicked === 3) {
      const {dispatch} = this.props;
      const action = {
        type: 'TOGGLE_FORM'
      }
      dispatch(action);
    }
  };
  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    let Message = null;
    if (this.state.editing){
      currentlyVisibleState = <EditTicketForm 
      ticket={this.state.selectedTicket}
      onEditTicket={this.handleEditingTicketInList}
      />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = (
        <TicketDetail
          ticket={this.state.selectedTicket}
          onClickingDelete={this.handleDeletingTicket}
          onClickingEdit={this.handleEditClick}
        />
      );
      buttonText = "Return to Ticket List";
    } else if (this.state.timesClicked === 1) {
      Message =
        "Have you gone through all the steps on the Learn How to Program debugging lesson?";
      buttonText = "Really Add Ticket?";
    } else if (this.state.timesClicked === 2) {
      Message = "Have you asked another pair for help?";
      buttonText = " Really Really Add Ticket?";
    } else if (this.state.timesClicked === 3) {
      Message =
        "Have you spent 15 minutes going through through the problem documenting every step?";
      buttonText = "Really, Really, Really Add Ticket?";
    } else if (this.props.formVisibleOnPage && this.state.timesClicked > 3) {
      currentlyVisibleState = (
        <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      );
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = (
        <TicketList
          ticketList={this.props.mainTicketList}
          onTicketSelection={this.handleChangingSelectedTicket}
        />
      );
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


TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;

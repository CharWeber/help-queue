import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      timesClicked: 0,
      mainTicketList: [],
      selectedTicket: null,
      editing: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = this.state.mainTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
        mainTicketList: editedMainTicketList,
        editing: false,
        selectedTicket: null
      });
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    this.setState({
      mainTicketList: newMainTicketList,
      formVisibleOnPage: false,
      timesClicked: 0,
    });
  };

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(
      (ticket) => ticket.id === id
    )[0];
    this.setState({ selectedTicket: selectedTicket });
  };

  handleDeletingTicket = (id) => {
    const newMainTicketList = this.state.mainTicketList.filter(
      (ticket) => ticket.id !== id
    );
    this.setState({
      mainTicketList: newMainTicketList,
      selectedTicket: null,
    });
  };

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else if (this.state.formVisibleOnPage) {
      this.setState({
        formVisibleOnPage: false,
        timesClicked: 0,
      });
    } else {
      this.setState({ timesClicked: this.state.timesClicked + 1 });
    }

    if (this.state.timesClicked === 3) {
      this.setState({ formVisibleOnPage: true });
    }
  };
  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    let Message = null;
    if (this.state.editing){
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} />
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
    } else if (this.state.formVisibleOnPage && this.state.timesClicked > 3) {
      currentlyVisibleState = (
        <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      );
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = (
        <TicketList
          ticketList={this.state.mainTicketList}
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

export default TicketControl;

var React = require('react');

var dateFormatter = require('../../../../helpers/DateFormatter.js');

var CostItem = React.createClass({
  handleClickEditLink: function(e) {
    e.preventDefault();

    this.setState({ isEditing: true, editingName: this.props.cost.name, editingPrice: this.props.cost.price });
  },
  handleEditNameChange: function(e) {
    this.setState({ editingName: e.target.value });
  },
  handleEditPriceChange: function(e) {
    this.setState({ editingPrice: e.target.value });
  },
  handleSubmitEdit: function(e) {
    e.preventDefault();

    var editedCost = { name: this.state.editingName, price: this.state.editingPrice };

    var validationResult = this.props.costValidator(editedCost, this.props.cost.id);
    if (validationResult === true) {
      this.props.onClickCostEditDone(this.props.cost.id, editedCost);
      this.setState({ isEditing: false, editingName: '', editingPrice: '', formError: null });
    } else {
      this.setState({ formError: validationResult });
    }
  },
  handleCancelEdit: function(e) {
    e.preventDefault();

    this.setState({ isEditing: false, editingName: '', editingPrice: '', formError: null });
  },
  handleClickDeleteLink: function(e) {
    e.preventDefault();

    this.props.onClickCostDelete(this.props.cost);
  },

  getInitialState: function() {
    return { isEditing: false, editingName: '', editingPrice: '', formError: null };
  },
  render: function() {
    var formErrorCostName, inputCostNameClass,
        formErrorCostPrice, inputCostPriceClass;

    if (this.state.formError) {
      var formError = <div className="error-message">{this.state.formError.message}</div>;

      switch (this.state.formError.target) {
        case 'name':
          formErrorCostName = formError;
          inputCostNameClass = 'invalid';
          break;
        case 'price':
          formErrorCostPrice = formError;
          inputCostPriceClass = 'invalid';
          break;
        default:
          console.error('Invalid cost error message target: ' + this.state.formError.target);
          break;
      }
    }

    if (!this.state.isEditing) {
      return (
        <tr>
          <td className="column-created">
            {dateFormatter(this.props.cost.created)}
          </td>
          <td className="column-cost-name">{this.props.cost.name}</td>
          <td className="column-cost-price">{this.props.cost.price}</td>
          <td className="column-cost-edit-delete">
            <span className="edit-delete-buttons">
              <a href="" aria-label="Edit" onClick={this.handleClickEditLink}><span className="material-icons" aria-hidden="true">edit</span></a>
              <a href="" aria-label="Delete" onClick={this.handleClickDeleteLink}><span className="material-icons" aria-hidden="true">delete</span></a>
            </span>
          </td>
        </tr>
      );
    } else {
      return (
        <tr className="editing">
          <td className="column-created">
            [{dateFormatter(this.props.cost.created)}]
          </td>
          <td className="column-cost-name">
            <input type="text" value={this.state.editingName} onChange={this.handleEditNameChange} className={inputCostNameClass} />
            {formErrorCostName}
          </td>
          <td className="column-cost-price">
            <input type="text" value={this.state.editingPrice} onChange={this.handleEditPriceChange} className={inputCostPriceClass} />
            {formErrorCostPrice}
          </td>
          <td className="column-cost-edit-done-cancel">
            <span className="done-cancel-buttons">
              <a href="" aria-label="Done" onClick={this.handleSubmitEdit}><span className="material-icons icon-done" aria-hidden="true">done</span></a>
              <a href="" aria-label="Cancel" onClick={this.handleCancelEdit}><span className="material-icons icon-cancel" aria-hidden="true">clear</span></a>
            </span>
          </td>
        </tr>
      );
    }
  }
});

module.exports = CostItem;

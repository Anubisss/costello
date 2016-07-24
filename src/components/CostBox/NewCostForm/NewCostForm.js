var React = require('react');

var NewCostForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var costName = this.state.name.trim();
    var costPrice = this.state.price.trim();

    var cost = { created: new Date(), name: costName, price: costPrice };

    var validationResult = this.props.costValidator(cost);
    if (validationResult === true) {
      this.props.onCostNew(cost);
      this.setState({ name: '', price: '', formError: null });
    } else {
      this.setState({ formError: validationResult });
    }
  },
  handleNameChange: function(e) {
    this.setState({ name: e.target.value });
  },
  handlePriceChange: function(e) {
    this.setState({ price: e.target.value });
  },

  getInitialState: function() {
    return { name: '', price: '', formError: null };
  },
  render: function() {
    var inputCostNameClass;
    var inputCostPriceClass;

    var formErrorMessageSection;
    if (this.state.formError) {
      formErrorMessageSection = <div className="error-message">{this.state.formError.message}</div>;

      switch (this.state.formError.target) {
        case 'name':
          inputCostNameClass = 'invalid';
          break;
        case 'price':
          inputCostPriceClass = 'invalid';
          break;
        default:
          console.error('Invalid cost error message target: ' + this.state.formError.target);
          break;
      }
    }

    return (
      <div className="row new-cost">
        <div className="col m6 s10">
          <h4 className="title-new-cost">New cost</h4>
          {formErrorMessageSection}
          <form className="new-cost-form" onSubmit={this.handleSubmit}>
            <div className="input-field">
              <label htmlFor="cost-name">Cost Name</label>
              <input type="text" id="cost-name" className={inputCostNameClass} value={this.state.name} onChange={this.handleNameChange} />
            </div>
            <div className="input-field">
              <label htmlFor="cost-price">Cost Price</label>
              <input type="text" id="cost-price" className={inputCostPriceClass} value={this.state.price} onChange={this.handlePriceChange} />
            </div>
            <button type="submit" className="btn waves-effect waves-light">Create</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = NewCostForm;

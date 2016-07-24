var React = require('react');

var CostListBox = require('./CostListBox/CostListBox.js');
var NewCostForm = require('./NewCostForm/NewCostForm.js');

var CostBox = React.createClass({
  doesCostNameAlreadyExist: function(costName, excludeCostId) {
    return this.state.costs.find(function(element) {
      return element.id !== excludeCostId && element.name.toLowerCase() === costName.toLowerCase()
    }) ? true : false;
  },
  isCostValid: function(cost, excludeCostIdFromNameUniquenesCheck) {
    if (!cost.name) {
      return { message: 'Empty cost name.', target: 'name' };
    }
    if (cost.name.length < 3) {
      return { message: 'Cost name must be at least 3 characters long.', target: 'name' };
    }
    if (this.doesCostNameAlreadyExist(cost.name, excludeCostIdFromNameUniquenesCheck)) {
      return { message: 'Cost name must be unique.', target: 'name' };
    }

    if (!cost.price) {
      return { message: 'Empty cost price.', target: 'price' };
    }

    cost.price = Number(cost.price);

    if (isNaN(cost.price)) {
      return { message: 'Cost price must be a valid number.', target: 'price' };
    }
    if (cost.price < 1) {
      return { message: 'Cost price must be at least 1.', target: 'price' };
    }

    return true;
  },
  handleCostEdit: function(costId, editedCost) {
    var costs = this.state.costs.slice();

    for (var i = 0; i < costs.length; ++i) {
      var cost = costs[i];
      if (cost.id === costId) {
        cost.name = editedCost.name;
        cost.price = editedCost.price;
        break;
      }
    }

    this.setState({ costs: costs });
  },
  handleCostDelete: function(cost) {
    var costsWithoutTheDeletedCost = this.state.costs.filter(function(costElement) {
      return costElement.id === cost.id ? false : true;
    });
    this.setState({ costs: costsWithoutTheDeletedCost });
  },
  handleCostNew: function(cost) {
    cost.id = this.state.nextCostId;
    this.setState({ costs: this.state.costs.concat([cost]), nextCostId: this.state.nextCostId + 1  });
  },

  getInitialState: function() {
    return { costs: [], nextCostId: 0 };
  },
  render: function() {
    return (
      <div className="container">
        <CostListBox costs={this.state.costs} costValidator={this.isCostValid}
                     onCostEdit={this.handleCostEdit} onCostDelete={this.handleCostDelete} />
        <NewCostForm onCostNew={this.handleCostNew} costValidator={this.isCostValid} />
      </div>
    );
  }
});

module.exports = CostBox;

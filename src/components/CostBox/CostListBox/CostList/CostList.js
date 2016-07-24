var React = require('react');

var CostItem = require('./CostItem.js');

var CostList = React.createClass({
  handleClickCostEditDone: function(costId, editedCost) {
    this.props.onCostEdit(costId, editedCost);
  },
  handleClickCostDelete: function(cost) {
    this.props.onCostDelete(cost);
  },

  render: function() {
    var costItems = this.props.costs.map(function(cost) {
      return <CostItem key={cost.id} cost={cost} costValidator={this.props.costValidator}
                       onClickCostEditDone={this.handleClickCostEditDone} onClickCostDelete={this.handleClickCostDelete} />;
    }, this);

    return (
      <div>
        <table className="costs-table">
          <thead>
            <tr>
              <th className="column-created">Created</th>
              <th className="column-cost-name">Cost name</th>
              <th className="column-cost-price">Cost price in <abbr title="Hungary Forint">HUF</abbr></th>
              <th className="column-cost-edit-delete"></th>
            </tr>
          </thead>
          <tbody>
            {costItems}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = CostList;

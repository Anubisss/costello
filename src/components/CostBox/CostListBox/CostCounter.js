var React = require('react');

var CostCounter = React.createClass({
  render: function() {
    return (
      <div className="cost-counters">
        <ul>
          <li><span className="label">Costs on the page: {this.props.pageCostItemCount}</span></li>
          <li><span className="label">Filtered costs: {this.props.filteredCostItemCount}</span></li>
          <li><span className="label">All costs: {this.props.costItemCount}</span></li>
        </ul>
      </div>
    );
  }
});

module.exports = CostCounter;

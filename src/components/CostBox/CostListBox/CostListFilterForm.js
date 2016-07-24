var React = require('react');

var CostListFilterForm = React.createClass({
  handleChange: function(e) {
    this.props.onFilterChange(e.target.value.trim());
  },

  render: function() {
    return (
      <div>
        <div className="input-field">
          <label htmlFor="cost-filter-name">Filter by cost name</label>
          <input type="text" id="cost-filter-name" onChange={this.handleChange} />
        </div>
      </div>
    );
  }
});

module.exports = CostListFilterForm;

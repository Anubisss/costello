var React = require('react');

function sortByCreated(costs, orderAsc) {
  costs.sort(function(a, b) {
    return orderAsc ? a.created - b.created : b.created - a.created;
  });
}

function sortByName(costs, orderAsc) {
  costs.sort(function(a, b) {
    return orderAsc ? a.name.toLowerCase().localeCompare(b.name.toLowerCase()) :
                      b.name.toLowerCase().localeCompare(a.name.toLowerCase());
  });
}

function sortByPrice(costs, orderAsc) {
  costs.sort(function(a, b) {
    return orderAsc ? a.price - b.price : b.price - a.price;
  });
}

var CostListSorter = React.createClass({
  handleClickSort: function(sortMethod, orderAsc, e) {
    e.preventDefault();

    this.props.onSort(sortMethod, orderAsc);
  },

  render: function() {
    return (
      <div>
        <div>Sort by created: <a href="" onClick={this.handleClickSort.bind(null, sortByCreated, true)}>ASC</a> | <a href="" onClick={this.handleClickSort.bind(null, sortByCreated, false)}>DESC</a></div>
        <div>Sort by name: <a href="" onClick={this.handleClickSort.bind(null, sortByName, true)}>ASC</a> | <a href="" onClick={this.handleClickSort.bind(null, sortByName, false)}>DESC</a></div>
        <div>Sort by price: <a href="" onClick={this.handleClickSort.bind(null, sortByPrice, true)}>ASC</a> | <a href="" onClick={this.handleClickSort.bind(null, sortByPrice, false)}>DESC</a></div>
      </div>
    );
  }
});

module.exports = CostListSorter;
module.exports.sorters = {
  created: sortByCreated,
  name: sortByName,
  price: sortByPrice
};

var React = require('react');

var CostListFilterForm = require('./CostListFilterForm.js');
var CostListSorter = require('./CostListSorter.js');
var CostList = require('./CostList/CostList.js');
var CostListPagination = require('./CostListPagination.js');
var CostCounter = require('./CostCounter.js');

var COST_ITEM_PER_PAGE = 5;

var CostListBox = React.createClass({
  handleFilterChange: function(costName) {
    this.setState({ costFilter: { costName: costName } });
  },
  handleSort: function(sortMethod, orderAsc) {
    this.setState({ sort: { method: sortMethod, orderAsc: orderAsc } });
  },
  handlePageChange: function(pageId) {
    this.setState({ pageId: pageId });
  },

  getInitialState: function() {
    return { costFilter: { costName: '' }, sort: { method: CostListSorter.sorters.created, orderAsc: false }, pageId: 0 };
  },
  render: function() {
    var costs = this.props.costs;

    var filteredCostItems;
    if (this.state.costFilter.costName) {
      filteredCostItems = costs.filter(function(cost) {
        return cost.name.toLowerCase().indexOf(this.state.costFilter.costName.toLowerCase()) !== -1;
      }, this);
    } else {
      filteredCostItems = costs.slice();
    }

    if (filteredCostItems.length > 1) {
      this.state.sort.method(filteredCostItems, this.state.sort.orderAsc);
    }

    var costsOnThePage = filteredCostItems;
    if (filteredCostItems.length > COST_ITEM_PER_PAGE) {
      costsOnThePage = filteredCostItems.slice(this.state.pageId * COST_ITEM_PER_PAGE, (this.state.pageId + 1) * COST_ITEM_PER_PAGE);
    }

    var costListElementsOrNoCosts;
    if (costs.length) {
      costListElementsOrNoCosts = (
        <div>
          <CostListFilterForm onFilterChange={this.handleFilterChange} />
          <CostListSorter onSort={this.handleSort} />
          <CostList costs={costsOnThePage} costValidator={this.props.costValidator}
                    onCostEdit={this.props.onCostEdit} onCostDelete={this.props.onCostDelete} />
          <CostListPagination costItemCount={filteredCostItems.length} costItemPerPage={COST_ITEM_PER_PAGE}
                              currentPageId={this.state.pageId} onPageChange={this.handlePageChange} />
          <CostCounter costItemCount={costs.length} filteredCostItemCount={filteredCostItems.length}
                       pageCostItemCount={costsOnThePage.length} />

        </div>
      );
    } else {
      costListElementsOrNoCosts = <div className="no-costs">No costs. :(</div>;
    }

    return (
      <div className="row costs">
        <div className="col m8 s12">
          <h3 className="title-costs">Costs</h3>
          {costListElementsOrNoCosts}
        </div>
      </div>
    );
  }
});

module.exports = CostListBox;

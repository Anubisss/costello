var React = require('react');

function countPageNeed(itemsCount, itemPerPages) {
  return Math.ceil(itemsCount / itemPerPages);
}

var CostListPagination = React.createClass({
  handleClickPageLink: function(pageId, disabled) {
    if (!disabled) {
      this.props.onPageChange(pageId);
    }
  },

  componentDidUpdate: function() {
    var pageNeeded = countPageNeed(this.props.costItemCount, this.props.costItemPerPage);
    var lastPage = pageNeeded - 1;
    if (lastPage < 0) {
      lastPage = 0;
    }

    if (this.props.currentPageId > lastPage) {
      this.props.onPageChange(lastPage);
    }
  },
  render: function() {
    var pageNeeded = countPageNeed(this.props.costItemCount, this.props.costItemPerPage);

    var currentPageId = this.props.currentPageId;

    var previousPageLinkClass = currentPageId === 0 ? 'disabled' : 'waves-effect';
    var previousPageLink = <li key="previous" className={previousPageLinkClass}
                               onClick={this.handleClickPageLink.bind(null, currentPageId - 1, previousPageLinkClass === 'disabled')}>
                             <i className="material-icons">chevron_left</i>
                           </li>;

    var nextPageLinkClass = pageNeeded === 0 || currentPageId === (pageNeeded - 1) ? 'disabled' : 'waves-effect';
    var nextPageLink = <li key="next" className={nextPageLinkClass}
                           onClick={this.handleClickPageLink.bind(null, currentPageId + 1, nextPageLinkClass === 'disabled')}>
                         <i className="material-icons">chevron_right</i>
                       </li>;

    var pageLinks = [];
    pageLinks.push(previousPageLink);
    for (var i = 0; i < pageNeeded; ++i) {
      var pageLinkClass = i === currentPageId ? 'active' : 'waves-effect';
      var pageLink = <li key={i} className={pageLinkClass} onClick={this.handleClickPageLink.bind(null, i, pageLinkClass === 'active')}>
                       {i + 1}
                     </li>;
      pageLinks.push(pageLink);
    }
    pageLinks.push(nextPageLink);

    return (
      <div>
        <ul className="pagination">
          {pageLinks}
        </ul>
      </div>
    );
  }
});

module.exports = CostListPagination;

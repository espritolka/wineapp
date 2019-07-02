import React from 'react';

class SearchLayout extends React.Component {
  render() {
    return (
      <div className="search">
        <header className="search-header">
          [Search Title]
        </header>
        <div className="search-results">
          {this.props.children}
        </div>
        <footer className="search-footer">
          [Total Results]
        </footer>
      </div>
    );
  }
}


export default SearchLayout;
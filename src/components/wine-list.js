import React from 'react';
import axios from 'axios'

class WineList extends React.Component {

  getWines = () => {

  }
    render() {
      return (
      <ul className="wine-list">
        <li>Wine 1</li>
        <li>Wine 2</li>
        <li>Wine 3</li>
      </ul>
    );
  }
};

export default WineList;
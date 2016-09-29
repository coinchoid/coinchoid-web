import React from 'react';
import _ from 'lodash';
import moment from 'moment';

const GLOBAL = typeof window === 'undefined' ? global : window;

class ListWatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: [],
      intervalId: null
    }
  }
  getCardPoints (card) {
    var value = 0;
    if(!_.isString(card.name)) {
      return value;
    }
    const match = card.name.match(/\(([-+]?[0-9]*\.?[0-9]+)\)/);
    if(match) {
      match.forEach((matchVal) => {
        if (!isNaN(parseFloat(matchVal, 10))) {
          value = parseFloat(matchVal, 10);
        }
      });
    }
    return value;
  }
  getColumnPoints (listId, callback) {
    window.Trello.get('/lists/' + listId + '/cards?fields=name', (cards) => {
      const sum = _.sumBy(cards, this.getCardPoints);
      callback(sum);
    });
  }
  componentWillMount () {
    const intervalId = GLOBAL.setInterval(
      (listId) => {
        this.getColumnPoints(listId, (points) => {
          this.props.onWatchHandler({
            datetime: moment(),
            value: points
          });
        });
      }
      , 60000, this.props.listId
    );
    this.setState({ intervalId: intervalId })
  }
  componentWillUnmount () {
    GLOBAL.clearInterval(this.state.intervalId);
  }
  render () {
    return (
      <div>Watcher</div>
    );
  }
}

export default ListWatcher;

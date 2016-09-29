import React from 'react';

import Autocomplete from 'react-toolbox/lib/autocomplete';

class BoardSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' }
  }
  onChangeHandler (value) {
    this.props.onChangeHandler(value);
    this.setState({ value: value });
  }
  render () {
    var items = {};
    this.props.boards.forEach((board) => {
      items[board.id] = board.name;
    });
    return (
      <Autocomplete
        direction="down"
        multiple={false}
        selectedPosition="above"
        label="Select a Trello board"
        onChange={this.onChangeHandler.bind(this)}
        source={items}
        value={this.state.value}
      />
    );
  }
}

export default BoardSelector;

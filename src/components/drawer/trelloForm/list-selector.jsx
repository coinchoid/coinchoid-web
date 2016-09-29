import React from 'react';

import Autocomplete from 'react-toolbox/lib/autocomplete';

class ListSelector extends React.Component {
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
    this.props.lists.forEach((list) => {
      items[list.id] = list.name;
    });
    return (
      <Autocomplete
        direction="down"
        multiple={false}
        selectedPosition="above"
        label="Select the list to watch"
        onChange={this.onChangeHandler.bind(this)}
        source={items}
        value={this.state.value}
      />
    );
  }
}

export default ListSelector;

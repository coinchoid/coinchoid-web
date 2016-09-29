import React from 'react';
import {Input} from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox/lib/button';
import TimePicker from 'react-toolbox/lib/time_picker';

class PlanningForm extends React.Component {
  render () {
    return (
      <div>
        <TimePicker
          label='Starting Time'
          onChange={this.props.onStartChangeHandler}
          value={this.props.start}
        />
        <TimePicker
          label='Expected Finishing Time'
          onChange={this.props.onEndChangeHandler}
          value={this.props.end}
        />
        <Input
          label="Todo"
          name="todo"
          type="number"
          value={this.props.todo}
          onChange={this.props.onTodoChangeHandler} />
      </div>
    );
  }
}

export default PlanningForm;

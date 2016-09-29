import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import { Layout, Panel, Sidebar, Checkbox, IconButton } from 'react-toolbox';
import { Button } from 'react-toolbox/lib/button';

import moment from 'moment';

import PlanningForm from './drawer/planningForm/form.jsx';
import TrelloForm from './drawer/trelloForm/trello.jsx';
import Header from './header.jsx';

import * as actionCreators from '../action_creators';

import 'react-toolbox/lib/commons.scss';
import style from '../style.scss';

class PlanningApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playground: false,
      start: moment().toDate(),
      end: moment().add(1, 'hours').toDate(),
      todo: 30,
      done: [],
    };
  }
  handleStartChangeBuilder () {
    return (start) => {
      this.setState({ start: start })
    }
  }
  handleEndChangeBuilder () {
    return (end) => {
      this.setState({ end: end })
    }
  }
  handleTodoChangeBuilder () {
    return (todo) => {
      this.setState({ todo: todo })
    }
  }
  onWatchHandler (doneScreenshot) {
    this.state.done.push(doneScreenshot)
    this.setState({
      done: this.state.done
    });
  }

  toggleSidebar = () => {
    this.setState({ playground: !this.state.playground });
  };

  render() {
    let className = style.root;
    if (this.state.playground) className += ` ${style['with-playground']}`;

    return (
      <Layout>
        <Panel className={className}>
          <Header
            end={this.state.end}
          />
          <Button
            accent
            floating
            className={style['playground-button']}
            icon={this.state.playground ? 'close' : 'code'}
            onClick={this.toggleSidebar}
          />
          <div className={style.documentation}>
          </div>
          <aside className={style.playground} ref='playground'>
            <div style={{ flex: 1 }}>
              <TrelloForm
                onWatchHandler={this.onWatchHandler.bind(this)}
                isAuthenticated={this.props.isAuthenticated}
                onSignInSuccess={this.props.onSignInSuccess} />
              <PlanningForm
                start={this.state.start}
                end={this.state.end}
                todo={this.state.todo}
                onStartChangeHandler={this.handleStartChangeBuilder()}
                onEndChangeHandler={this.handleEndChangeBuilder()}
                onTodoChangeHandler={this.handleTodoChangeBuilder()} />
            </div>
          </aside>
        </Panel>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.get('isAuthenticated')
  };
}

export const PlanningAppContainer = connect(mapStateToProps, actionCreators)(PlanningApp);

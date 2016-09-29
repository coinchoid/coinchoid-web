import React from 'react';
import _ from 'lodash';

import AuthorizeButton from './authorize.jsx';
import BoardSelector from './board-selector.jsx';
import ListSelector from './list-selector.jsx';
import ListWatcher from './list-watcher.jsx';

class TrelloForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: null,
      lists: null,
      watchedListId: null
    };
  }
  componentWillReceiveProps (props) {
    if (props.isAuthenticated) {
      window.Trello.get('/member/me/boards', (response) => {
        this.setState({boards: response});
      });
    }
  }
  getLists () {
    return (boardId) => {
      if (!boardId) {
        return;
      }
      window.Trello.get('/boards/' + boardId + '/lists', (response) => {
        this.setState({lists: response});
      });
    }
  }
  watchList (listId) {
    this.setState({ watchedListId: listId });
  }
  onWatchHandler (done) {
    this.props.onWatchHandler(done);
  }
  render () {
    var boardList = null;
    if (Array.isArray(this.state.boards)) {
      boardList = <BoardSelector boards={this.state.boards} onChangeHandler={this.getLists()} />;
    }

    var listList = null;
    if (Array.isArray(this.state.lists)) {
      listList = <ListSelector lists={this.state.lists} onChangeHandler={this.watchList.bind(this)} />;
    }

    var watcher = null;
    if (_.isString(this.state.watchedListId)) {
      watcher = <ListWatcher onWatchHandler={this.onWatchHandler.bind(this)} listId={this.state.watchedListId}/>
    }
    return (
      <div>
        <AuthorizeButton
          onSignInSuccess={this.props.onSignInSuccess}
          isAuthenticated={this.props.isAuthenticated}
        />
        {boardList}
        {listList}
        {watcher}
      </div>
    );
  }
}

export default TrelloForm;

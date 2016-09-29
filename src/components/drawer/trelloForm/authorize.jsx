import React from 'react';
import {Button} from 'react-toolbox/lib/button';
import {List, ListItem} from 'react-toolbox/lib/list';

class AuthorizeButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = { hash: null, fullName: null }
    const trelloToken = window.localStorage.getItem('trello_token')
    if (trelloToken !== null) {
      this.authorize()
    }
  }
  componentWillReceiveProps (props) {
    if (props.isAuthenticated) {
      if (this.state.hash === null) {
        window.Trello.get('members/me', (response) => {
          this.setState({hash: response.avatarHash, fullName: response.fullName})
        });
      }
    } else {
      this.setState({hash: null, fullName: null});
    }
  }
  authorize () {
    window.Trello.authorize({
      type: 'popup',
      name: 'Planning BDC',
      scope: {
        read: true,
      },
      expiration: 'never',
      success: () => {
        this.props.onSignInSuccess()
      },
      error: () => {
        console.warn('Error during Trello authorization');
      }
    });
  }
  render () {
    if (this.props.isAuthenticated && this.state.hash !== null) {
      const avatarUrl = `https://trello-avatars.s3.amazonaws.com/${this.state.hash}/50.png`;
      return (
        <List>
          <ListItem
            avatar={avatarUrl}
            caption={this.state.fullName}
          />
        </List>
      )
    } else {
      return (
        <Button onClick={this.authorize.bind(this)} raised primary label='Connect To Trello' />
      );
    }
  }
}

export default AuthorizeButton;

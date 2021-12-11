import React, { Component } from 'react';
import {Menu} from "semantic-ui-react";
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
  
  //Navbar active item
  state = { activeItem: '' }
  handleItemClick = ({ name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state

    return (
      <div className="big-nav">
        <Menu secondary>
          <Menu.Item as={Link} to='/'>
          <h1 className="nav-title" id="nav-title">Cloudflare Interview</h1>
          </Menu.Item>
          {/*Right hand side of the menu*/}
          <Menu.Menu position='right'>
            <Menu.Item
                name='posts'
                active={activeItem === 'posts'}
                onClick={this.handleItemClick}
                as={Link} to='/posts'
            />
              <Menu.Item
              name='newPost'
              active={activeItem === 'newPost'}
              onClick={this.handleItemClick}
              as={Link} to='/newpost'
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

import React from 'react';
import { Sidebar, Navbar, Nav } from 'rsuite';
import { Link } from 'react-router';
import components from '../componentList';


const DocSidebar = React.createClass({
  render() {
    const { children, menu } = this.props;
    const nodeItems = [];
    menu.default.map((item, key) => {

      nodeItems.push(
        <li key={key} className="nav-header" >
          {item.category}
        </li>
      );

      item.components.map((child, index) => {
        nodeItems.push(
          <Nav.Item key={index} activeClassName="active" componentClass={Link} to={`/components/${child.id}`} >

            {child.name}
            <span className="nav-chinese">{child.title}</span>
          </Nav.Item>
        );
      });
    });



    return (
      <Sidebar >
        {children}
        <Nav className="nav-docs">
          {nodeItems}
          <li className="nav-header">Other</li>
          {
            components.filter((item, index) => {
              return index !== 0;
            }).map((item, index) => {

              return (
                <li key={index}>
                  <a target="_blank" href={item.url}>
                    <i className={item.icon}></i>{' '}
                    {item.name}
                  </a>
                </li>
              );
            })
          }
        </Nav>
      </Sidebar>
    );
  }
});

export default DocSidebar;

import React, { cloneElement, Component, ReactElement } from 'react';

import {
  register,
  unregister,
  matchPath,
} from '..';

interface RouteProps {
  path: string,
  exact: boolean,
  component: ReactElement,
  render?: () => void,
}

export interface IRoute {
  render: () => void,

}

class Route extends Component<RouteProps, IRoute> {
  componentDidMount() {
    addEventListener('popstate', this.handlePop);
    register(this);
  }

  componentWillUnmount() {
    unregister(this);
    removeEventListener('popstate', this.handlePop);
  }

  handlePop = () => this.forceUpdate();

  render() {
    const { path, exact, component, render } = this.props;

    const match = matchPath(location.pathname, { path, exact });
    const params = location.pathname.split('/').pop();
    if (!match) return null;

    if (component && match) return cloneElement(component, { params });

    if (render) return render({ match });

    return null;
  }
}

export default Route;

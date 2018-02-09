import React from 'react';
import ReactDOM from 'react-dom';
import { withNavigation, withFocusable } from 'react-tv-navigation';

import Screen from './Screen'

const styles = {

  fullscreen: {
    width: "100%",
    height: "100%"
  }

}


class App extends React.Component {
  render() {
    return (
      <div style={styles.fullscreen}>
         <Screen/>
      </div>
    );
  }
}

const AppWithNavigation = withNavigation(App)

ReactDOM.render(<AppWithNavigation/>, document.querySelector('#root'));

import React from 'react';
import ReactTV from 'react-tv';
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

ReactTV.render(<AppWithNavigation/>, document.querySelector('#root'));

import React from 'react';
import Radium from 'radium';

console.log("TODO HERE RADIUM", Radium);

const styles = {

    "test": {
	"color": "#FF0000",
	":hover": {
	    "color": "#00FF00"
	}
    }

};

class Screen extends React.Component {

    constructor(props) {
	super(props);

	this.state = {
	    width: 0,
	    height: 0
	};


    }

    render() {
	return (
		<div style={styles.test}>This is an error example</div>
        );
    }

}

export default Radium(Screen);

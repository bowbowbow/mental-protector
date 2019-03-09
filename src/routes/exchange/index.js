import React from 'react';
import { connect } from 'dva';

class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ height: '400px', width: '400px' }}>
        hello
      </div>
    );
  }
}

Exchange.propTypes = {};

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps)(Exchange);

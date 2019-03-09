import React from 'react';
import { connect } from 'dva';
import { Tag, List, Switch } from 'antd-mobile';

import styles from './app.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.title}>멘탈보호기</div>
        <Tag closable
             onClose={() => {
               console.log('onClose');
             }}
             afterClose={() => {
               console.log('afterClose');
             }}
        >
          코스모
        </Tag>
        <Switch onClick={(checked) => { console.log(checked); }}/>
      </div>
    );
  }
}

App.propTypes = {};

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps)(App);

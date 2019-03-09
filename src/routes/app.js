import React from 'react';
import _ from 'lodash';
import { connect } from 'dva';
import { Alert, Tag, Input, Tooltip, Icon, Switch, Badge } from 'antd';

import styles from './app.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: '',
    };
  }

  render() {
    const { app, dispatch } = this.props;
    const { inputVisible, inputValue } = this.state;
    console.log('app :', app);
    return (
      <div className={styles.app}>
        {app.warning ? <Alert message={app.warning} type="warning" banner closable afterClose={() => {
          dispatch({ type: 'app/updateState', payload: { warning: '' } });
        }}/> : null}
        <div className={styles.title}>멘탈보호기
          <Switch
            className={styles.power}
            checked={app.power}
            onClick={(checked) => {
              dispatch({ type: 'app/updateState', payload: { power: checked } });
            }}/>
        </div>
        <div className={styles.description}>
          {app.power ? <span>현재 멘탈보호기가 작동 중입니다. <Icon type="smile" /></span> : <span>현재 멘탈보호기가 작동 중이지 않습니다. <Icon type="meh" /></span>}
        </div>
        <div className={styles.section}>
          <div className={styles.header}>
            <div className={styles.title}>숨길 단어 <Badge className={styles.badge} count={app.keywords.length} style={{ backgroundColor: '#52c41a' }}/></div>
            <div className={styles.description}>
              특정 코인명을 숨겨 정신을 건강하게 유지하세요.
            </div>
          </div>
          <div className={styles.body}>
            {app.keywords.map((tag, index) => {
              const isLongTag = tag.length > 12;
              const tagElem = (
                <Tag key={tag}
                     closable
                     afterClose={() => {
                       const keywords = _.cloneDeep(app.keywords);
                       _.pull(keywords, tag);
                       dispatch({
                         type: 'app/updateState',
                         payload: {
                           keywords,
                         },
                       });
                     }}>
                  {isLongTag ? `${tag.slice(0, 12)}...` : tag}
                </Tag>
              );
              return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
            })}
            {inputVisible && (
              <Input
                className={styles.tagInput}
                ref={(el) => this.tagInput = el}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                authFocus
                autosize
                onChange={(e) => this.setState({ inputValue: e.target.value })}
                onBlur={() => this.setState({ inputVisible: false, inputValue: '' })}
                onPressEnter={() => {
                  if (!inputValue) {
                    dispatch({
                      type: 'app/updateState',
                      payload: {
                        warning: '단어를 입력해주세요.',
                      },
                    });
                    return;
                  }
                  const keyword = inputValue.trim();
                  if (app.keywords.indexOf(keyword) >= 0) {
                    dispatch({
                      type: 'app/updateState',
                      payload: {
                        warning: `${keyword}는 이미 존재합니다.`,
                      },
                    });
                    return;
                  }
                  const keywords = _.cloneDeep(app.keywords);
                  keywords.push(keyword);
                  dispatch({
                    type: 'app/updateState',
                    payload: {
                      keywords,
                    },
                  });
                  this.setState({ inputValue: '' });
                }}
              />
            )}
            {!inputVisible && (
              <Tag
                onClick={() => this.setState({ inputVisible: true }, () => this.tagInput.focus())}
                style={{ background: '#fff', borderStyle: 'dashed' }}
              >
                <Icon type="plus"/> 새 단어
              </Tag>
            )}
          </div>
        </div>
        <div className={styles.info}>
          <Icon type="info-circle"/> 단어 숨김 기능은 코인판 커뮤니티에서만 작동하며 다른 사이트에서 작동하지 않습니다. 문의: clsrn1581@gmail.com
        </div>
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

import Taro, { Component } from '@tarojs/taro';
import Index from './pages/index';
import { Provider } from '@tarojs/redux';
import configStore from './store';
import cloud from '@tbmp/mp-cloud-sdk';
import 'taro-ui/dist/style/index.scss';
import './app.scss';
import { initRouter } from 'components/router';
import { userInfoInit } from 'public/utils/userinfo';
import { settingManagerInit } from 'public/utils/settings';
import { events } from 'public/utils/eventManager';

cloud.init({
    env: 'online'
});

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const store = configStore();

class App extends Component {
  store = store;
  config = {
      pages: [
          'pages/index/index',
      ],
      window: {
          backgroundTextStyle: 'light',
          navigationBarBackgroundColor: '#fff',
          navigationBarTitleText: '爱用视频',
          navigationBarTextStyle: 'black',
      },
  }
  cloud = cloud;
//   platform = 'mb';
  Settings = settingManagerInit(); // 初始配置
  componentDidMount () {
    // 获取用户信息
    userInfoInit();
    
    // 拿到用户信息后 初始化路由
    events.userInfoCallback.subscribe(() => {
        console.log('拿到了用户信息');
        // initRouter(this.$scope);
    });
    
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
      return (
          <Provider store={store}>
              <Index />
          </Provider>
      );
  }
}

Taro.render(<App />, document.getElementById('app'));

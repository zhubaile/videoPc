import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Block, Button, Input } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';
import cloud from '@tbmp/mp-cloud-sdk';
import { initRouter, handleChangeRoute } from 'components/router';
import { taoAuthListGet, taobaoItemListGet } from './actions';

cloud.init({ env: 'online' });

@connect((store) => {
    return { currentPath: store.routerReducer.currentPath };
})

class Index extends Component {

    config = {
        navigationBarTitleText: '商品视频pc',
        usingComponents: { 'router-view': '../../components/miniapp-router/router-view/router-view' }, // 书写第三方组件的相对路径
    }

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount () {
        initRouter(this.$scope);
    }

    componentDidMount () {
        taobaoItemListGet({  });
    }
    aa = () => {
        handleChangeRoute({ redirect: '/video/videoIndex' });
    }

    render () {
        return (
            <View className='index'>
                <View className='content'>
                    {/* 路由
                    {
                        this.topBarShow(isVipCode, paths, currentAfterSalesData)
                    } */}
                    <router-view>
                        <View slot='appIndex'>
                            <View onClick={this.aa}>
                                app
                            </View>
                        </View>
                        <View slot='videoIndex'>
                            video
                        </View>
                    </router-view>
                </View>
            </View>
        );
    }
}
export default Index;

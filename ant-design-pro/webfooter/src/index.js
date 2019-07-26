import React, { Component } from 'react'
import styles from './index.css';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: '搜索引擎',
          link: '1',
          icon: '',
          desc: '',
          child: [
            {
              label: '百度',
              link: 'https://www.baidu.com',
              icon: '',
              desc: '全球最大的中文搜索引擎',
            },
            {
              label: '搜狗',
              link: 'https://ie.sogou.com/',
              icon: '',
              desc: '高速上网',
            },
            {
              label: '360浏览器',
              link: 'https://browser.360.cn/ee/mac/index.html',
              icon: '',
              desc: '高端用户首选',
            }
          ]
        },
        {
          label: '蚂蚁体验科技',
          link: 'http://xtech.antfin.com/',
          icon: '',
          desc: '',
          child: [
            {
              label: 'Ant Design',
              link: 'https://ant.design/index-cn',
              icon: '',
              desc: 'React UI 组件库',
            },
            {
              label: 'AntV',
              link: 'https://antv.alipay.com/zh-cn/index.html',
              icon: '',
              desc: '数据可视化解决方案',
            },
            {
              label: 'Egg',
              link: 'https://eggjs.org/zh-cn/index.html',
              icon: '',
              desc: '为企业级框架和应用而生',
            }
          ]
        },
        {
          label: '蚂蚁体验科技',
          link: 'http://xtech.antfin.com/',
          icon: '',
          desc: '',
          child: [
            {
              label: 'Ant Design',
              link: 'https://ant.design/index-cn',
              icon: '',
              desc: 'React UI 组件库',
            },
            {
              label: 'AntV',
              link: 'https://antv.alipay.com/zh-cn/index.html',
              icon: '',
              desc: '数据可视化解决方案',
            },
            {
              label: 'Egg',
              link: 'https://eggjs.org/zh-cn/index.html',
              icon: '',
              desc: '为企业级框架和应用而生',
            }
          ]
        }
      ]
    }
  }
  render() {
    return (
      <div className={styles.footer}>
        <div className={styles.map}>
          {this.state.data.map((item, index) => {
            return <div>
              <h3>{item.label}</h3>
              <ul key={index}>
              {item.child.map((nav, i) => {
                return <li>
                  <a href={nav.link}>{nav.label}</a> {nav.desc? <span className={styles.desc}> {nav.desc}</span> : null}
                </li>
              })}
            </ul>
            </div>
          })}
        </div>
        <p className={styles.copyright}>© Copyright;  © 2010-2019 xxx.com版权所有</p>
      </div>
    )
  }
}


import React, { Component } from 'react';
import update from 'react/lib/update';
import Dustbin from './Dustbin';
import Box from './Box';
import './index.less'
import { Input, Radio, Checkbox, InputNumber, DatePicker, Select, Button } from 'antd';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.add = this.add.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.dubbleClick = this.dubbleClick.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
    this.state = {
      flag: false,
      dele: false,
      titles: [{
        id: 1,
        text: '单行文本',
        fun: Input,
        flag: false
      }, {
        id: 2,
        text: '多行文本',
        fun: TextArea,
        flag: false
      }, {
        id: 3,
        text: '下拉菜单',
        fun: Select,
        flag: false
      }, {
        id: 4,
        text: '单选框',
        fun: Radio,
        flag: false
      }, {
        id: 5,
        text: '复选框',
        fun: Checkbox,
        flag: false
      }, {
        id: 6,
        text: '数字',
        fun: InputNumber,
        flag: false
      }, {
        id: 7,
        text: '日期',
        fun: DatePicker,
        flag: false
      }, {
        id: 8,
        text: '日期区间',
        fun: RangePicker,
        flag: false
      }],
      cards: []
    }
  }
  
  moveCard(id, atIndex) {
    const { card, index } = this.findCard(id);
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      },
    }));
    console.log(this.state.cards)
  }

  findCard(id) {
    const { cards } = this.state;
    const card = cards.filter(c => c.id === id)[0];
    return {
      card,
      index: cards.indexOf(card),
    };
  }

  add = (item) => {//自定义区添加组件
    let length = this.state.cards.length;
    let arr = this.state.cards;
    let addObj = {};
    addObj.id = length+1;
    addObj.fun = item.fun;
    addObj.text = item.text;
    arr.push(addObj); 
    this.setState({
      cards: arr,
      flag: true
    })
   
  }

  dubbleClick = (e) => {//双击显示删除框
    e = e || window.event;
    let target = e.target || e.srcElement;
    let id = target.getAttribute('data-id');
    if (!id) { return }
    let arr = this.state.cards.map(item => {
      if (item.id == id) {
        item.flag = !item.flag;
      }
      return item
    });
    let arr1 = arr.filter(item => item.flag);
    if (arr1.length>1) {
      this.setState({
        cards: arr,
        dele: true
      })
    }else {
      this.setState({
        cards: arr,
        dele: false
      })
    }
  }

  click = (e) => {//单点取消删除框
    e = e || window.event;
    let target = e.target || e.srcElement;
    let name = target.getAttribute('data-name');
    let arr = this.state.cards.filter(item => item.flag)
    if (name) return;
    if (name != 'dele' && arr.length) {
      let card = this.state.cards.map(item => {
        item.flag == true ? item.flag = false : null;
        return item 
      })
      this.setState({
        cards: card
      })
    } 
  }

  onDelete = (id) => {//单个删除
    let arr = this.state.cards;
    arr = arr.filter(item => item.id != id);
    this.setState({
      cards: arr
    })
    if(!arr.length){
      this.setState({
        flag: false
      })
    }
  }

  save = () => {//保存按钮事件
    console.log(this.state.cards)
    return this.state.cards
  }
  
  deleteAll = () => {//删除所有已选项
    const arr1 = this.state.cards;
    let arr = arr1.filter(item => !item.flag);
    let length = arr.length;
    if (length) {
      this.setState({
      cards: arr,
      dele:false
      })
    }else {
      this.setState({
        cards: arr,
        dele: false,
        flag: false
      })
    }
  }

  render() {
    const cards = this.state.cards;
    const titles = this.state.titles;
    const text = this.state.cards.map(item => item.text)
    return ( 
        <div 
         className = 'container-wrapper'
         onClick = { this.click }
        >
          <div className = 'innerTop'>
            <p  className = 'controlTitle'>控件库</p>
            <div className = 'controlContent'>
              <div className = 'singleBox' >
                { titles.map(item => (
                  <Box                
                   add = { this.add }
                   key = { item.id } 
                   fun = { item.fun }
                   text = { item.text }
                   style = {{ verticalAlign: 'middle' }} 
                  />
                )) }  
              </div>              
            </div>                    
          </div>
          <div className = 'innerBottom'>
            <p className = 'custom'>
              <span>自定义字段:</span>
              <Button               
               type = 'primary'
               onClick = { this.save }
               className = {this.state.flag ? 'btn-name2' : 'btn-name1'}
              >
                保存设置
              </Button>
            </p>   
            <Dustbin 
             cards = { cards }
             dele = { this.state.dele }
             onDelete = { this.onDelete } 
             moveCard = { this.moveCard }
             findCard = { this.findCard } 
             deleteAll = { this.deleteAll }
             dubbleClick = { this.dubbleClick }
            />         
          </div>
        </div>
    
    );
  }
}





























 /*    */
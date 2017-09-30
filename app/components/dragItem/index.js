
import React, { Component } from 'react';
import Container from './Container';
import update from 'react/lib/update';
import { Icon,  Row, Col, Button, Layout } from 'antd';
import './index.less'
 
export default class SortableCancelOnDropOutside extends Component {
  constructor(props){
    super(props)
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.dropLast = this.dropLast.bind(this);
    this.state = {
      left: false,
      right: true,
      cards: [{
        isChoosed: true,
        isUse: true,
        id: 1,
        text: '总人数',
      }, {
        isChoosed: false,
        isUse: false,
        id: 2,
        text: '客户级别',
      }, {
        isChoosed: true,
        isUse: true,
        id: 3,
        text: '客户所有人',
      }, {
        isChoosed: true,
        isUse: true,
        id: 4,
        text: '省份',
      }, {
        isChoosed: false,
        isUse: false,
        id: 5,
        text: '创建日期',
      }, {
        isChoosed: false,
        isUse: false,
        id: 6,
        text: '电话',
      }, {
        isChoosed: true,
        isUse: true,
        id: 7,
        text: '邮编',
      },{
        isChoosed: false,
        isUse: false,
        id: 8,
        text: '公司',
      }, {
        isChoosed: true,
        isUse: true,
        id: 9,
        text: '所属部门',
      }, {
        isChoosed: false,
        isUse: false,
        id: 10,
        text: '销售额',
      }, {
        isChoosed: true,
        isUse: true,
        id: 11,
        text: '公司网址',
      }, {
        isChoosed: false,
        isUse: false,
        id: 12,
        text: '大区经理',
      }, {
        isChoosed: false,
        isUse: false,
        id: 13,
        text: '工商注册',
      }, {
        isChoosed: false,
        isUse: false,
        id: 14,
        text: '地址',
      }]
     }
  }

  choosed = (data) => {//点击选中
    this.setState({
      cards: this.state.cards.map((item) => {
        if (item.id == data){
          item.isChoosed = !item.isChoosed
        }
        return item
      })
    })
  }

  onClick = (i) => {//点击移动
    if (i){ 
      this.setState({
        cards: this.state.cards.map((item) => {
          if (item.isChoosed) {
            item.isUse = item.isChoosed
          }
          return item
        })
      })
    }else {
      this.setState({
        cards: this.state.cards.map((item) => {
          if (!item.isChoosed) { 
            item.isUse = item.isChoosed 
          }
           return item
      })})
     }
  }

  selected = (e) => {//确定点击源
    e = e || window.event;
    const target = e.target || e.srcElement;
    if (target.getAttribute('data-select') == 'left') {
      this.setState({
        cards: this.state.cards.map((item) => {
          if (item.isUse) {
            item.isChoosed = item.isUse;
          }
          return item;
        })
      })
    }else if (target.getAttribute('data-select') == 'right') {
      this.setState({
        cards: this.state.cards.map((item) => {
          if (!item.isUse){
            item.isChoosed = item.isUse
          }
          return item 
       })
      })
    }else {
      this.setState({
        cards: this.state.cards.map((item) => {
          item.isChoosed = item.isUse;
          return item
        })
      })
    }
  }

  moveCard = (id, atIndex, flag) => {//拖动交换位置
    const { card, index } = this.findCard(id);
    if (card.isUse == flag) {//上下交换
      this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      },
     }))
    }else {
      this.setState({//左右交换
        cards: this.state.cards.map((item) => {
          if (item.id == card.id) {
            item.isUse = !item.isUse;
            item.isChoosed = item.isUse
          }
          return item
        })
      })
    }
  }

  findCard = (id) => {//获取托动源及下标
    const { cards } = this.state;
    const card = cards.filter(c => c.id === id)[0];
    return {
      card,
      index: cards.indexOf(card),
    };
  }

  dropLast = (data, flag) => {//拖到最后一个
    this.setState({
      cards: this.state.cards.map((item) => { 
        if (item.id == data && item.isUse != flag){
          item.isUse = !item.isUse;
          item.isChoosed = item.isUse
        }      
        return item
      })
    })
  }

  arrLength = (data) => {//右侧选中数量
    let arr = this.state.cards;
    let arrChoosed = arr.filter(item => item.isUse && (!item.isChoosed)) || [];
    let arrRight = arr.filter(item => item.isUse) 
    if (arrChoosed.length ==1 && data) {
      let preCard = arrRight.indexOf(arrChoosed[0]) != 0 ? arrRight[arrRight.indexOf(arrChoosed[0])-1] : arrRight[(arrRight.length-1)]
      return {
        flag: true,
        card: arrChoosed[0],
        arrRight: arrRight,
        index: arr.indexOf(arrChoosed[0]),
        atIndex: arr.indexOf(preCard) 
      }
    }
    if (arrChoosed.length ==1 && !data) { 
      let afterCard = arrRight.indexOf(arrChoosed[0]) != arrRight.length-1 ? arrRight[arrRight.indexOf(arrChoosed[0])+1] : arrRight[0];   
      return {
        flag: true,
        card: arrChoosed[0],
        arrRight: arrRight,
        index: arr.indexOf(arrChoosed[0]),
        atIndex: arr.indexOf(afterCard) 
      }
    }
    return {
      flag: false
    }
  } 

  upAndDown = (data) => {//右侧上下移动
    let result = this.arrLength(data);
    let {flag, card, index, atIndex, arrRight} = result;
    if (flag) {
      let arr = this.state.cards;
      let step = arr[index];
      arr[index] = arr[atIndex];
      arr[atIndex] = step;
      this.setState({
        cards: arr
      })
      return
    }
    return
  }
  
  final = () => {//抛出结果
    let arrLeft = this.state.cards.filter((item) => item.isUse == false);
    let arrRight = this.state.cards.filter((item) => item.isUse);
    let arrAll = this.state.cards
    console.log(arrRight)
      return {
        arrAll: arrAll,
        arrLeft: arrLeft,
        arrRight: arrRight 
      } 
      
  }
  
  render() {
    const moveCard = this.moveCard
    const findCard = this.findCard
    const choosed = this.choosed
    const left = this.state.left
    const right = this.state.right
    const dropLast = this.dropLast  
    let arrRight = this.state.cards.filter((item) => item.isUse)
    let arrLeft = this.state.cards.filter((item) => item.isUse == false)
   
    return (
      <div onClick = { this.selected }>
        <Layout style = {{ width:'600px', height:'400px', margin: '50px auto' }}>
          <Row 
           type = "flex"           
           align = "middle" 
           justify = "space-around" 
           style = {{ width:'100%', height:'80%' }}
          >
            <Col span = { 3 }></Col>
            <Col span = { 6 } style = {{ border:'1px solid rgb(16, 142, 233)' }}> 
              <Container 
                select = 'left'
                flag = { left } 
                arr = { arrLeft }
                choosed = { choosed }
                dropLast = { dropLast }             
                moveCard = { moveCard }
                findCard = { findCard }
              />  
            </Col>
            <Col span = { 4 }>  
              <Button  
                onClick = { this.onClick.bind(this, 1) } 
                style = {{ display: 'block', margin: '10px auto' }}
              >
               <Icon type = "right" style = {{ color: 'rgb(16, 142, 233)' }}/>
              </Button>     
              <Button 
                onClick = { this.onClick.bind(this, 0) } 
                style = {{ display:'block', margin: '10px auto' }}
              >
                <Icon type = "left" style = {{ color: 'rgb(16, 142, 233)' }}/>
              </Button>     
            </Col>
            <Col span = { 6 } style = {{ border: '1px solid rgba(150, 150, 150, 0.4)', position: 'relative' }} > 
              <Container                
                select = 'right' 
                flag = { right }
                arr = { arrRight }
                choosed = { choosed }
                dropLast = { dropLast }   
                moveCard = { moveCard }
                findCard = { findCard }
              />  
              <div style = {{ position: 'absolute', left: '105%', top: '-15px' }}>
                <Button 
                  size = 'small' 
                  data-select = 'right'
                  onClick = { this.upAndDown.bind(this, true) }
                  style = {{ display: 'block', margin: '10px 0', border: '1px solid rgba(150, 150, 150, 0.4)' }}
                >
                  <Icon type = "arrow-up" style = {{ color: 'rgb(16, 142, 233)' }}/>
                </Button> 
                <Button 
                  size = 'small' 
                  data-select = 'right'
                  onClick = { this.upAndDown.bind(this, false) }
                  style = {{ display: 'block', margin: '10px 0', border: '1px solid rgba(150, 150, 150, 0.4)' }}
                >
                  <Icon type = "arrow-down" style = {{ color: 'rgb(16, 142, 233)' }}/>
                </Button> 
              </div>          
            </Col>
            <Col span = { 5 }></Col>
          </Row>  
          <Row  
            type = "flex" 
            align = "middle" 
            style = {{ borderTop: '1px solid rgba(150, 150, 150, 0.4)', width: '100%', hdight: '20%' }}
          >
            <Col span = { 18 }></Col>
            <Col span = { 4 }>         
              <Button               
                size = 'large' 
                type = "primary" 
                onClick = { this.final }
                style = {{ marginTop: '20%', marginLeft: '20px' }}
              >
                保存设置
              </Button>
            </Col>
            <Col span = { 2 }></Col>
          </Row>   
        </Layout >
      </div>
    );
  }
}

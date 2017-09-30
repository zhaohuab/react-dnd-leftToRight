import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { Input, Dropdown, Radio, Checkbox, InputNumber, DatePicker, Select, Button } from 'antd';
const { TextArea } = Input;
const { RangePicker } = DatePicker;
import Card from './Card'
import ItemTypes from './ItemTypes';
import './index.less'

const style = {
  overflow: 'hidden', 
  width: '90%', 
  margin: '20px', 
  border: '1px dashed rgb(222, 222, 222)',
  minHeight: '100px',
  padding: '1rem',
  fontSize: '1rem',
  position: 'relative',
};

const boxTarget = {
   drop() {
    return {};
  }, 
};

@DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class Dustbin extends Component {

  constructor(props) {
    super(props)
  }

  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
  };

  render() {
    const { connectDropTarget, cards, onDelete, moveCard, findCard, dubbleClick, deleteAll, dele } = this.props;
    {/*  
      const isActive = canDrop && isOver;
      let backgroundColor = '#222';
      if (isActive) {
      backgroundColor = 'darkgreen';
      } else if (canDrop) {
      backgroundColor = 'yellow';
      } */}

    return connectDropTarget(
      <div style = {{ ...style }} >
        { cards.map(item => (   
          <div 
           data-id = { item.id }
           className = { item.flag ? 'list' : 'listTwo' }  
           key = { item.id }
          >
           <Card 
            id = { item.id }
            Fun = { item.fun }
            text = { item.text }
            flag = { item.flag }
            onDelete = { onDelete }
            moveCard = { moveCard }
            findCard = { findCard }
            dubbleClick = { dubbleClick }
           />
          </div>
        )) } 
        <Button
         className = 'btn-delete2'
         onClick = { deleteAll }
         type = 'danger'
        >删除全部</Button>
      </div>
    );
  }
}


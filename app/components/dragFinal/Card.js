import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { Input, Radio, Checkbox, InputNumber, DatePicker, Select } from 'antd';
import ItemTypes from './ItemTypes';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const style = {
  padding: '0.5rem 1rem',
  marginBottom: '.1rem',
  textAlign: 'left',
  cursor: 'pointer'
};

const cardSource = {
  beginDrag(props) {
    return {
      flag: true,
      id: props.id,
      originalIndex: props.findCard(props.id).index,
    };
  },

  endDrag(props, monitor) {
    const didDrop = monitor.didDrop(); 
    const { id: droppedId, originalIndex, flag } = monitor.getItem();
    if (!flag) { return }    
    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
    }
  },
};

const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: overId } = props;
    const { id: draggedId, flag } = monitor.getItem();
    if (!flag) { return }  
    if (draggedId !== overId) {   
      const { index: overIndex } = props.findCard(overId);
      props.moveCard(draggedId, overIndex);
    }
  },
};

@DropTarget(ItemTypes.BOX, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.BOX, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Card extends Component {
  constructor(props){
    super(props);
  }
  
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  /*   isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
    findCard: PropTypes.func.isRequired, */
  };

  render() {
    const { className, id, text, isDragging, connectDragSource, connectDropTarget, select, Fun, findCard, moveCard, onDelete, flag, dubbleClick } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div 
        onDoubleClick = {dubbleClick}
        style={{ ...style }}
        data-index = { id }
        data-select = { select }
        className = { className }
      >
        <span 
          className = 'card-label'
          data-id = { id }
          data-name = 'show'
        >
          { text }:
        </span>
        <Fun style = {{ display: 'inline-block', verticalAlign: 'middle', width: '80%' }} />
        <span 
          data-name = 'dele'
          className = { flag ? 'delete' : 'deleteTwo'}
          onClick = { onDelete.bind(this,id) }         
        >
          X
        </span>
      </div>
    ));
  }
}







































//托动源和接收源谁在外边谁在里边，区别是什么？？？？？
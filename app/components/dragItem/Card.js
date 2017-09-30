import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';


const style = {
  padding: '0.5rem 1rem',
  marginBottom: '.1rem',
  textAlign: 'left',
  cursor: 'pointer'
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index,
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();
    
    if (!didDrop) {
      props.moveCard(droppedId, originalIndex, props.flag);
    }
  },
};

const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;
    console.log('xxxxxx',draggedId,overId)
    if (draggedId !== overId) {
    
      const { index: overIndex } = props.findCard(overId);
      props.moveCard(draggedId, overIndex, props.flag);
    }
  },
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
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
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
    findCard: PropTypes.func.isRequired,
  };

  render() {
    const { className, id, text, isDragging, connectDragSource, connectDropTarget, flag, select } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div 
        style={{ ...style, opacity }}
        data-index = { id }
        data-select = { select }
        className = { className }
      >
        { text }
      </div>,
    ));
  }
}

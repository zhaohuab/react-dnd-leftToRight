import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style = {
  margin: '0 10px',
  cursor: 'pointer',
  fontSize: '14px',
  padding: '0.5rem 1rem',
  display: 'inline-block',
  backgroundColor: 'rgb(255, 255, 255)',
};

const boxSource = {
  beginDrag(props) {
    return {     
      fun: props.fun,
      text: props.text
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();    
    const didDrop = monitor.didDrop();
    const dropResult = monitor.getDropResult();
    if (dropResult) {  
      props.add(item)
    }
  },
};

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Box extends Component {
  static propTypes = {   
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  };

  render() {
    const { isDragging, connectDragSource, add, text, fun } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      connectDragSource(
        <div style={{ ...style, opacity }}>
          { text }
        </div>
      )
    );
  }
}

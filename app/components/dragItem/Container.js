import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react/lib/update';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';
import ItemTypes from './ItemTypes';

const style = {
  width: '100%',
  height: '255px',
  textAlign: 'left',
  overflowY: 'scroll',
  background: 'rgba(255,255,255,1)',
};

const cardTarget = {
  drop(props, monitor) {
    const flag = props.flag;
    const id = monitor.getItem().id;
    const isOver = monitor.isOver({ shallow:true });
    if (isOver){
      props.dropLast(id, flag);
    }
   },
};

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }
 
  choose = (e) => {
    e = e || window.event;
    const target = e.target || e.srcElement;
    let index = target.getAttribute('data-index');
    this.props.choosed(index)  
  } 
 
  render() {
    const { moveCard, findCard, connectDropTarget, flag, select, dropLast } = this.props;
    const  cards  = this.props.arr;

    return connectDropTarget(
      <div  
        onClick = { this.choose } 
        style = { style }
      >
        { cards.map(card => (
          <Card
            id = { card.id }          
            flag = { flag }
            key = { card.id } 
            select = { select }          
            text = { card.text }
            moveCard = { moveCard }
            findCard = { findCard }
            className = { card.isChoosed == card.isUse ? '' : 'chosed' }
          />
        )) }
      </div>
    );
  }
}

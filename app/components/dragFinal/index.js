import React, { Component } from 'react';
import Container from './Container';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export default class DustbinSingleTarget extends Component {
  render() {
    return (
      <DragDropContextProvider backend = { HTML5Backend }>
      <div>
        <Container />
      </div>
      </DragDropContextProvider>
    );
  }
}
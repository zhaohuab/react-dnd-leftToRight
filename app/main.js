import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRedirect } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import DragFinal  from './components/dragFinal/index.js';
import LeftAndRight  from './components/leftAndRight/index.js';

const history = createBrowserHistory()

ReactDom.render(   
  <Router history = { history }>
    <div>
      <Route exact path="/" component = { DragFinal } /> 
      <Route path="/dragFinal" component = { DragFinal }/> 
      <Route path="/leftAndRight" component = { LeftAndRight }/> 
    </div> 
  </Router>,    
  document.getElementById('root')
)
































/* 
ReactDom.render(   
  
  <Router history = { history }>
    <Route path = '/' component = { App }>
    <IndexRedirect component = { DragFinal }/>
    <Route path="/DragFinal" component = { DragFinal }/> 
    <Route path="/dragFinal" component = { DragFinal }/>
    </Route>  
  </Router>,    
  document.getElementById('root')
);



/* //import Demo1 from './components/demo1/index.js';//象棋马步
import Demo21 from './componentDemo/demo2/Copy or Move/index.js';//一行元素往另一行元素中拖动
import Demo22 from './componentDemo/demo2/Multiple Targets/index.js';
import Demo23 from './componentDemo/demo2/Single Target/index.js';
import Demo24 from './componentDemo/demo2/Single Target in iframe/index.js';
import Demo25 from './componentDemo/demo2/Stress Test/index.js';
import Demo4 from './componentDemo/demo4/Naive/index.js';//父级内部可以自由拖动，随意放置
import Demo5 from './componentDemo/demo5/Drop Targets/index.js';//确定把拖拽源拖放到子元素还是自己
import Demo6 from './componentDemo/demo6/Cancel on Drop Outside/index.js';//单列内部上下拖拽
import Demo71 from './componentDemo/demo7/Drop Effects/index.js';//一列元素往一个块级元素中拖动
import Demo72 from './componentDemo/demo7/Handles and Previews/index.js';
import Demo8 from './componentDemo/demo8/Native Files/index.js';//拖拽上传文件
import DragComponents  from './componentDemo/dragComponents/index.js'; */
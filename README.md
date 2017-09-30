# drag
## beginDrag
- 这是拖拽插件唯一必须的拖拽动作，表示拖拽开始，拖拽开始时回调，可以返回一个简单对象，也可以什么都不做
- 返回的对象是drag的endDrag方法中monitor.getItem()的值；我们需要在endDrag方法中给回调函数传参的话，就在beginDrag中设计好返回对象，这个对象一般都是父组件传递过来的拖拽对象本身的属性，和自己定义的状态标志
- 返回的对象也是drop的hove方法中monitor.getItem()的值，与上边作用类似；需要理清的是我们究竟是在拖拽源放下时候回调我们的方法，还是在拖拽源悬停在拖拽目标上时回调我们的方法

## endDrag
- 拖拽停止时调用，可选
- 我们可以在endDrag方法中利用monitor.getDropResult（）判断拖拽源是不是放在了拖拽目标内，再决定是否调用我们自定义方法，避免没有放到拖拽目标内就执行我们自定义方法；所以这个endDrag一般都是和drop方法连用，以确定拖拽源放置在拖拽目标内之后再执行我们的自定义方法。可以利用monitor.didDrop()和monitor.getDropResult（）结合测试嵌套目标

## canDrag
- 决定是否允许拖拽，可以在超过了某些我们的允许条件时候禁止

## isDragging
-  默认情况下，只有启动拖动操作的拖动源被认为是拖动。monitor.isDragging返回一个布尔值。所以我们可以通过isDragging判断拖拽源是不是正处于拖动状态，是的话，设置一些操作，比如样式不一样等等；这个方法可以使用我们自己的方法重写。

# drop
 ## drop
 - 当拖拽源放到相应的兼容目标上时调用。可以有返回值，返回值会作为endDrag方法中的monitor.getDropResult（）的值。如果在拖拽系统中只有一个目标源，这个drop设不设置返回值作用不大，当然如果我们想通过这种返回值的方式给我们的自定义方法传参得话另当别论。我们在drop中设置返回值的最主要用途是根据monitor.getDropResult（）的值判断是那个目标源。目标源多的话我们的拖拽源不知道放到哪里，可以通过判断目标源drop返回值的状态不同，确定目标源
 - 如果定义canDrap方法并返回false，则这个方法不会调用。

## hover
- 当拖拽源悬停在目标源上时调用，当有嵌套目标时，可以利用isOver({shallow:true})测试
## candrop
- 指定该目标源是否接受拖拽源，如果一只允许可以不用管他

## 关于嵌套目标
- 查询嵌套目标的具体判断？？？？？？
- getDropResult():用于嵌套目标；当一列嵌套目标源接受一个拖拽源的时候，按自下而上的顺序，父级目标源的drop返回的结果会覆盖掉子级drop中设定的结果。在拖拽源的endDrag方法中的monitor.getDropResult（）获取到的结果只是最深层级父级的drop方法中返回的结果。
- 不管目标源中是否设置drop事件，以及设置了是否返回一个明确的对象，拖拽源在目标源中放下的时候，拖拽源中的endDrag方法中的monitor.didDrag()和monitor.getDropResult（）均返回true
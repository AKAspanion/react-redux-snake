(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(e,a,t){e.exports=t(31)},30:function(e,a,t){},31:function(e,a,t){"use strict";t.r(a);var r=t(0),o=t.n(r),n=t(12),c=t.n(n),l=t(13),p=t(6),i=t(2),s=t(18),d=t(15),u=t(16),y=t(19),v=t(17),f=t(20),m=37,h=38,w=39,E=40,k=13,O=20,g=100,A={x:0,y:-1},T={x:0,y:1},b={x:-1,y:0},S={x:1,y:0},j={grid:function(e){for(var a=[],t=0;t<e;t++){for(var r=[],o=0;o<e;o++)r.push({row:t,col:o});a.push(r)}return a}(O),apple:{row:Math.floor(Math.random()*O),col:Math.floor(Math.random()*O)},snake:{head:{row:9,col:9},velocity:{x:1,y:0},tail:[{row:9,col:8},{row:9,col:7}]},gameOver:!1},H=(t(30),function(e){function a(){var e,t;Object(d.a)(this,a);for(var r=arguments.length,n=new Array(r),c=0;c<r;c++)n[c]=arguments[c];return(t=Object(y.a)(this,(e=Object(v.a)(a)).call.apply(e,[this].concat(n)))).componentDidMount=function(){t.start()},t.start=function(){t.props.reset({state:j}),document.addEventListener("keydown",function(e){t.moveSnake(e)}),setTimeout(function(){t.gameLoop()},g)},t.gameLoop=function(){if(!t.props.gameOver){var e=t.props,a=e.snake,r=e.apple,o={row:a.head.row+a.velocity.y,col:a.head.col+a.velocity.x};t.props.updateSnakeHead({newHead:o});var n=[a.head].concat(Object(s.a)(a.tail)),c=r;t.snakeEatsApple()?(c=t.getRandomApple(),t.props.createApple({newApple:c})):n.pop(),t.props.updateSnakeTail({newTail:n}),t.moveOnEdge(),t.isTail(t.props.snake.head)&&t.props.setGameOver({flag:!0}),setTimeout(function(){t.gameLoop()},g)}},t.moveOnEdge=function(){var e=t.props.snake;if(t.isOffEdge(e.head))if(e.head.col>O-1){var a={row:e.head.row+e.velocity.y,col:-1+e.velocity.x};t.props.updateSnakeHead({newHead:a})}else if(e.head.col<0){var r={row:e.head.row+e.velocity.y,col:O+e.velocity.x};t.props.updateSnakeHead({newHead:r})}else if(e.head.row<0){var o={row:O+e.velocity.y,col:e.head.col+e.velocity.x};t.props.updateSnakeHead({newHead:o})}else if(e.head.row>O-1){var n={row:-1+e.velocity.y,col:e.head.col+e.velocity.x};t.props.updateSnakeHead({newHead:n})}},t.getRandomApple=function(){var e=t.props.grid,a=[];return e.forEach(function(e){e.forEach(function(e){t.isTail(e)||t.isHead(e)||a.push(e)})}),a[Math.floor(Math.random()*a.length)]},t.snakeEatsApple=function(){var e=t.props,a=e.apple,r=e.snake;return a.row===r.head.row&&a.col===r.head.col},t.isOffEdge=function(){var e=t.props.snake;if(e.head.col>O-1||e.head.col<0||e.head.row>O-1||e.head.row<0)return!0},t.isHead=function(e){var a=t.props.snake;return a.head.row===e.row&&a.head.col===e.col},t.isApple=function(e){var a=t.props.apple;return a.row===e.row&&a.col===e.col},t.isTail=function(e){return t.props.snake.tail.find(function(a){return a.row===e.row&&a.col===e.col})},t.moveSnake=function(e){var a=t.props.snake;switch(e.keyCode){case h:if(a.velocity===A||a.velocity===T)return;return void t.props.updateSnakeVelocity({newVelocity:A});case m:if(a.velocity===b||a.velocity===S)return;return void t.props.updateSnakeVelocity({newVelocity:b});case E:if(a.velocity===A||a.velocity===T)return;return void t.props.updateSnakeVelocity({newVelocity:T});case w:if(a.velocity===b||a.velocity===S)return;return void t.props.updateSnakeVelocity({newVelocity:S});case k:return void(t.props.gameOver&&t.start());default:return}},t.renderGrid=function(){var e=t.props,a=e.grid,r=e.snake;return o.a.createElement("div",{className:"center"},o.a.createElement("h3",{className:"score"},"Score: ",r.tail.length-2),o.a.createElement("section",{className:"grid",style:{gridTemplateColumns:"repeat(".concat(O,", 1fr)"),gridTemplateRows:"repeat(".concat(O,", 1fr)")}},a.map(function(e){return e.map(function(e){return o.a.createElement("div",{key:"".concat(e.row," ").concat(e.col),style:{width:"".concat(800/O),height:"".concat(800/O)},className:"cell ".concat(t.isHead(e)?"head":t.isApple(e)?"apple":t.isTail(e)?"tail":"")})})})))},t.renderGameOver=function(){return o.a.createElement("div",{className:"card text-center"},o.a.createElement("div",{className:"card-body"},o.a.createElement("h1",{className:"card-title"},"You bit yourself!!"),o.a.createElement("p",{className:"card-text"},"Your Score is: ",t.props.snake.tail.length-2),o.a.createElement("button",{className:"btn btn-primary",onClick:t.start},"Restart")))},t}return Object(f.a)(a,e),Object(u.a)(a,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},this.props.gameOver?this.renderGameOver():this.renderGrid())}}]),a}(r.Component)),_=Object(p.b)(function(e){return{grid:e.game.grid,apple:e.game.apple,snake:e.game.snake,gameOver:e.game.gameOver}},{reset:function(e){return{type:"RESET",payload:e}},createApple:function(e){return{type:"CREATE_APPLE",payload:e}},setGameOver:function(e){return{type:"GAME_OVER",payload:e}},updateSnakeTail:function(e){return{type:"UPDATE_TAIL",payload:e}},updateSnakeHead:function(e){return{type:"UPDATE_HEAD",payload:e}},updateSnakeVelocity:function(e){return{type:"UPDATE_VELOCITY",payload:e}}})(H),V=t(1),x=Object(i.c)({game:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"RESET":return Object(V.a)({},a.payload.state);case"GAME_OVER":return Object(V.a)({},e,{gameOver:a.payload.flag});case"CREATE_APPLE":return Object(V.a)({},e,{apple:a.payload.newApple});case"UPDATE_HEAD":return Object(V.a)({},e,{snake:Object(V.a)({},e.snake,{head:a.payload.newHead})});case"UPDATE_TAIL":return Object(V.a)({},e,{snake:Object(V.a)({},e.snake,{tail:a.payload.newTail})});case"UPDATE_VELOCITY":return Object(V.a)({},e,{snake:Object(V.a)({},e.snake,{velocity:a.payload.newVelocity})});default:return e}}}),N=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||i.d,D=Object(i.e)(x,N(Object(i.a)(l.a)));c.a.render(o.a.createElement(p.a,{store:D},o.a.createElement(_,null)),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.750a876c.chunk.js.map
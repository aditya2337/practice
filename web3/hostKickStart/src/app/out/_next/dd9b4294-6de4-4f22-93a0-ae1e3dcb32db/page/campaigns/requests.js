
          window.__NEXT_REGISTER_PAGE('/campaigns/requests', function() {
            var comp = module.exports=webpackJsonp([6],{704:function(e,t,l){e.exports=l(705)},705:function(e,t,l){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=l(37),a=n(r),u=l(73),o=n(u),s=l(40),d=n(s),c=l(20),f=n(c),p=l(4),i=n(p),m=l(5),v=n(m),h=l(6),E=n(h),C=l(7),y=n(C),_=l(0),q=n(_),b=l(43),k=l(101),w=n(k),x=l(706),A=n(x),R=l(68),g=l(104),T=n(g),z=function(e){function t(){return(0,i.default)(this,t),(0,E.default)(this,(t.__proto__||(0,f.default)(t)).apply(this,arguments))}return(0,y.default)(t,e),(0,v.default)(t,[{key:"renderRow",value:function(){var e=this;return this.props.requests.map(function(t,l){return q.default.createElement(A.default,{id:l,request:t,key:l,address:e.props.address,approversCount:e.props.approversCount})})}},{key:"render",value:function(){var e=b.Table.Header,t=b.Table.Row,l=b.Table.HeaderCell,n=b.Table.Body;return q.default.createElement(w.default,null,q.default.createElement("h3",null,"Requests"),q.default.createElement(R.Link,{route:"/campaigns/"+this.props.address+"/requests/new"},q.default.createElement("a",null,q.default.createElement(b.Button,{primary:!0,floated:"right",style:{marginBottom:10}},"Add Request"))),q.default.createElement(b.Table,{celled:!0},q.default.createElement(e,null,q.default.createElement(t,null,q.default.createElement(l,null,"ID"),q.default.createElement(l,null,"Description"),q.default.createElement(l,null,"Amount"),q.default.createElement(l,null,"Recepient"),q.default.createElement(l,null,"Approval Count"),q.default.createElement(l,null,"Approve"),q.default.createElement(l,null,"Finalize"))),q.default.createElement(n,null,this.renderRow())),q.default.createElement("div",null,"Found ",this.props.requestCount," Requests"))}}],[{key:"getInitialProps",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,d.default)(a.default.mark(function e(t){var l,n,r,u,s;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return l=t.query.address,n=(0,T.default)(l),e.next=4,n.methods.getRequestCount().call();case 4:return r=e.sent,e.next=7,n.methods.approversCount().call();case 7:return u=e.sent,e.next=10,o.default.all(Array(parseInt(r)).fill().map(function(e,t){return n.methods.requests(t).call()}));case 10:return s=e.sent,e.abrupt("return",{address:l,requests:s,requestCount:r,approversCount:u});case 12:case"end":return e.stop()}},e,this)}));return e}()}]),t}(_.Component);t.default=z},706:function(e,t,l){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=l(37),a=n(r),u=l(40),o=n(u),s=l(20),d=n(s),c=l(4),f=n(c),p=l(5),i=n(p),m=l(6),v=n(m),h=l(7),E=n(h),C=l(0),y=n(C),_=l(43),q=l(54),b=n(q),k=l(104),w=n(k),x=function(e){function t(){var e,l,n,r,u=this;(0,f.default)(this,t);for(var s=arguments.length,c=Array(s),p=0;p<s;p++)c[p]=arguments[p];return l=n=(0,v.default)(this,(e=t.__proto__||(0,d.default)(t)).call.apply(e,[this].concat(c))),n.onApprove=(0,o.default)(a.default.mark(function e(){var t,l;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,w.default)(n.props.address),e.next=3,b.default.eth.getAccounts();case 3:return l=e.sent,e.next=6,t.methods.approveRequest(n.props.id).send({from:l[0]});case 6:case"end":return e.stop()}},e,u)})),n.onFinalize=(0,o.default)(a.default.mark(function e(){var t,l;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,w.default)(n.props.address),e.next=3,b.default.eth.getAccounts();case 3:return l=e.sent,e.next=6,t.methods.finializeRequest(n.props.id).send({from:l[0]});case 6:case"end":return e.stop()}},e,u)})),r=l,(0,v.default)(n,r)}return(0,E.default)(t,e),(0,i.default)(t,[{key:"render",value:function(){var e=_.Table.Row,t=_.Table.Cell,l=this.props,n=l.id,r=l.request,a=l.approversCount,u=r.approvalCount>a/2;return y.default.createElement(e,{disabled:r.complete,positive:u&&!r.complete},y.default.createElement(t,null,n),y.default.createElement(t,null,r.description),y.default.createElement(t,null,b.default.utils.fromWei(r.value,"ether")),y.default.createElement(t,null,r.recipient),y.default.createElement(t,null,r.approvalCount+"/"+a),y.default.createElement(t,null,!r.complete&&y.default.createElement(_.Button,{color:"green",basic:!0,onClick:this.onApprove},"Approve")),y.default.createElement(t,null,!r.complete&&y.default.createElement(_.Button,{color:"teal",basic:!0,onClick:this.onFinalize},"Finalize")))}}]),t}(C.Component);t.default=x}},[704]);
            return { page: comp.default }
          })
        
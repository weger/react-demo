/**
 *  React Element
 */

// var div = React.creatElement('div', null, 'Hello React');

var div = <div>Hello React</div>;

// React.render(div, document.body);

// React.render(
//     <h1>Hello, world!</h1>,
//     document.getElementById('example')
// );



/**
 *  React Component
 */
var HelloMessage = React.createClass({
    render: function (){
        return <div>Hello {this.props.name}</div>
    }
});

// React.render(<HelloMessage name="abc" />, document.body);



/**
 *  React Stateful Component
 */
var Greeting = React.createClass({
    getInitialState: function (){
        return {
            greeted: false
        };
    },
    greet: function (){
        this.setState({
            greeted: !this.state.greeted
        });
    },
    render: function (){
        var response = this.state.greeted ? 'Hi' : 'Hello';
        var say = this.state.greeted ? 'Hello' : 'Hi';

        return (
            <div>
                <div>{response} {this.props.name}</div>
                <button onClick={this.greet}>say {say}</button>
            </div>
        );
    }
});

// React.render(<Greeting name="foo" />, document.body);



/**
 *  React props && state
 *
 */
var users = ["foo", "bar", "baz"];

var GreetingApp = React.createClass({
  render: function () {
    var greetings = this.props.users.map(function (user) {
      return <Greeting name={user} />;
    });

    return <div>{greetings}</div>;
  }
});


// React.render(<GreetingApp users={users} />, document.body);


/**
 *  React '...'操作符
 *
 */
var props = {foo: 'default'};
var Component = React.createClass({
    render : function () {
        return <div>{this.props.foo}</div>;
    }
})
var component = <Component {...props} foo={'override'} />;
console.log(component.props.foo);

// React.render(component, document.body);


/**
 *  React Component 生命周期
 *
 */
var LikeButton = React.createClass({
    getInitialState: function () {
        return {
            liked: false
        }
    },
    getDefaultProps: function (){
        console.log(this.props);
    },
    componentWillMount: function () {
        console.log('component Will Mount');
    },
    componentDidMount: function () {
        console.log('component Did Mount,and dom structure:');
        console.log(this.getDOMNode());
    },
    handleClick: function (param, event) {
        console.log(param, event);

        this.setState({
            liked: !this.state.liked
        });
    },
    render: function () {
        var text = this.state.liked ? 'like' : 'haven\'t liked';

        return (
            <div onClick={this.handleClick.bind(this, 'abc')}>
                You {text} this. Click to toggle.
            </div>
        );
    }
});

// React.render(<LikeButton />, document.getElementById('example'))



/**
 *  React Component Dom 操作
 *  ref引用元素
 */

var FormInput = React.createClass({
    getInitialState: function () {
        return {
            userInput: ''
        }
    },
    handleChange: function (e) {
        this.setState({
            userInput: e.target.value
        });
    },
    clearAndFocusInput: function () {
        this.setState({
            userInput: ''
        }, function () {
            this.refs.theInput.getDOMNode().focus();
        });
    },
    render: function () {
        return (
            <div>
                <div onClick={this.clearAndFocusInput}>
                    Click to Focus and Reset
                </div>
                <input ref='theInput' value={this.state.userInput} onChange={this.handleChange}  />
            </div>
        );
    }
});

// React.render(<FormInput />, document.getElementById('example'))


/**
 *  React Component 组合组件
 *  组件模块化：
 *  一个显示用户头像的组件 Avatar 包含两个子组件 ProfilePic 显示用户头像和 ProfileLink 显示用户链接
 */
var Avatar = React.createClass({
    render: function (){
        return (
            <div>
                <ProfilePic username={this.props.username} />
                <ProfileLink username={this.props.username} />
            </div>
        )
    }
});

var ProfilePic = React.createClass({
    render: function (){
        return (
            <img src={'http://graph.facebook.com/' + this.props.username + '/picture'} />
        );
    }
});

var ProfileLink = React.createClass({
    render: function (){
        return (
            <a href={'http://www.facebook.com/' + this.props.username}>
                {this.props.username}
            </a>
        );
    }
});

// React.render(<Avatar username="barackobama" />, document.getElementById('example'));


/**
 *  React Component 循环插入子元素
 *
 */
var Child = React.createClass({
    render: function () {
        return  <li>{this.props.data.text}</li>;
    }
});

var Parent = React.createClass({
    /*getDefaultProps: function (){
        return {
            results: [{
                id: 1,
                text: "aaaaaa"
            }, {
                id: 2,
                text: "bbbbbb"
            }]
        };
    },*/
    componentDidMount: function () {
        console.log(this.props);
    },
    render: function () {
        var results = this.props.results;

        return (
            <ol>
                {results.map(function (result) {
                    return <Child key={result.id} data={result} />;
                })}
            </ol>
        )
    }
});


// React.render(<Parent results={[{id:1,text:111},{id:2,text:222}]} />, document.getElementById('example'));


/**
 *  React Component Mixins
 *  Mixins 不同的组件之间可能会共用一些功能，共享一部分代码
 *  可以有“生命周期”方法
 */
var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    }
};

var TickTock = React.createClass({
    mixins: [SetIntervalMixin], // Use mixin
    getInitialState: function (){
        return {
            seconds: 0
        }
    },
    componentDidMount: function() {
        // Call a method on the mixin, use this
        this.setInterval(this.tick, 1000);
    },
    tick: function () {
        this.setState({seconds: this.state.seconds + 1});
    },
    render: function () {
        return (
            <p>
                React has been running for {this.state.seconds} seconds.
            </p>
        )
    }
});

React.render(<TickTock />, document.getElementById('example'));



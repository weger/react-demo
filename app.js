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

React.render(<FormInput />, document.getElementById('example'))




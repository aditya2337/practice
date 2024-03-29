'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _campaign = require('../../../ethereum/campaign');

var _campaign2 = _interopRequireDefault(_campaign);

var _Layout = require('../../../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _web = require('../../../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _routes = require('../../../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RequestNew = function (_Component) {
  (0, _inherits3.default)(RequestNew, _Component);

  function RequestNew() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RequestNew);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RequestNew.__proto__ || (0, _getPrototypeOf2.default)(RequestNew)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      description: '',
      value: '',
      recepient: '',
      errorMessage: '',
      loading: false
    }, _this.handleSubmit = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(e) {
        var campaign, _this$state, description, value, recepient, accounts;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();

                campaign = (0, _campaign2.default)(_this.props.address);
                _this$state = _this.state, description = _this$state.description, value = _this$state.value, recepient = _this$state.recepient;

                _this.setState({ loading: true, errorMessage: '' });

                _context.prev = 4;
                _context.next = 7;
                return _web2.default.eth.getAccounts();

              case 7:
                accounts = _context.sent;
                _context.next = 10;
                return campaign.methods.createRequest(description, _web2.default.utils.toWei(value, 'ether'), recepient).send({
                  from: accounts[0]
                });

              case 10:
                _routes.Router.pushRoute('/campaigns/' + _this.props.address + '/requests');
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context['catch'](4);

                _this.setState({ errorMessage: _context.t0.message });

              case 16:

                _this.setState({ loading: false });

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[4, 13]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.handleChange = function (e, state) {
      return _this.setState((0, _defineProperty3.default)({}, state, e.target.value));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RequestNew, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          description = _state.description,
          value = _state.value,
          recepient = _state.recepient,
          errorMessage = _state.errorMessage,
          loading = _state.loading;

      return _react2.default.createElement(_Layout2.default, null, _react2.default.createElement(_routes.Link, { route: '/campaigns/' + this.props.address + '/requests' }, _react2.default.createElement('a', null, 'Back')), _react2.default.createElement('h3', null, 'Create a request'), _react2.default.createElement(_semanticUiReact.Form, {
        onSubmit: this.handleSubmit,
        error: !!this.state.errorMessage.length }, _react2.default.createElement(_semanticUiReact.Form.Field, null, _react2.default.createElement('label', null, 'Description'), _react2.default.createElement(_semanticUiReact.Input, {
        value: description,
        onChange: function onChange(e) {
          return _this3.handleChange(e, 'description');
        }
      })), _react2.default.createElement(_semanticUiReact.Form.Field, null, _react2.default.createElement('label', null, 'Value in Ether'), _react2.default.createElement(_semanticUiReact.Input, {
        value: value,
        onChange: function onChange(e) {
          return _this3.handleChange(e, 'value');
        }
      })), _react2.default.createElement(_semanticUiReact.Form.Field, null, _react2.default.createElement('label', null, 'Recepient'), _react2.default.createElement(_semanticUiReact.Input, {
        value: recepient,
        onChange: function onChange(e) {
          return _this3.handleChange(e, 'recepient');
        }
      })), _react2.default.createElement(_semanticUiReact.Message, { error: true, header: 'Oops!', content: errorMessage }), _react2.default.createElement(_semanticUiReact.Button, { loading: loading, primary: true, type: 'submit' }, 'Create!')));
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(props) {
        var address;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                address = props.query.address;
                return _context2.abrupt('return', { address: address });

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getInitialProps(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return RequestNew;
}(_react.Component);

exports.default = RequestNew;
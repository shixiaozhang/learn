// 通过节流来控制message的展示
import { Message } from 'element-ui';

const showMessageFunc = function () {
  const messageList = [];
  return function (options) {
    const index = messageList.findIndex(
      item => item.type === options.type && item.message === options.message
    );
    if (index >= 0) {
      return;
    }
    messageList.push({ type: options.type, message: options.message });
    Message(options);
    setTimeout(() => {
      messageList.splice(index, 1);
    }, options.duration || 3000);
  };
};
const showMessage = showMessageFunc();

const MyMessage = function (options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  showMessage(options);
};

['success', 'warning', 'info', 'error'].forEach(type => {
  MyMessage[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return MyMessage(options);
  };
});

export default MyMessage;

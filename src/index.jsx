import React from 'react';
import ReactDOM from 'react-dom';
import eventManager from './event-manager';
import Toast from './toast';



// save messages in a queue, only remove it when component lifecycle ends
const messages = [];

eventManager.subscribe('popmessage', () => {
  const { type, content, duration, onClose } = messages[0];
  const container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.render(
    <Toast
      type={type}
      content={content}
      duration={duration}
      onClose={() => {
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
        onClose && onClose();
        messages.shift();
        if (messages.length > 0) {
          eventManager.publish('popmessage');
        }
      }}
    ></Toast>,
    container
  );
});

function notice(
  type,
  content,
  duration,
  onClose
) {
  messages.push({ type, content, duration, onClose });
  if (messages.length === 1) {
    eventManager.publish('popmessage');
  }
  // if current message is loading, then we should unmount it to proceed
  if (messages.length > 1 && messages[0].type === 'loading') {
    eventManager.publish('exit');
  }
}

export default {
  info(
    content,
    duration,
    onClose
  ) {
    notice('info', content, duration, onClose);
  },
  success(
    content,
    duration,
    onClose
  ) {
    notice('success', content, duration, onClose);
  },
  fail(
    content,
    duration,
    onClose
  ) {
    notice('fail', content, duration, onClose);
  },
  loading(content, onClose) {
    notice('loading', content, 0, onClose);
  },
  hide() {
    if (messages.length > 0) {
      eventManager.publish('exit');
    }
  },
};

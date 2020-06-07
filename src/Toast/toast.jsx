import React, { useEffect, useState, useRef } from 'react';
import Icon from './icon';
import eventManager from './event-manager';
import styles from './style.module.css';

let timerId = -1;

function debounce(
  callback
) {
  let count = 0;
  return () => {
    if (count === 0) {
      callback();
      count++;
    }
  };
}

const Toast = ({
  type,
  content,
  duration = 3000,
  onClose,
}) => {
  const [classes, setClasses] = useState(styles.box);
  const ref = useRef(null);

  function exit() {
    setClasses(() => `${styles.box} ${styles.exit}`);
  }

  useEffect(() => {
    // force a repaint
    /* eslint-disable no-unused-expressions */
    ref.current && ref.current.scrollTop;
    /* eslint-disable no-unused-expressions */
    setClasses((prev) => `${prev} ${styles.enter}`);
    const key = eventManager.subscribe('exit', exit);

    return () => {
      eventManager.unSubscribe('exit', key);
      window.clearTimeout(timerId); // in case toast unmount before reaching the timeout
    };
  }, []);

  const scheduleExit = debounce(() => {
    timerId = window.setTimeout(exit, duration);
  });

  return (
    <div className={styles.mask}>
      <div
        className={classes}
        style={type === 'info' ? undefined : { padding: 15, borderRadius: 5 }}
        onTransitionEnd={() => {
          // enter phase
          if (~classes.indexOf(styles.enter) && duration !== 0) {
            scheduleExit();
          }

          // exit phase
          if (~classes.indexOf(styles.exit)) {
            onClose();
          }
        }}
        ref={ref}
      >
        {type !== 'info' && (
          <div
            className={styles.wrapper}
            style={type === 'loading' ? { marginBottom: 10 } : undefined}
          >
            <Icon type={type}></Icon>
          </div>
        )}
        <span className={styles.message}>{content}</span>
      </div>
    </div>
  );
};

export default Toast;

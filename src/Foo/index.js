import * as React from 'react';
import style from './style.module.css'
import t from 'prop-types'

function Button({children, type}) {
  return (
    <button
      className={style[type]}
    >
      { children }
    </button>
  );
}
Button.propTypes = {
  /**
   * This is a pretty good description for this prop.
   */
  type: t.oneOf(['primary', 'dash', 'danger', 'default']),
}
Button.defaultProps = {
  type: 'primary',
}

export default Button



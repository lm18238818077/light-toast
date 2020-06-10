import * as React from 'react';
import t from 'prop-types'

function Button({children, type}) {
  return (
    <button
      className={type}
    >
      { children }
    </button>
  );
}
Button.propTypes = {
  /**
   * This is a pretty good description for this prop.
   */
  kind: t.oneOf(['primary', 'dash', 'danger', 'default']),
}
Button.defaultProps = {
  kind: 'primary',
}

export default Button
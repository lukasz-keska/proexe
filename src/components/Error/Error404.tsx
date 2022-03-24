import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';

interface Error404Interface {
  err?: string;
}

const Error404Component: FunctionComponent<Error404Interface> = ({
  err = 'Seems like this component is missing'
}): JSX.Element => (
  <div>
    <h1>404 Not Found</h1>
    <pre aria-label="MyPre">
      <code>{err}</code>
    </pre>
  </div>
);

Error404Component.propTypes = {
  err: PropTypes.string
};

export default Error404Component;

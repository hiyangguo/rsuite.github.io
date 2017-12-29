import React from 'react';
import ComponentExample from '../ComponentExample';
import { Icon, Button } from '../../rsuiteSource';

import IconLogo from '../../../resources/images/logo.svg';

const context = require('./index.md');
const examples = [
  require('./basic.md'),
  require('./spin.md'),
  require('./rotate.md'),
  require('./size.md'),
  require('./stack.md'),
  require('./custom.md')
];

export default () => {
  return (
    <ComponentExample
      dependencies={{
        IconLogo,
        Icon,
        Button
      }}
      context={context}
      examples={examples}
    >
    </ComponentExample>
  );
};


import React from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { Exception } from 'ant-design-pro';

const PAGE_NAME_UPPER_CAMEL_CASE = () => (
  <Exception
    type="403"
    desc={formatMessage({ id: 'app.exception.description.403' })}
    linkElement={Link}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);

export default PAGE_NAME_UPPER_CAMEL_CASE;

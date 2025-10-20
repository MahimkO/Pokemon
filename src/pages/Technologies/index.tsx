import { memo } from 'react';

const Technologies = () => {
  return (
    <div>
      <p>
        Название приложения: <strong>{__APP_NAME__}</strong>
      </p>
      <p>
        Версия приложения: <strong>{__APP_VERSION__}</strong>
      </p>
      <p>
        Версия React: <strong>{__REACT_VERSION__}</strong>
      </p>
      <p>
        Версия React-dom: <strong>{__REACT_DOM_VERSION__}</strong>
      </p>
      <p>
        Версия React-router-dom: <strong>{__REACT_ROUTER_DOM_VERSION__}</strong>
      </p>
      <p>
        Версия @tanstack/react-query: <strong>{__TANSTACK_REACT_QUERY_VERSION__}</strong>
      </p>
      <p>
        Версия AntD: <strong>{__ANTD_VERSION__}</strong>
      </p>
      <p>
        Версия ESLint: <strong>{__ESLINT_VERSION__}</strong>
      </p>
      <p>
        Версия TypeScript: <strong>{__TYPESCRIPT_VERSION__}</strong>
      </p>
    </div>
  );
};

export default memo(Technologies);

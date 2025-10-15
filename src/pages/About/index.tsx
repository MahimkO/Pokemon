import { memo } from 'react';

const About = () => {
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
    </div>
  );
};

export default memo(About);

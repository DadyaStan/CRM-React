import React from 'react';
import { Button, Result } from 'antd';
import { NavLink } from 'react-router';

const NotFoundPage: React.FC = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<NavLink to="/todo"><Button type="primary">Вернуться назад...</Button></NavLink>}
        />
    );
}

export default NotFoundPage;
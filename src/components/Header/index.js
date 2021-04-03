import React from 'react';
import {Container, Image, Menu} from 'semantic-ui-react';

import nasaLogo from '../../images/nasa-logo.svg';
import './index.scss';

const Header = () => (
    <div>
        <Menu className={'menu-container'} inverted>
            <Container className={'centered-container'}>
                <Image size='small' src={nasaLogo} />
            </Container>
        </Menu>
    </div>
  );

export default Header;

import React from 'react';

import Aukz from '../../hoc/Aukz';
import classes from './Layout.css';

const layout = ( props ) => (
    <Aukz>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aukz>
);

export default layout;
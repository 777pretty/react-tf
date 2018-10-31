import React from 'react';

import Aukz from '../../hoc/Aukz';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'

const layout = ( props ) => (
    <Aukz>
        {/* <div>Toolbar, SideDrawer, Backdrop</div> */}
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aukz>
);

export default layout;
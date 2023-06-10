import React from 'react';
import Nav from '../Navigation';
import Navigation from '../Navigation';



const Layout = ({children}) => {
    
    return (
        <div className='layout'>
            <Navigation></Navigation>
            <div>{children}</div>
            
        </div>
    );
};

export default Layout;
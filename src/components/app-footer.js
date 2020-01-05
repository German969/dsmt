import React from 'react';
import './app-footer.css';

function AppFooter () {
    return (
        <div className={'app-footer'}>
            Developed by&nbsp;
            <a href={'https://www.linkedin.com/in/german-agustin-monzon/'}>German A. Monzon</a>
            . Don't know how to use it? Read the&nbsp;
            <a href={'https://github.com/German969/dsmt'}>user guide</a>
            .
        </div>
    );
}

export default AppFooter;
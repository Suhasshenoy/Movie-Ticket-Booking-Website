import React from 'react';
import "../styles.css"
import Menu from './Menu';
const Base = ({title="",className="  p-4",children}) => {
    return (
        <div>
            <Menu />
            <div className='container-fluid mb-5 pt-3 '>
                <div className='jumbotron text-center'>
                <h3 className='p-3 text-warning'>{title}</h3>
                </div>
                <div className={className}>{children}</div>
            </div>
            
    
        </div>
      )
}

export default Base;

import React from 'react'

const Header = ({title}) => {
    console.log(title);
    return (
        <div>
            <h2>{title}</h2>
        </div>
    )
}

export default Header

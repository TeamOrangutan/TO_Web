import React from 'react'
import { Link } from 'react-router-dom';

interface MyComponentProps  {
    isTop: Boolean; 
    label: string, 
    route: string,
}

export const LinkHeader : React.FC<MyComponentProps> = ({isTop, label, route}) => {

  return (
    <Link to={route} style={{ color: isTop && window.location.pathname === '/' ? "white" : "black" }}>{label}</Link>
  )
}

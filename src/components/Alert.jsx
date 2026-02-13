import React from 'react'

const Alert = ({ type, text }) => {
  return (
    <div className="alert-container">
      <div className={`alert-box alert-${type}`}>
        <p className="alert-text">{text}</p>
      </div>
    </div>
  )
}

export default Alert

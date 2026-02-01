import React from 'react'
import MacWindow from './MacWindow'
import "./resume.css"
const Resume = ({windowName, setWindowState, windowProps}) => {
  return (
    <MacWindow windowName={windowName} setWindowState={setWindowState} windowProps={windowProps}>
        <div className="resume-window">
            <embed src="/resume.pdf" frameborder="0"></embed>
        </div>
    </MacWindow>
  )
} 

export default Resume
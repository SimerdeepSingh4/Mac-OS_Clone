import React from 'react'
import MacWindow from './MacWindow'
import "./spotify.scss"

const Spotify = ({windowName, setWindowState, windowProps}) => {
  return (
    <MacWindow windowName={windowName} setWindowState={setWindowState} windowProps={windowProps} width='25vw' height = '30vw'>
        <div className='spotify-window'>
            <iframe data-testid="embed-iframe" style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/playlist/36yqsNBG27yoxEiciVK3iD?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
    </MacWindow>
  )
} 

export default Spotify
import React from 'react'

function loadingLogo() {
    return (
        <div className="m-auto max-w-max mt-9 ">
          <video
            src="https://cdn-icons-mp4.flaticon.com/512/8629/8629417.mp4"
            width="212"
            height="212"
            frameBorder="0"
            autoPlay
            
            loop
            className="align-middle mt-9 giphy-embed "
            allowFullScreen
          ></video>
        </div>
    )
}

export default loadingLogo

import React from "react";

const Nweet = ({nweetObj}) => (
    <div key={nweetObj.id}>
        <h4>{nweetObj.text}</h4>
        <button>Delete Nweet</button>
    </div>
)

export default Nweet;
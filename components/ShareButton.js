import React from "react";
import webShare from 'react-web-share-api';
import ShareButton from 'react-web-share-button';

const ShareButton = ({ share, isSupported }) => isSupported
    ? <button onClick={share}>Share now!</button>
    : <a></a>;

    export default webShare<OwnProps>()(ShareButton);
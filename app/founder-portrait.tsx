'use client';

import {useState} from 'react';

export default function FounderPortrait() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="founder-portrait" hidden={!loaded}>
      <img
        src="/assets/man-raju.png"
        alt="Mr. MAN Raju, Founder of MNR Achieve"
        width={652}
        height={1280}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
    </div>
  );
}

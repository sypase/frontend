import { minidenticon } from 'minidenticons';
import { useMemo } from 'react';

interface MinidenticonImgProps {
  username: string;
  saturation?: number;
  lightness?: number;
  width?: number;
  height?: number;
  className?: string;
}

const MinidenticonImg: React.FC<MinidenticonImgProps> = ({ username, saturation = 50, lightness = 50, ...props }) => {
  const svgURI = useMemo(
    () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  );

  return <img src={svgURI} alt={`Identicon for ${username}`} {...props} />;
};

export default MinidenticonImg;
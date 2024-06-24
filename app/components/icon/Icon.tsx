// Inside components/Icon/Icon.tsx (or a similar location)
import React from 'react';

interface IconProps {
  content: string; // The actual SVG code
  width?: number; // Optional width for the icon
  height?: number; // Optional height for the icon
}

const Icon: React.FC<IconProps> = ({ content, width, height }) => (
  <svg width={width} height={height} dangerouslySetInnerHTML={{ __html: content }} />
);

export default Icon;




import React from 'react';

export default function Image({ src, ...rest }) {
  let imageUrl = src;

  // Check if src is a valid URL
  try {
    new URL(src);
  } catch (error) {
    
    imageUrl = 'http://localhost:8080/api/v1/place/upload' + src;
  }

  return <img {...rest} src={imageUrl} alt="" />;
}

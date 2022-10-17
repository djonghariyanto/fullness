import * as React from 'react';
import { default as _ } from './main.css';

const base = [
  _["image"],
  _["image--event-thumbnail"]
].join(' ');

export default function EventThumbnailImage(props: { src: string }) {
  return (
    <img src={props.src} className={base}/>
  );
}

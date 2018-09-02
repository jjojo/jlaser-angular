/*
  Image service to handle information about the image uploaded to the editor
  * Should hold an active path to the image,
  * convert and store the dataURL,
  * toggle if image is rendering (into svg)
  * store the svgData
*/
import { Injectable } from '@angular/core';
import * as potrace from 'potrace'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  path: string = ''
  imageBuffer: Buffer
  dataURL: string = ''
  rendering: boolean = false
  svgData: object = {}
  trace: any

  constructor(){
    console.log(new potrace.Potrace())
    this.trace = new potrace.Potrace()
    console.log(this.trace)
  }


  setPath(path: string) {
    this.path = path
  }

  getPath(path: string) {
    return this.path
  }

  setImageBuffer(buffer: Buffer) {
    console.log(buffer)
    this.imageBuffer = buffer
  }

  getSVGData(){
    return this.svgData
  }

  // Converts loaded image to SVG
  convertToSVG() {
  // TODO: Fix so that potrace returns object maybe, then rende Canvas
    console.log(this.trace)

    this.trace.setParameters({
      threshold: 128,
    });

    this.trace.loadImage('../../assets/background.jpg', (err) => {
      if (err) throw err;

      console.log(this.trace)
      this.svgData = this.trace.getSVG(); // returns SVG document contents
      console.log(this.svgData)
      console.log(this.trace.getPathTag()); // will return just <path> tag
      console.log(this.trace.getSymbol('traced-image')) // will return <symbol> tag with given ID
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {

  constructor(
    private imageService: ImageService,
    private eS: ElectronService) { }

  ngOnInit() {
  }

  handleImageChange(e: any) {
    console.log(e.target.files[0])
    console.log(e)
    console.log()
    let buffer: Buffer = this.eS.fs.readFileSync(e.target.files[0].path)
    // this.eS.fs.readFile(e.target.files[0].path, function(err, data) {
    //   if (err)
    //     throw err;
    //   if (data)
    //     console.log(data.toString('base64'));
    // });
    this.imageService.setImageBuffer(buffer)
    console.log(this.imageService.getPath('file://' + e.target.files[0].path))
    this.imageService.convertToSVG()
    //renderSVG(e.target.files[0], {threshold: 128, scale: 1.0}, this.setSvgData)
    //this.readImageFile(e.target.files[0])
  }

  getSVG(){
    return this.imageService.getSVGData()
  }

}

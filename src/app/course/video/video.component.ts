import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  @Input() videoId!: string;
  urlString!: string;
  url: SafeResourceUrl = '';
  constructor(private _sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.urlString = 'https://youtube.com/embed/' + this.videoId;
    this.url = this._sanitizer.bypassSecurityTrustResourceUrl(this.urlString);
    console.log(this.urlString);
  }
}

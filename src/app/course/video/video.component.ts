import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  @Input() videoId!: string;
  transcribedText?: any;
  isTranscribed? = false;
  urlString!: string;
  isLoaded = false;
  url: SafeResourceUrl = '';
  constructor(
    private _sanitizer: DomSanitizer,
    private youtubeService: YoutubeService
  ) {}
  ngOnInit(): void {
    this.urlString = 'https://youtube.com/embed/' + this.videoId;
    this.url = this._sanitizer.bypassSecurityTrustResourceUrl(this.urlString);
  }
  transcribeVideo() {
    this.isTranscribed = true;
    this.youtubeService.getTranscribedText(this.videoId).subscribe((data) => {
      this.transcribedText = data.text;
    });
  }
}

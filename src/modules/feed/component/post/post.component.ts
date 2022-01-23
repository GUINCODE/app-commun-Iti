import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input() post: Post;
  liker : boolean = false;
  defaultProfit= 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg'
  // defaultProfit= 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_1280.png'
   content: string = '';
  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.liker= this.post.liked;
    this.content = this.post.message.text.content
    this.undoLinkInTex()
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  async like() {
    // TODO like du post
    this.postService.like(this.post)
    this.liker = true
  }

  undoLinkInTex(){
    //  const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
    //   const youtubeMatche = youtubeRegex.exec(this.content)

      const youtubeRegex2= /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((?:\w|-|_){11})(?:(?:\?|\&)index=((?:\d){1,3}))?(?:(?:\?|\&)list=((?:\w|-|_){24}))?(?:\S+)?/g;
    const youtubeMatche2 = youtubeRegex2.exec(this.content)

    if (youtubeMatche2) {
         this.content=this.post.message.text.content.replace(youtubeMatche2[0], "");
    }

    // undo picture link in message send
      const pictureRegex = /http[s]?:\/\/.+\.(jpeg|jpg|gif|png)/gmi;
      const pictureMatche = pictureRegex.exec(this.content);
    if (pictureMatche) {
       this.content = this.content.replace(pictureMatche[0], "");
    }

      // undo video link in message send
        const videoRegex = /http[s]?:\/\/.+\.(mp4|wmv|flv|avi|wav)/gmi;
       const videoMatche = videoRegex.exec(this.content);
    if (videoMatche) {
       this.content = this.content.replace(videoMatche[0], "");
    }

      // undo audio link in message send
      const audioRegex = /http[s]?:\/\/.+\.(mp3|ogg|wav)/gmi;
       const audioMatche = audioRegex.exec(this.content)
    if (audioMatche) {
      this.content = this.content.replace(audioMatche[0], "");
    }



  }
}

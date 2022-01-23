import { Component, OnInit } from '@angular/core';
import { FeedStore } from 'src/modules/feed/feed.store';
import { PostMapper } from 'src/modules/feed/services/post.mapper';
import { PostService } from 'src/modules/feed/services/post.service';
import { MessageSentEventPayload } from 'src/modules/input/input.model';
import { AnyNotification } from 'src/modules/notification/notification.model';
import { NotificationSocketService } from 'src/modules/notification/services/notification.socket.service';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.less']
})
export class RoomComponent implements OnInit {
  constructor(private postService: PostService, private mapper: PostMapper,
    private store: FeedStore, private notificationSocket : NotificationSocketService,
    private router: Router,
    private notification: NzNotificationService
    ) {
     this.notificationSocket.onNewNotification((notif : AnyNotification) => {
       this.createBasicNotification(notif);
    });
  }


 createBasicNotification(notif: AnyNotification): void {
 if (notif.subject=='post_liked') {
      this.notification
      .blank(
        'Un post aimé ',
        `<b>${notif.payload.user.username}</b>  à aimé votre post <small> "${notif.payload.preview}"</small>.`
      )
      .onClick.subscribe(() => {
        // this.router.navigate(['app/'+notif.payload.roomId]);   // je ne comprend pas pourquoi je n'arrive pas a acceder au roomId
        // pour enfin naviguer vers se room au clic sur la notif
            console.log(notif.payload);
      });
   }
   else if (notif.subject=='room_added') {
      this.notification
      .blank(
        'Un nouveau room ajouté ',
        `<b> ${notif.payload.user.username} </b>  à crée le room  <b>${notif.payload.room.name} </b>`
      )
      .onClick.subscribe(() => {
           console.log(notif.payload.room.id);
            this.router.navigate(['app/'+notif.payload.room.id]);
      });
   }
    else if (notif.subject=='new_user') {
      this.notification
      .blank(
        'Un nouvel utilisateur  ',
        `<b> ${notif.payload.user.username} </b>  à rejoint le serveur  .`
      )
      .onClick.subscribe(() => {
         console.log(notif);
      });
   }


  }

  ngOnInit(): void {
  }

  async onMessage(payload: MessageSentEventPayload) {
    if (!this.store.value.roomId) {
      return;
    }
    const post = await this.postService.create(this.store.value.roomId, payload.message, payload.file);
    // this.store.appendPost(this.mapper.map(post));
  }
}

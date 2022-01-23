import { NotificationStore } from './../../../modules/notification/notification.store';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationStore } from 'src/modules/authentication/authentication.store';
import { WebsocketConnection } from 'src/modules/common/WebsocketConnection';
import { NotificationService } from 'src/modules/notification/services/notification.service';
import { AnyNotification } from 'src/modules/notification/notification.model';
import { Router } from '@angular/router';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NotificationSocketService } from 'src/modules/notification/services/notification.socket.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.less']
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  [x: string]: any;
  sub?: Subscription;
  notifications : AnyNotification[] = [];


  showDrawer: boolean = false;
  constructor(private socket: WebsocketConnection,
     private authStore: AuthenticationStore,
     private notificationService: NotificationService,
      private notificationStore: NotificationStore,
      private router: Router,
      private notifSocker: NotificationSocketService
      ) {
  }

  ngOnInit(): void {
    this.sub = this.authStore.accessToken$.subscribe(accessToken => {
      if (accessToken) {
        this.socket.connect(accessToken);
      } else {
        this.socket.disconnect();
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  onToggleNotifications() {
    this.showDrawer = !this.showDrawer;
   if (this.showDrawer) {
     this.getNotifications()
   }
  }

   async getNotifications() {
    await this.notificationService.fetch()
    this.notifications = this.notificationStore.value.notifications
    console.log( this.notifications );
  }

  markeViewed(){
    this.notificationService.markAsViewed()
  }
  goRoomConcerne(roomId: string) {
   this.showDrawer = false;
  // console.log(notif.payload.roomId);
  this.router.navigate(['app/'+roomId]);
  }



}

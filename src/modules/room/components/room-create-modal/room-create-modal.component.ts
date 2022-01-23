import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomType } from '../../room.model';
import { RoomService } from '../../services/room.service';

export class CreateRoomFormModel {
  name: string = "";
  type: RoomType = RoomType.Text;
}

@Component({
  selector: 'app-room-create-modal',
  templateUrl: './room-create-modal.component.html',
  styleUrls: ['./room-create-modal.component.less']
})
export class RoomCreateModalComponent implements OnInit {
@Output() updateListeEnvent = new EventEmitter()
  @ViewChild("f")
  form: NgForm;
  isVisible: boolean = false;
  model = new CreateRoomFormModel();
  constructor(private roomService: RoomService) {
  }



  ngOnInit(): void {
  }

  async onOk() {
    if (this.form.form.valid) {
      // TODO invoquer la méthode create du RoomService
      this.roomService.create(this.model.name , this.model.type)
      // mettre à jour sur le dom la liste des rooms
        this.updateListeEnvent.emit()
      // --------------------------------
      this.close();


    }
  }

  onCancel() {
    this.close();
  }

  open() {
    this.form.resetForm(new CreateRoomFormModel());
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}

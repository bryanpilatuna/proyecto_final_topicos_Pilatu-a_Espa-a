import { Component, OnInit } from '@angular/core';
import { AuthService } from "../servicios/auth.service";
import { auth } from 'firebase';
import {  ChatsService,chat} from "../servicios/chats.service";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {  ModalController, ActionSheetController} from "@ionic/angular";
import { ChatComponent } from "../componentes/chat/chat.component";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public chatRooms : any=[];
  constructor(
    public authservice: AuthService,
    public actionSheetController: ActionSheetController,
    public chatservice: ChatsService,
    private modal: ModalController){
  }
  Onlogout(){

    this.authservice.logout();
  }

  ngOnInit(){
    this.chatservice.getChatRooms().subscribe( chats => {  
      this.chatRooms = chats;
    })
  }

  openChat(chat){
    this.modal.create({
      component: ChatComponent,
      componentProps: {
        chat:chat

      }

    }).then((modal)=>modal.present())


  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Cerrar Sesion',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          
          this.Onlogout()

        },
      }]
    });
    await actionSheet.present();
  }


}

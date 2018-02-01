import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

	options : any = {language : 'en-US'};
	isRecognizing : any;
	statusSpeaker : string;

	myresult : any = [];

  constructor(public navCtrl: NavController, 
              public speechRecognition: SpeechRecognition, 
              public texttospeach: TextToSpeech) {

  }

  ionViewDidEnter(){
    // Check permission
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {

        if(hasPermission){
            console.log('Permission already Granted');
        }else{
            this.speechRecognition.requestPermission()
              .then(
                () => console.log('Permission Granted'),
                () => console.log('Permission Denied')
              )
        }
      });
  }

  start(){
  	this.myresult = [];
  	this.speechRecognition.startListening({language : 'en-US'})
	  .subscribe((matches: Array<string>) =>  this.myresult = matches ,
	    (onerror) => alert('error:'+JSON.stringify(onerror)),
	  )}

  stop(){
  	this.speechRecognition.stopListening();
  }

  SpeechToText(){
      	if(!this.isRecognizing)
      	{
       		this.start();
      	}
        else
        {
        	this.stop();
        }
      }

    TextToSpeach(mytxt){
  	this.texttospeach.speak({
            text: mytxt,
            locale: 'en-US',
            rate: 1
        })
	  .then(() => console.log('Success'))
	  .catch((reason: any) => console.log(reason));
	  }

}


     


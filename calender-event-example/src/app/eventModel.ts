import { Time } from '@angular/common';

export class EventModel{
    id : number;
    eventName : string;
    eventDate : Date;
    eventStartTime : Time;
    eventEndTime : Time;
}
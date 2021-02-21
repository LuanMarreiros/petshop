import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class Alert{

    message: string = null;
    componentToShow: string = 'agendamentos';
    // componentToShow: string = 'detalhes';

}
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {

  @Input() id;
  @Input() alert;

  constructor() { }

  ngOnInit(): void {
  }

  

}

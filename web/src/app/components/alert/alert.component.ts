import { Component, Injectable, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {

  @Input() alert:any;

  constructor() { }

  ngOnInit(): void {
    this.alert.message;
  }

}

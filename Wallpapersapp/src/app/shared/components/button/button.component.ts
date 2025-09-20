import { Component, Input, OnInit } from '@angular/core';

type ButtonType = 'button' | 'submit';
type ButtonFill = 'solid' | 'outline' | 'clear';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: false,
})
export class ButtonComponent implements OnInit {
  @Input() value: string = '';
  @Input() type: ButtonType = 'button';
  @Input() disabled: boolean = false;
  @Input() fill: ButtonFill = 'solid';


  constructor() {}

  ngOnInit() {}
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss'],
})
export class ConversionComponent implements OnInit, OnChanges {
  currencies = [
    { title: 'UA', value: 'UA' },
    { title: 'USD', value: 'USD' },
    { title: 'EUR', value: 'EUR' },
    { title: 'PLN', value: 'PLN' },
    { title: 'CZK', value: 'CZK' },
  ];
  formGroup!: FormGroup;
  @Output() changes: EventEmitter<any> = new EventEmitter();
  @Input() value: any;
  constructor() {}
  ngOnChanges(): void {
    if (this.formGroup) {
      this.formGroup.controls['conversion'].setValue(+this.value.toFixed(2), {
        emitEvent: false,
      });
    }
  }
  ngOnInit(): void {
    this.initForm();
    this.formChanges();
  }
  initForm() {
    this.formGroup = new FormGroup({
      conversion: new FormControl(100),
      currency: new FormControl('USD'),
    });
  }
  formChanges() {
    this.formGroup.valueChanges.subscribe((val) => {
      this.changes.emit(val);
    });
  }
}

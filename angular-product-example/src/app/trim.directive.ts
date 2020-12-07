import { Directive, forwardRef, HostListener } from "@angular/core";
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
const TRIM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TrimWhiteSpace),
  multi: true
};
@Directive({
  selector: 'input[trim]',
  providers: [TRIM_VALUE_ACCESSOR]
})

export class TrimWhiteSpace extends DefaultValueAccessor {

  @HostListener('input', ['$event.target.value'])
  ngOnChange = (val: string) => {
    this.onChange(val.trim());
  };
  
  @HostListener('blur', ['$event.target.value'])
  applyTrim(val: string) {
    this.writeValue(val.trim());
  }
  writeValue(value: any): void {
    if (typeof value === 'string') {
      value = value.trim();
    }
    super.writeValue(value);
  }
}
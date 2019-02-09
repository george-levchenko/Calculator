import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  logs: string[] = [' ',' ',' '];
  inputValue = '';
  inputArray: any[];
  accum: string;
  result = '';

  getButtonNumber(value: string) {
    if( ( (isNaN(parseFloat(this.inputValue.charAt(0)))) &&
          (this.inputValue.charAt(0)) &&
          (this.inputValue.charAt(0) !== ' ') &&
          (this.inputValue.charAt(0) !== '-') ) ||
              ((this.inputValue.charAt(0) === '-') && (this.inputValue.charAt(1) === '∞'))
    ){ return }
    this.inputValue += value;
  }

  getButtonOperator(value: string) {
    if( (isNaN(parseFloat(this.inputValue.charAt(this.inputValue.length - 1)))) ||
        (!this.inputValue.charAt(0))
    ){ return }
    this.inputValue += value;
  }

  backupValue() {
    if( (isNaN(parseFloat(this.inputValue.charAt(this.inputValue.length - 1))))) {
      this.inputValue = this.inputValue.slice(0, -3);
      return;
    }
    this.inputValue = this.inputValue.slice(0, -1);
  }

  clearValue() {
    this.inputValue = '';
    this.inputArray = [];
    this.logs = [' ',' ',' '];
  }

  changeSign() {
    if (this.inputValue.charAt(this.inputValue.length - 1) === '-') {
     return this.backupValue();
    }
    else if ( (this.inputValue.charAt(this.inputValue.length - 1) === ' ') ||
              (!this.inputValue.charAt(0)) ){
      return this.inputValue += '-';
    }
    else {
      return;
    }
  }

  getResult (first: string, operator: string, second: string): string {

    let firstNumber: number = parseFloat(first);
    let secondNumber: number = parseFloat(second);

    switch (operator) {
      case '+':
        return this.accum = '' + (firstNumber + secondNumber);
      case '-':
        return this.accum = '' + (firstNumber - secondNumber);
      case '/':
        return this.accum = '' + (firstNumber / secondNumber);
      case 'x':
        return this.accum = '' + (firstNumber * secondNumber);
      default:
        return this.accum = second;
    }
  }

  getAnswer() {

    this.inputArray = this.inputValue.trim().split(' ');

    if (isNaN(parseFloat(this.inputArray[this.inputArray.length - 1]))) {
      this.inputArray.pop();
    }

    if (this.inputArray[2]) {

      for (let i = 2; i < this.inputArray.length; i += 2) {

        if (i === 2) {
          this.getResult(this.inputArray[i - 2], this.inputArray[i - 1], this.inputArray[i]);
        } else {
          this.getResult(this.accum, this.inputArray[i - 1], this.inputArray[i]);
        }
      }

      if (this.accum === 'Infinity') {
        this.logs.push(this.inputValue + ' = ∞');
        this.logs.shift();
        this.inputValue = '∞';
      }
      else if (this.accum === '-Infinity') {
        this.logs.push(this.inputValue + ' = -∞');
        this.logs.shift();
        this.inputValue = '-∞';
      }
      else {
        this.logs.push(this.inputValue + ' = ' + this.accum || this.result);
        this.logs.shift();
        this.inputValue = this.accum.trim() || this.result;
      }
    }
  }

  getPercent() {
    this.inputArray = this.inputValue.trim().split(' ');

    if (isNaN(parseFloat(this.inputArray[this.inputArray.length - 1]))) {
      this.inputArray.pop();
    }

    let resultValue = parseFloat(this.inputArray[this.inputArray.length -1])/100;
    let initialValue = parseFloat(this.inputArray[this.inputArray.length -1]);
    this.inputArray.pop();

    this.inputValue = (this.inputArray.join(' ') + ' ' + resultValue).trim();
    this.logs.shift();
    this.logs.push(`1% of ${initialValue} = ${resultValue}`);
  }

  getSquareRoot() {
    this.inputArray = this.inputValue.trim().split(' ');

    if (isNaN(parseFloat(this.inputArray[this.inputArray.length - 1]))) {
      this.inputArray.pop();
    }

    let initialValue = parseFloat(this.inputArray[this.inputArray.length -1]);

    if (initialValue < 0) {
      let resultValue = Math.sqrt(parseFloat(this.inputArray[this.inputArray.length -1].slice(1)));
      this.inputArray.pop();

      this.inputValue = (this.inputArray.join(' ') + ' ' + '-' + resultValue).trim();
      this.logs.shift();
      this.logs.push(`√${initialValue} = -${resultValue}`);
    }
    else {
      let resultValue = Math.sqrt(parseFloat(this.inputArray[this.inputArray.length -1]));
      this.inputArray.pop();

      this.inputValue = (this.inputArray.join(' ') + ' ' + resultValue).trim();
      this.logs.shift();
      this.logs.push(`√${initialValue} = ${resultValue}`);
    }
  }

  getFactorial() {
    this.inputArray = this.inputValue.trim().split(' ');

    if (isNaN(parseFloat(this.inputArray[this.inputArray.length - 1]))) {
      this.inputArray.pop();
    }
    let initialValue = Math.round(parseFloat(this.inputArray[this.inputArray.length -1]));

    if (Math.round(parseFloat(this.inputArray[this.inputArray.length -1])) > 170) {
      this.inputValue = '∞';
      this.logs.shift();
      this.logs.push(`${initialValue}! = ∞`);
      return;
    }

    if (Math.round(parseFloat(this.inputArray[this.inputArray.length -1])) < 1) {
      this.inputValue = 'NaN';
      this.logs.shift();
      this.logs.push(`${initialValue}! = NaN`);
      return;
    }

    let resultValue = this.factorial(Math.round(parseFloat(this.inputArray[this.inputArray.length -1])));
    this.inputArray.pop();

    this.inputValue = (this.inputArray.join(' ') + ' ' + resultValue).trim();
    this.logs.shift();
    this.logs.push(`${initialValue}! = ${resultValue}`);
  }

  factorial( num:number ):number {
    return ( num != 1 ) ? num * this.factorial(num - 1) : 1;
  }

  getDouble() {
    this.inputArray = this.inputValue.trim().split(' ');

    if (isNaN(parseFloat(this.inputArray[this.inputArray.length - 1]))) {
      this.inputArray.pop();
    }

    let resultValue = parseFloat(this.inputArray[this.inputArray.length -1])*
                      parseFloat(this.inputArray[this.inputArray.length -1]);
    let initialValue = parseFloat(this.inputArray[this.inputArray.length -1]);
    this.inputArray.pop();

    this.inputValue = (this.inputArray.join(' ') + ' ' + resultValue).trim();
    this.logs.shift();
    this.logs.push(`${initialValue} in power 2 = ${resultValue}`);
  }

  getLog10() {
    this.inputArray = this.inputValue.trim().split(' ');

    if (isNaN(parseFloat(this.inputArray[this.inputArray.length - 1]))) {
      this.inputArray.pop();
    }

    let resultValue = Math.log10(parseFloat(this.inputArray[this.inputArray.length -1]));
    let initialValue = parseFloat(this.inputArray[this.inputArray.length -1]);
    this.inputArray.pop();

    if (resultValue === -Infinity) {
      this.inputValue = '-∞';
      this.logs.shift();
      this.logs.push(`Log10 of ${initialValue} = -∞`);
    }
    else {
      this.inputValue = (this.inputArray.join(' ') + ' ' + resultValue).trim();
      this.logs.shift();
      this.logs.push(`Log10 of ${initialValue} = ${resultValue}`);
    }
  }

  getLog() {
    this.inputArray = this.inputValue.trim().split(' ');

    if (isNaN(parseFloat(this.inputArray[this.inputArray.length - 1]))) {
      this.inputArray.pop();
    }

    let resultValue = Math.log(parseFloat(this.inputArray[this.inputArray.length -1]));
    let initialValue = parseFloat(this.inputArray[this.inputArray.length -1]);
    this.inputArray.pop();

    if (resultValue === -Infinity) {
      this.inputValue = '-∞';
      this.logs.shift();
      this.logs.push(`Ln of ${initialValue} = -∞`);
    }
    else {
      this.inputValue = (this.inputArray.join(' ') + ' ' + resultValue).trim();
      this.logs.shift();
      this.logs.push(`Ln of ${initialValue} = ${resultValue}`);
    }
  }

  getInputValue(event) {

    switch (event.key) {

      case 'Enter': this.getAnswer(); break;
      case '=': this.inputValue = this.inputValue.slice(0,-1);
                this.getAnswer(); break;
      case 'Escape': this.clearValue(); break;
      case ' ': this.inputValue = this.inputValue.slice(0,-1); break;
      // case 'Backspace': this.inputValue = this.inputValue.slice(0,-1);
      //   this.backupValue(); break;

      case '0': this.inputValue = this.inputValue.slice(0,-1);
                this.getButtonNumber('0');break;
      case '1': this.inputValue = this.inputValue.slice(0,-1);
        this.getButtonNumber('1');break;
      case '2': this.inputValue = this.inputValue.slice(0,-1);
        this.getButtonNumber('2');break;
      case '3': this.inputValue = this.inputValue.slice(0,-1);
        this.getButtonNumber('3');break;
      case '4': this.inputValue = this.inputValue.slice(0,-1);
        this.getButtonNumber('4');break;
      case '5': this.inputValue = this.inputValue.slice(0,-1);
        this.getButtonNumber('5');break;
      case '6': this.inputValue = this.inputValue.slice(0,-1);
        this.getButtonNumber('6');break;
      case '7': this.inputValue = this.inputValue.slice(0,-1);
        this.getButtonNumber('7');break;
      case '8': this.inputValue = this.inputValue.slice(0,-1);
        this.getButtonNumber('8');break;
      case '9': this.inputValue = this.inputValue.slice(0,-1);
        this.getButtonNumber('9');break;
      case '+': this.inputValue = this.inputValue.slice(0,-1);
                this.getButtonOperator(' + ');break;
      case '-': this.inputValue = this.inputValue.slice(0,-1);
        this.getButtonOperator(' - ');break;
      case '*': this.inputValue = this.inputValue.slice(0,-1);
        this.getButtonOperator(' x ');break;
      case '/': this.inputValue = this.inputValue.slice(0,-1);
        this.getButtonOperator(' / ');break;

      case '`': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'q': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'w': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'e': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'r': this.inputValue = this.inputValue.slice(0,-1); break;
      case 't': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'y': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'u': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'i': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'o': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'p': this.inputValue = this.inputValue.slice(0,-1); break;
      case '[': this.inputValue = this.inputValue.slice(0,-1); break;
      case ']': this.inputValue = this.inputValue.slice(0,-1); break;
      case '\\': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'a': this.inputValue = this.inputValue.slice(0,-1); break;
      case 's': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'd': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'f': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'g': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'h': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'j': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'k': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'l': this.inputValue = this.inputValue.slice(0,-1); break;
      case ';': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'z': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'x': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'c': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'v': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'b': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'n': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'm': this.inputValue = this.inputValue.slice(0,-1); break;
      case ',': this.inputValue = this.inputValue.slice(0,-1); break;
      case '.': this.inputValue = this.inputValue.slice(0,-1); break;
      case '\'': this.inputValue = this.inputValue.slice(0,-1); break;

      case '~': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'Q': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'W': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'E': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'R': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'T': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'Y': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'U': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'I': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'O': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'P': this.inputValue = this.inputValue.slice(0,-1); break;
      case '{': this.inputValue = this.inputValue.slice(0,-1); break;
      case '}': this.inputValue = this.inputValue.slice(0,-1); break;
      case '|': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'A': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'S': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'D': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'F': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'G': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'H': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'J': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'K': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'L': this.inputValue = this.inputValue.slice(0,-1); break;
      case ':': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'Z': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'X': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'C': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'V': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'B': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'N': this.inputValue = this.inputValue.slice(0,-1); break;
      case 'M': this.inputValue = this.inputValue.slice(0,-1); break;
      case '<': this.inputValue = this.inputValue.slice(0,-1); break;
      case '>': this.inputValue = this.inputValue.slice(0,-1); break;
      case '\"': this.inputValue = this.inputValue.slice(0,-1); break;
      case '?': this.inputValue = this.inputValue.slice(0,-1); break;

      case '!': this.inputValue = this.inputValue.slice(0,-1); break;
      case '@': this.inputValue = this.inputValue.slice(0,-1); break;
      case '#': this.inputValue = this.inputValue.slice(0,-1); break;
      case '$': this.inputValue = this.inputValue.slice(0,-1); break;
      case '%': this.inputValue = this.inputValue.slice(0,-1); break;
      case '^': this.inputValue = this.inputValue.slice(0,-1); break;
      case '&': this.inputValue = this.inputValue.slice(0,-1); break;
      case '(': this.inputValue = this.inputValue.slice(0,-1); break;
      case '_': this.inputValue = this.inputValue.slice(0,-1); break;
      default: break;
    }
  }
}






import { Injectable } from '@angular/core';

@Injectable()
export class ColorGridA {
    colorTablaH = 'black';

    tablaH(titulo: string): string {
        return `<span style="color: ${this.colorTablaH};">${titulo}</span>`;
    }
}

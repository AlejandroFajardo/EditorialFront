import {Component} from '@angular/core';
import {AppBreadcrumbService} from '../../shared/app.breadcrumb.service';

@Component({
    templateUrl: './formlayoutdemo.component.html'
})
export class FormLayoutDemoComponent {


    constructor(private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            {label: 'Inicio'},
            {label: 'Ejemplo de form'}
        ]); 
    }
}

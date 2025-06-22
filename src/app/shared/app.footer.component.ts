import {Component} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer clearfix">
        <a href="#" (click)='openNewTab()'>
                <img alt="logo-colored" src="assets/layout/images/dtic.png" style="width: 200px; height: 50px;"/>
            </a>
            <span class="footer-text-right">
                <span>"SISTEMA DE INFORMACIÓN" - Versión 1.0 © 2024 Todos los derechos reservados | DTIC-UPTC</span>
            </span>
        </div>
    `
})
export class AppFooterComponent {

    public openNewTab() {
        window.open('http://desnet.uptc.edu.co:17012/DocSigma/A-RI-P13-F01-V03.pdf', '_blank');
      }
}

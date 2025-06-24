import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ApplicationService } from '../../shared/service/application.service';
import { ApplicationDTO } from '../../shared/application.dto';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
})
export class ApplicationFormComponent implements OnInit {
  form: FormGroup;

  certificationOptions = [
    'Libro resultado de investigación',
    'Financiamiento de la publicación del libro resultado de investigación',
    'Capítulo de libro resultado de investigación',
    'Libro de Formación',
    'Libros de Divulgación de investigación y/o Compilación de Divulgación.',
    'Libros de Creación',
    'Manual y Guías Especializadas'
  ];

  constructor(private fb: FormBuilder, private service: ApplicationService) { }

  ngOnInit() {
    this.form = this.fb.group({
      centerEmail: ['', [Validators.required, Validators.email]],
      authorName: ['', Validators.required],
      certificationType: ['', Validators.required],
      bookTitle: ['', Validators.required],
      isbnCode: [''],
      publicationYear: [new Date().getFullYear(), Validators.required],
      publicationLocation: ['', Validators.required],
      publisher: ['', Validators.required],
      otherPublisher: [''],
      publisherWebsiteUrl: [''],
      chapterTitle: [''],
      manuscriptUrl: ['', Validators.required],
      certificationFormUrl: ['', Validators.required],
      extraDocumentUrls: this.fb.array([ this.fb.control('', Validators.required) ])
    });
  }

  get extraDocs(): FormArray {
    return this.form.get('extraDocumentUrls') as FormArray;
  }

  addExtraDoc() {
    this.extraDocs.push(this.fb.control('', Validators.required));
  }

  removeExtraDoc(index: number) {
    this.extraDocs.removeAt(index);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const dto: ApplicationDTO = this.form.value;
    this.service.create(dto).subscribe({
      next: res => {
        console.log('Aplicación enviada con éxito', res);
        this.form.reset();
        // reiniciar URLs extra
        this.extraDocs.clear();
        this.addExtraDoc();
      },
      error: err => {
        console.error('Error enviando aplicación', err);
      }
    });
  }
}
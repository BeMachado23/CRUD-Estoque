import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component'; 

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Opcional: Pode apagar ou comentar este teste abaixo,
  // pois o seu app.component.html agora só renderiza o <app-estoque></app-estoque>
  /*
  it('should render title', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, estoque-angular');
  });
  */
});

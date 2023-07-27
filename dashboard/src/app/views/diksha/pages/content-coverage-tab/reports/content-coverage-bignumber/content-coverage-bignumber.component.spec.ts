import { ComponentFixture, TestBed } from '@angular/core/testing';

            import { ContentCoverageComponentBignumber } from './content-coverage-bignumber.component';
            
            describe('ContentCoverageComponentBignumber', () => {
              let component: ContentCoverageComponentBignumber;
              let fixture: ComponentFixture<ContentCoverageComponentBignumber>;
            
              beforeEach(async () => {
                await TestBed.configureTestingModule({
                  declarations: [ ContentCoverageComponentBignumber ]
                })
                .compileComponents();
            
                fixture = TestBed.createComponent(ContentCoverageComponentBignumber);
                component = fixture.componentInstance;
                fixture.detectChanges();
              });
            
              it('should create', () => {
                expect(component).toBeTruthy();
              });
            });
            
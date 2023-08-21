import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as json2csv from 'json2csv';
import { saveAs } from 'file-saver';

import { DownloadButtonComponent } from './download-button.component';

describe('DownloadButtonComponent', () => {
  let component: DownloadButtonComponent;
  let fixture: ComponentFixture<DownloadButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('downloads a CSV file for a single reportInput with valid data', () => {
  //   // Arrange
  //   const reportInputs = [{
  //     reportData: [{id: 1, name: 'John Doe', age: 30}, {id: 2, name: 'Jane Smith', age: 25}],
  //     reportType: 'table',
  //     reportName: 'Users'
  //   }];
  //   const saveAsSpy = spyOn(window, 'saveAs');
  
    
  //   component.download(reportInputs);
  
    
  //   expect(saveAsSpy).toHaveBeenCalled();
  // });
  

  it('displays an alert if reportInputs is undefined', () => {
    const reportInputs = undefined;
    const alertSpy = spyOn(window, 'alert');
  
    
    component. download(reportInputs);
  
    
    expect(alertSpy).toHaveBeenCalledWith('No data found to download');
  });
  
  it('formats the data correctly for a reportType of "dashletScatter"', () => {
    const reportInputs = [{
      reportData: [{x: 1, y: 2, data: {value: 'A'}}, {x: 3, y: 4, data: {value: 'B'}}],
      reportType: 'dashletScatter',
      reportName: 'Scatter'
    }];
    const json2csvSpy = spyOn(json2csv, 'parse');
    component.download(reportInputs);
    expect(json2csvSpy.calls.mostRecent().args[0][0]).toEqual({x: 1, y: 2});
    expect(json2csvSpy.calls.mostRecent().args[0][1]).toEqual({x: 3, y: 4});
  });
  
  it('formats the data correctly for a reportType of "table"', () => {
    const reportInputs = [{
      reportData: [{id: 1, name: {value: 'John Doe'}, age: {value: 30}}, {id: 2, name: {value: 'Jane Smith'}, age: {value: 25}}],
      reportType: 'table',
      reportName: 'Users'
    }];
    const json2csvSpy = spyOn(json2csv, 'parse');
    component.download(reportInputs);
    expect(json2csvSpy.calls.mostRecent().args[0][0]).toEqual({id: 1, name: 'John Doe', age: '30'});
    expect(json2csvSpy.calls.mostRecent().args[0][1]).toEqual({id: 2, name: 'Jane Smith', age: '25'});
  });

  it('formats the data correctly for a reportType of "table"', () => {
    const reportInputs = [{
      reportData: [{id: 1, name: {value: 'John Doe'}, age: {value: 30}}, {id: 2, name: {value: 'Jane Smith'}, age: {value: 25}}],
      reportType: 'table',
      reportName: 'Users'
    }];
    const json2csvSpy = spyOn(json2csv, 'parse');
    component.download(reportInputs);
    expect(json2csvSpy.calls.mostRecent().args[0][0]).toEqual({id: 1, name: 'John Doe', age: '30'});
    expect(json2csvSpy.calls.mostRecent().args[0][1]).toEqual({id: 2, name: 'Jane Smith', age: '25'});
  });
  

});

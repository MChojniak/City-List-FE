import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {City} from "./cities/city";
import {CityService} from "./cities/city.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CityPageDto} from "./cities/cityPageDto";

@Component({
  selector: 'clfe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public cities: City[] | undefined;
  public pageNumber = 0;
  public maxPageNumber: number = 0;
  inputPageNumber = 0;
  closeResult = '';
  hideEditCities: boolean = true;

  constructor(private cityService: CityService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getCities();
  }

  public getCities(): void {
    this.cityService.getCities(this.pageNumber).subscribe(
      (response: CityPageDto) => {
        this.cities = response.cityDtoList;
        this.maxPageNumber = response.totalPages;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      })
  }

  nextPage() {
    if (this.maxPageNumber > this.pageNumber) {
      this.pageNumber++;
    }
    this.inputPageNumber = this.pageNumber;
    this.getCities();
  }

  previousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
    }
    this.inputPageNumber = this.pageNumber;
    this.getCities();
  }

  goToSelectedPage(event: any) {
    if (this.maxPageNumber < event.target.value) {
      event.target.value = this.maxPageNumber;
    }
    this.pageNumber = event.target.value;

    if (this.pageNumber < 0) {
      this.pageNumber = 0;
    }
    this.inputPageNumber = this.pageNumber;
    this.getCities();
  }


  openWindow() {
  }

  showEdit() {
    this.hideEditCities = !this.hideEditCities;
  }

  saveEdit(name: string, id: number) {
    const inputName = document.getElementById(name) as HTMLInputElement | null;
    const inputSource = document.getElementById(`${name}_photo`) as HTMLInputElement | null
    let inName: string = inputName?.value == null ? '' : inputName.value;
    let inSource: string = inputSource?.value == null? '' : inputSource.value;

    const city: City = {
      id: id,
      name: inName,
      photoSource: inSource
    }

    this.cityService.changeCity(id, city).subscribe(
      (response: any) => {
        console.log(id);
        this.cities = [city];
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  getCityByName() {
    const inputName = document.getElementById('searchName') as HTMLInputElement
    let inName: string = inputName?.value == null ? '' : inputName.value;

    if(inName == ''){
      alert('City name can\'t be empty')
    }

    this.cityService.getCitiesByName(inName).subscribe((response: City[]) => {
      this.cities = response;
      console.log(this.cities);
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    })
  }
}

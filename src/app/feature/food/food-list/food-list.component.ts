import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { DatePipe } from '@angular/common';
import { Food } from 'src/app/core/models/food.model';
import { FoodDataService } from '../services/food-data.service';
import { Subject } from 'rxjs';

enum MealTime {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
}

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
})
export class FoodListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('foodsSelect') foodsSelect!: MatSelectionList;
  @Input() maxCalories = 1800;
  foodsForm!: FormGroup;
  allFoodsSelected = false;
  maxFoodsDisplayed = 3;
  unsubscribe$ = new Subject<void>();

  @ViewChild('foodForm') foodForm!: ElementRef;
  @ViewChild('loadButtons') loadButtons!: ElementRef;
  closeFormMacroInputs = false;
  isHidden = {};

  breakfastShowNone = false;
  lunchShowNone = false;
  dinnerShowNone = false;

  public get MealTime() {
    return MealTime;
  }

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private foodDataService: FoodDataService,
    private renderer: Renderer2
  ) {
    this.foodsForm = this.fb.group({
      foods: this.fb.group({
        breakfast: this.fb.array([]),
        lunch: this.fb.array([]),
        dinner: this.fb.array([])
      })
    });

    this.renderer.listen('window', 'click', (e: Event) => {
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      if (e.target === this.foodForm.nativeElement || this.foodForm.nativeElement.contains(e.target)
        || e.target === this.loadButtons.nativeElement || this.loadButtons.nativeElement.contains(e.target)){
        this.closeFormMacroInputs = false;
      } else {
        this.closeFormMacroInputs = true;

        for (const id in this.isHidden) {
          if (this.isHidden.hasOwnProperty(id)) {
            this.isHidden[id] = true;
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.foodDataService.todaysFood$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((foods: Food[]) => {

        for (const mealTime in this.foodsFormGroup.controls) {
          if (mealTime) {
            (this.foodsFormGroup.controls[mealTime] as FormArray).clear();
          }
        }

        foods.map((food: Food) => {
          //console.log('reloading', food)
          switch(food.mealTime) {
            case MealTime.BREAKFAST:
              this.addNewFood(MealTime.BREAKFAST, food);
              break;
            case MealTime.LUNCH:
              this.addNewFood(MealTime.LUNCH, food);
              break;
            case MealTime.DINNER:
              this.addNewFood(MealTime.DINNER, food);
              break;
            default: return;
          }
        });

        this.resetDefaults();
        this.breakfastShowNone = this.foodsFormArray(MealTime.BREAKFAST).length === 0 ? true : false;
        this.lunchShowNone = this.foodsFormArray(MealTime.LUNCH).length === 0 ? true : false;
        this.dinnerShowNone = this.foodsFormArray(MealTime.DINNER).length === 0 ? true: false;
      });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    console.log('on destroy called')
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  idToMealTime(cdkDropListId: string): MealTime {
    switch(cdkDropListId) {
      case 'cdk-drop-list-0': return MealTime.BREAKFAST;
      case 'cdk-drop-list-1': return MealTime.LUNCH;
      case 'cdk-drop-list-2': return MealTime.DINNER;
    }
    return MealTime.BREAKFAST;
  }

  saveOrder(): Food[] {
    const breakfast = this.foodsFormArray(MealTime.BREAKFAST);
    const lunch = this.foodsFormArray(MealTime.LUNCH);
    const dinner = this.foodsFormArray(MealTime.DINNER);
    const allControls = breakfast.controls.concat(lunch.controls, dinner.controls);
    return allControls.map(control => control.value );
  }

  // for drag and drop
  drop(event: CdkDragDrop<FormArray>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.controls, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data.controls,
        event.container.data.controls,
        event.previousIndex,
        event.currentIndex,
      );
      const food = event.container.data.controls[event.currentIndex].value;
      food.mealTime = this.idToMealTime(event.container.id);
      console.log(food);
      this.foodDataService.todaysFood = this.saveOrder();
    }
  }

  listEntered(event: CdkDragEnter, list: FormArray): void {
      switch (list) {
        case this.foodsFormArray(MealTime.BREAKFAST):
          this.breakfastShowNone = false;
          break;
        case this.foodsFormArray(MealTime.LUNCH):
          this.lunchShowNone = false;
          break;
        case this.foodsFormArray(MealTime.DINNER):
          this.dinnerShowNone = false;
          break;
        default: return;
      }
  }

  listExited(event: CdkDragExit, list: FormArray): void {
    const formArrayLength = list.length;
    const itemDraggedFromThisContainer = event.container['_unsortedItems'].has(event.item);
    switch (list) {
      case this.foodsFormArray(MealTime.BREAKFAST):
        this.breakfastShowNone = formArrayLength === 0 || (formArrayLength === 1 && itemDraggedFromThisContainer) ? true : false;
        break;
      case this.foodsFormArray(MealTime.LUNCH):
        this.lunchShowNone = formArrayLength === 0 || (formArrayLength === 1 && itemDraggedFromThisContainer) ? true : false;
        break;
      case this.foodsFormArray(MealTime.DINNER):
        this.dinnerShowNone = formArrayLength === 0 || (formArrayLength === 1 && itemDraggedFromThisContainer) ? true : false;
        break;
      default: return;
    }
  }

  // for select-all
  anySelected(): boolean {
    return this.foodsSelect?.selectedOptions.selected.length > 0 || false;
  }

  deleteSelected(): void {
    const selectedOptions = this.foodsSelect.selectedOptions;
    const selectedFoods = selectedOptions.selected.map(
      (option) => option.value.value
    );

    // const allFoods = this.foodsFormArray.controls.map(
    //   (option, index) => option.value
    // );
    // const remainingFoods = allFoods.filter(
    //   (option) => !selectedFoods.includes(option)
    // );

    const idsToDelete = selectedFoods.map((food) => food.id);

    // this.foodDataService.deleteFoods(idsToDelete, remainingFoods);
  }

  selectAllChange(): void {
    this.allFoodsSelected = !this.allFoodsSelected;

    if (!this.allFoodsSelected) {
      this.foodsSelect.deselectAll();
      this.maxFoodsDisplayed = 3;
      return;
    }

    this.maxFoodsDisplayed = this.listLength;
    setTimeout(() => {
      this.foodsSelect.selectAll();
    });
  }


  // form methods

  get foodsFormGroup(): FormGroup {
    return this.foodsForm.get('foods') as FormGroup;
  }

  foodsFormArray(mealTime: MealTime): FormArray {
    return this.foodsFormGroup.get(mealTime) as FormArray;
  }

  get listLength(): number {
    const breakfastLength = this.foodsFormArray(MealTime.BREAKFAST).controls.length;
    const lunchLength = this.foodsFormArray(MealTime.LUNCH).controls.length;
    const dinnerLength = this.foodsFormArray(MealTime.DINNER).controls.length;
    return breakfastLength + lunchLength + dinnerLength;
  }

  addNewFood(mealTime: MealTime, food: Food): void {
    //console.log('addNewFood: ', food);
    this.foodsFormArray(mealTime).push(this.addFoodFormGroup(food));
  }

  removeFood(mealTime: MealTime, index: number): void {
    this.foodsFormArray(mealTime).removeAt(index);
  }

  createNewFoodFormGroup(food: Food): FormGroup {
    const numberValidators = [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.maxLength(4),
    ];

    return this.fb.group({
      id: [food.id],
      date: [food.date],
      time: [
        this.datePipe.transform(food.date, 'HH:mm'),
        [Validators.required],
      ],
      name: [food.name, Validators.required],
      calories: [food.calories, numberValidators],
      protein: [food.protein, numberValidators],
      carbohydrate: [food.carbohydrate, numberValidators],
      fat: [food.fat, numberValidators],
      mealTime: [food.mealTime, Validators.required],
    });
  }

  addFoodFormGroupValueChanges(foodFormGroup: FormGroup): FormGroup {

    foodFormGroup.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((formValue) => {
          console.log('update food: ', formValue);
          return this.foodDataService.saveFood(formValue as Food);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((value) => {
        console.log(value);
      });

    return foodFormGroup;
  }

  addFoodFormGroup(food: Food): FormGroup {
    const newFoodGroup = this.createNewFoodFormGroup(food);
    this.isHidden[food.id] = true;
    return this.addFoodFormGroupValueChanges(newFoodGroup);
  }

  resetDefaults(): void {
    this.allFoodsSelected = false;
    this.maxFoodsDisplayed = 3;
  }

  optionClick(): void {
    let newStatus = true;
    this.foodsSelect.options.forEach((item: MatListOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allFoodsSelected = newStatus;
  }

  loadMore(): void {
    if (this.listLength > this.maxFoodsDisplayed) {
      this.maxFoodsDisplayed += 3;
    }
  }

  loadReset(): void {
    this.maxFoodsDisplayed = 3;
  }

  onFocusEvent(event: any): void {
    this.isHidden[event] = false;
  }

  onBlurEvent(event: any): void {
    // console.log(event.target);
    if (this.closeFormMacroInputs) {
      this.isHidden[event] = true;
    }
  }

  trackByfn(index: any, item: any) {
    return item.id;
  }
}

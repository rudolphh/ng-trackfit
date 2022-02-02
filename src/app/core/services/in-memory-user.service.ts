import { ApiResponse } from '../models/api-response';
import { Food } from '../models/food.model';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Measurement } from '../models/measurement';
import { UserSettings } from '../models/user-settings';

export class InMemoryDataService implements InMemoryDbService {
  createDb(): any {
    const userResponse: ApiResponse = {
      success: true,
      message: 'user retrieved',
      data: { id: 1, username: 'doe' },
    };

    const foods: Food[] = [
      {
        id: 1,
        name: 'soda',
        calories: 150,
        date: new Date(),
        protein: 0,
        carbohydrate: 38,
        fat: 0,
        mealTime: 'lunch'
      },
      {
        id: 2,
        name: 'protein shake',
        calories: 200,
        date: new Date(),
        protein: 40,
        carbohydrate: 2,
        fat: 1,
        mealTime: 'breakfast'
      },
    ];

    const measurements: Measurement[] = [
      {
        id: 1,
        weight: 239,
        unit: 'imperial',
        date: new Date(),
        neck: 16,
        waist: 37,
      },
    ];

    const bday = new Date('1982-09-28');

    const usersettings: UserSettings = {
      id: 1,
      gender: 'male',
      birthDate: bday,
      height: 75,
      unit: 'imperial',
      strategy: 'cut',
      rate: 20,
      reminderValue: 2,
      reminderFrequency: 'weekly',
    };

    return { user: userResponse, foods, measurements, usersettings };
  }
}

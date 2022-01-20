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
      },
    ];

    const measurements: Measurement[] = [
      { id: 1, weight: 239, unit: 'imperial', date: new Date() }
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
      reminderFrequency: 'weekly'
    };

    return { user: userResponse, foods, measurements, usersettings };
  }
}

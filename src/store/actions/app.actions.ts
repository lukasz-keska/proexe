import { createAction } from '@reduxjs/toolkit';
import { UserDataInterface } from '../models/app.model';

export const setLocalDataFromApi = createAction<UserDataInterface[]>('SET_LOCAL_DATA');

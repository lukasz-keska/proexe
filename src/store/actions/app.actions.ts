import { createAction } from '@reduxjs/toolkit';
import { UserDataInterface } from '../models/app.model';

export const setLocalDataFromApi = createAction<UserDataInterface[]>('SET_LOCAL_DATA');
export const deleteUserFromResults = createAction<number>('DELETE_LOCAL_DATA');
export const addUserData = createAction<UserDataInterface>('ADD_LOCAL_DATA');
export const editUserData = createAction<UserDataInterface>('EDIT_LOCAL_DATA');

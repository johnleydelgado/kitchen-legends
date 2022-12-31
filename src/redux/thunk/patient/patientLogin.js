import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosClient } from '../../../common/services/axiosClient';

// First, create the thunk
export const patientLogin = createAsyncThunk(
  'patient/login',
  async (params, { rejectWithValue }) => {
    try {
      const response = await AxiosClient.post('patient-login', params);
      const { success, message } = response.data;
      if (success) {
        return response.data;
      } else {
        return rejectWithValue(message);
      }
    } catch (error) {
      console.log('get user err: ', error);
      if (error) {
        return rejectWithValue(error);
      }
    }
  }
);

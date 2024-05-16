// userActions.ts
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { User, registerFailure, registerStart, registerSuccess } from '../slices/registerSlice';
;

export const register = (
  userData: { username: string; email: string; password: string },
): ThunkAction<void, RootState, null, any> => async (dispatch) => {
  dispatch(registerStart());

  try {
    // Simulate an API call to register the user
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const user: User = await response.json();
    dispatch(registerSuccess(user));
  } catch (error: any) {
    dispatch(registerFailure(error.message));
  }
};

import { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

export const actionsLogger = (reducer: ActionReducer<unknown>): ActionReducer<unknown> => {
  return (state, action) => {
    const nextState = reducer(state, action);
    if (action.type !== '@ngrx/store-devtools/recompute') {
      console.group(`Perform action "${action.type}"`);
      console.debug('Action', action);
      console.debug('Next state', nextState);
      console.groupEnd();
    }
    return nextState;
  };
};

export const metaReducers: Array<MetaReducer> = [];

if (!environment.production) {
  metaReducers.push(actionsLogger);
}
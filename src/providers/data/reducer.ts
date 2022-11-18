import { ActionTypes, DataProviderState } from 'types/dataProviderTypes';

const reducer = (state: DataProviderState, action: ActionTypes) => {
  switch (action.type) {
    case 'UPDATE_STATE':
      return {
        ...state,
        loading:
          action.payload.loading === undefined
            ? state.loading
            : action.payload.loading,
        error:
          action.payload.error === undefined
            ? state.error
            : action.payload.error,
        data:
          action.payload.data === undefined
            ? state.data
            : [...state.data, ...action.payload.data],
        savedItems:
          action.payload.savedItems === undefined
            ? state.savedItems
            : {
                ...state.savedItems,
                favouredItems:
                  action.payload.savedItems.favouredItems === undefined
                    ? state.savedItems.favouredItems
                    : action.payload.savedItems.favouredItems,
                unFavouredItems:
                  action.payload.savedItems.unFavouredItems === undefined
                    ? state.savedItems.unFavouredItems
                    : action.payload.savedItems.unFavouredItems,
              },
      };
    default:
      return state;
  }
};

export default reducer;

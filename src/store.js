import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducer'

// export default function configureStore(): Store<IStore> {
//     return createStore<IStore>(
//       rootReducer,
//       composeWithDevTools(applyMiddleware(promise(), thunkMiddleware))
//     );
//   }

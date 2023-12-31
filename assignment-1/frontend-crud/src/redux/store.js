import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import errorReducer from './ErrorSlice'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
  key: 'root',
  storage: storageSession
}

const rootReducer = combineReducers({
  error: errorReducer,
  user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)

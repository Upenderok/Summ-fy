import { configureStore } from '@reduxjs/toolkit';
//import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { articleApi } from './article';
export const store = configureStore({
   reducer: {[articleApi.reducerPath]: articleApi.reducer},
   middleware: (buildGetDefaultMiddleware) => buildGetDefaultMiddleware().concat(articleApi.middleware)
});
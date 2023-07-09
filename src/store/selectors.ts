import { RootState } from "./store";

export const mode = (state: RootState) => state.mode;
export const users = (state: RootState) => state.users;
export const comments = (state: RootState) => state.comments;
export const actionState = (state: RootState) => state.actionState;

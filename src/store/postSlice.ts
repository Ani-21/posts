import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPost } from "../models/IPost";
import { IUser } from "../models/IUser";
import { IComment } from "../models/IComment";
import { IActionState } from "../models/IActionState";

interface InitialStateProps {
  mode: string;
  posts: IPost[];
  users: IUser[];
  comments: IComment[];
  actionState: IActionState;
}

const initialState: InitialStateProps = {
  mode: "light",
  posts: [],
  users: [],
  comments: [],
  actionState: IActionState.none,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    setComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
    },
    setActionState: (state, action) => {
      state.actionState = action.payload;
    },
    addComment: (state, action: PayloadAction<IComment>) => {
      const updatedComments = [...state.comments, action.payload];
      state.comments = updatedComments;
    },
  },
});

export const {
  setMode,
  setPosts,
  setUsers,
  setComments,
  addComment,
  setActionState,
} = postsSlice.actions;

export const postsReducer = postsSlice.reducer;

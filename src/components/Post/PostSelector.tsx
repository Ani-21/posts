import { useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useFetch } from "usehooks-ts";

import { baseUrl } from "@/const";
import { IUser } from "@/models/IUser";
import { FlexBetween } from "../FlexBetween";

import { useAppDispatch } from "@/store/hooks";
import { setUsers } from "@/store/postSlice";

type Props = {
  userId: number;
  handleShowAllPosts: () => void;
  handleChange: (e: SelectChangeEvent<unknown>) => void;
};

export const PostSelector = ({
  userId,
  handleChange,
  handleShowAllPosts,
}: Props) => {
  const usersUrl = `${baseUrl}/users`;
  const { data: users } = useFetch<IUser[]>(usersUrl);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUsers(users));
  }, [users]);

  return (
    <FlexBetween
      padding="2rem 6%"
      alignItems="center"
      justifyContent="space-around"
    >
      <Button onClick={handleShowAllPosts}>Show All Posts</Button>
      <FormControl>
        <InputLabel id="demo-simple-select-label">User</InputLabel>
        <Select value={userId} label="User" onChange={handleChange}>
          {users?.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FlexBetween>
  );
};

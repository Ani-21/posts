import { PersonPin, HomeWork, PhoneAndroid, Work } from "@mui/icons-material";
import { Box, Divider, Typography, Skeleton } from "@mui/material";

import { useAppSelector } from "@/store/hooks";
import { users } from "@/store/selectors";

import { WidgetWrapper } from "../WidgetWrapper";

type Props = {
  userId: number;
  fullInfo?: boolean;
};

export const User = ({ userId, fullInfo = false }: Props) => {
  const usersList = useAppSelector(users);

  const user = usersList?.find((user) => user.id === userId);

  if (!user) return <Skeleton width="100px" height="40px" />;

  return (
    <WidgetWrapper>
      <Box display="flex" alignItems="center" gap="1rem">
        <PersonPin />
        <Box>
          <Typography>{user.name}</Typography>
          <Typography>{user.email}</Typography>
        </Box>
      </Box>
      {fullInfo && (
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" m="0.5rem 0">
            <HomeWork />
            <Typography>{user.address.city}</Typography>
          </Box>
          <Divider />
          <Box display="flex" alignItems="center" gap="1rem" m="0.5rem 0">
            <PhoneAndroid />
            <Typography>{user.phone}</Typography>
          </Box>
          <Divider />
          <Box display="flex" alignItems="center" gap="1rem" m="0.5rem 0">
            <Work />
            <Typography>{user.company.name}</Typography>
          </Box>
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

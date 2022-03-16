import { Box, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";
import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { noimg } from "../../consts";
import { firebaseAuth } from "../../Logic/firebase";
import { Collection, database, User } from "../../Logic/firestore";
import { Loading } from "../Loading";
import { AddCollection } from "./AddCollection";
import { UserHeader } from "./UserHeader";

export function UserPage() {
  const { userId } = useParams();
  const [auth, loadingAuth] = useAuthState(firebaseAuth);
  const [user, loadingUser] = useDocumentData<User>(userId ? database.user(userId) : undefined);
  if (loadingAuth || loadingUser) {
    return <Loading />;
  } else {
    if (userId && user) {
      if (auth) return <UserPageContent isMypage={userId === auth.uid} user={user} />;
      else return <UserPageContent user={user} />;
    } else {
      if (auth) return <Navigate to={`/user/${auth.uid}`} />;
      else return <Navigate to={`/`} />;
    }
  }
}

function UserPageContent(props: { user: User; isMypage?: boolean }) {
  const user = props.user;
  const userId = props.user.uid;
  const userName = props.user.name;
  const collectionRef = database.collections(userId);
  const [collections] = useCollectionData<Collection>(collectionRef);
  return !collections ? (
    <Loading />
  ) : (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <UserHeader user={user} />
        <Grid container spacing={1} p={1}>
          {collections.map((collection, i) => (
            <CollectionCard key={i} userId={userId} collection={collection} />
          ))}
        </Grid>
      </Box>
      {props.isMypage && (
        <Stack spacing={2} sx={{ position: "fixed", bottom: 0, right: 0, padding: 3 }} direction="column-reverse">
          <AddCollection userId={userId} />
        </Stack>
      )}
    </>
  );
}

function CollectionCard(props: { userId: string; collection: Collection }) {
  const navigate = useNavigate();
  const onClick = () => navigate(`/user/${props.userId}/collection/${props.collection.cid}`);
  const title = props.collection.name;
  const img = props.collection.img ?? noimg;
  return (
    <Grid
      item
      xs={6}
      sm={4}
      md={3}
      lg={2}
      xl={2}
      sx={{
        position: "relative",
        width: "100%",
        "&::after": {
          content: '""',
          display: "block",
          paddingBottom: "100%",
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          paddingRight: 1,
          paddingBottom: 1,
        }}
      >
        <Card
          sx={{
            padding: 0,
            height: "100%",
            borderRadius: 4,
            position: "relative",
          }}
        >
          <CardMedia height="100%" component="img" image={img} sx={{ objectFit: "cover", width: "100%" }} />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
              padding: 1,
            }}
          >
            <Typography align="center" m={0} sx={{ color: "#FFFFFF" }}>
              {title}
            </Typography>
          </Box>
        </Card>
      </Box>
    </Grid>
  );
}

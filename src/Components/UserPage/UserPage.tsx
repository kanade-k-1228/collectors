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
      return <UserPageContent isMypage={userId === user.uid} user={user} />;
    } else {
      if (auth) return <Navigate to={`/user/${auth.uid}`} />;
      else return <Navigate to={`/`} />;
    }
  }
}

function UserPageContent(props: { user: User; isMypage: boolean }) {
  const user = props.user;
  const userId = props.user.uid;
  const userName = props.user.name;
  const collectionRef = database.collections(userId);
  const [collections] = useCollectionData<Collection>(collectionRef);
  return !collections ? (
    <Loading />
  ) : (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        height: "100vh",
      }}
    >
      <UserHeader user={user} />

      <Grid container spacing={1} p={1}>
        {collections.map((collection, i) => (
          <CollectionCard key={i} userId={userId} collection={collection} />
        ))}
      </Grid>
      {props.isMypage && (
        <Stack spacing={2} sx={{ position: "fixed", bottom: 0, right: 0, padding: 3 }} direction="column-reverse">
          <AddCollection userId={userId} />
        </Stack>
      )}
    </Box>
  );
}

function CollectionCard(props: { userId: string; collection: Collection }) {
  const navigate = useNavigate();
  const jumpTo = `/user/${props.userId}/collection/${props.collection.cid}`;
  return (
    <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
      <Card sx={{ padding: 0 }} onClick={() => navigate(jumpTo)}>
        <CardMedia component="img" image={props.collection.img ?? noimg} />
        <Typography gutterBottom variant="h5" align="center" m={0} sx={{ fontWeight: "bold" }}>
          {props.collection.name}
        </Typography>
      </Card>
    </Grid>
  );
}

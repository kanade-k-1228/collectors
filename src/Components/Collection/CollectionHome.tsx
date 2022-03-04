import { Box } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Navigate, useParams } from "react-router-dom";
import { firebaseAuth } from "../../Logic/firebase";
import { Collection, database, User } from "../../Logic/firestore";
import { Loading } from "../Loading";
import { CollectionFooter } from "./CollectionFooter";
import { CollectionHeader } from "./CollectionHeader";
import { CollectionList } from "./CollectionList";
import { CollectionMap } from "./CollectionMap";
import { CollectionPhoto } from "./CollectionPhoto";

export function CollectionHome() {
  const { userId, collectionId } = useParams();
  const [auth, loadingAuth] = useAuthState(firebaseAuth);
  const [user, loadingUser] = useDocumentData<User>(userId ? database.user(userId) : undefined);
  const [collection, loadingCollection] = useDocumentData<Collection>(
    userId && collectionId ? database.collection(userId, collectionId) : undefined,
  );
  if (loadingAuth || loadingUser || loadingCollection) {
    return <Loading />;
  } else if (collection && user) {
    return <CollectionHomeContent collection={collection} user={user} />;
  } else return <Navigate to={`/`} />;
}

function CollectionHomeContent(props: { collection: Collection; user: User }) {
  const { collection, user } = props;
  const [viewType, setViewType] = useState<"list" | "photo" | "map">("photo");
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
      }}
    >
      <CollectionHeader title={collection.name} jumpTo={`/user/${user.uid}`} />
      {collection ? (
        <>
          {viewType === "list" && <CollectionList collection={collection} />}
          {viewType === "photo" && <CollectionPhoto collection={collection} />}
          {viewType === "map" && <CollectionMap collection={collection} />}
        </>
      ) : (
        <Loading />
      )}
      <CollectionFooter viewTipe={viewType} onChange={setViewType} />
    </Box>
  );
}

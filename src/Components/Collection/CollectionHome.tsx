import { Box } from "@mui/material";
import { setDoc } from "firebase/firestore";
import * as React from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Navigate, useParams } from "react-router-dom";
import { firebaseAuth } from "../../Logic/firebase";
import { Collection, database, Item, User } from "../../Logic/firestore";
import { Loading } from "../Loading";
import { CollectionFooter } from "./CollectionFooter";
import { CollectionHeader } from "./CollectionHeader";
import { CollectionList } from "./CollectionList";
import { CollectionMap } from "./CollectionMap";
import { CollectionPhoto } from "./CollectionPhoto";

export function CollectionHome() {
  const { userId, collectionId } = useParams();
  const userRef = userId ? database.user(userId) : undefined;
  const collectionRef = userId && collectionId ? database.collection(userId, collectionId) : undefined;
  const [auth, loadingAuth] = useAuthState(firebaseAuth);
  const [user, loadingUser] = useDocumentData<User>(userRef);
  const [collection, loadingCollection] = useDocumentData<Collection>(collectionRef);
  const editCollection = collectionRef ? (newCollectionData: Collection) => setDoc(collectionRef, newCollectionData) : undefined;
  const editItem =
    collectionRef && collection
      ? (itemNo: number) => (newItem: Item) =>
          setDoc(collectionRef, {
            ...collection,
            items: collection.items.map((item, i) => (itemNo === i ? newItem : item)),
          })
      : undefined;
  if (loadingAuth || loadingUser || loadingCollection) {
    return <Loading />;
  } else if (collection && user) {
    return <CollectionHomeContent collection={collection} user={user} editCollection={editCollection} editItem={editItem} />;
  } else return <Navigate to={`/`} />;
}

function CollectionHomeContent(props: {
  collection: Collection;
  user: User;
  editCollection?: (newCollectionData: Collection) => Promise<void>;
  editItem?: (itemNo: number) => (newItem: Item) => Promise<void>;
}) {
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
          {viewType === "list" && <CollectionList collection={collection} editCollection={props.editCollection} editItem={props.editItem} />}
          {viewType === "photo" && <CollectionPhoto collection={collection} editCollection={props.editCollection} editItem={props.editItem} />}
          {viewType === "map" && <CollectionMap collection={collection} editCollection={props.editCollection} editItem={props.editItem} />}
        </>
      ) : (
        <Loading />
      )}
      <CollectionFooter viewTipe={viewType} onChange={setViewType} />
    </Box>
  );
}

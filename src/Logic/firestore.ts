import {
  collection,
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import { firestore } from "./firebase";

export class User {
  constructor(readonly uid: string, readonly email: string, readonly name: string, readonly avater?: string) {}
}

const userConverter = {
  toFirestore(user: WithFieldValue<User>): DocumentData {
    return { email: user.email, name: user.name, avater: user.avater };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User {
    const data = snapshot.data(options)!;
    return { uid: snapshot.id, email: data.email, name: data.name, avater: data.avater };
  },
};

export class Collection {
  constructor(
    readonly cid: string,
    readonly name: string,
    readonly ownerUid: string,
    readonly isPrivate: boolean,
    readonly items: Item[],
    readonly mapCenter: GeoPoint,
    readonly mapZoom: number,
    readonly img?: string,
  ) {}
}

const collectionConverter = {
  toFirestore(collection: WithFieldValue<Collection>): DocumentData {
    return {
      name: collection.name,
      ownerUid: collection.ownerUid,
      isPrivate: collection.isPrivate,
      items: collection.items,
      mapCenter: collection.mapCenter,
      mapZoom: collection.mapZoom,
      img: collection.img,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Collection {
    const data = snapshot.data(options)!;
    return {
      cid: snapshot.id,
      name: data.name,
      ownerUid: data.ownerUid,
      isPrivate: data.isPrivate,
      items: data.items,
      mapCenter: data.mapCenter,
      mapZoom: data.mapZoom,
      img: data.img,
    };
  },
};

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface MapMarker {
  type: "point" | "line" | "polygon";
  center?: GeoPoint;
  points?: GeoPoint[];
  color?: string;
}

export interface Item {
  title?: string;
  subtitle?: string;
  img?: string[];
  date?: string;
  note?: string;
  mapMarker?: MapMarker;
}

export interface CollectionTemplate {
  name: string;
  items: Item[];
  mapCenter: GeoPoint;
  mapZoom: number;
  img?: string;
}

export const database = {
  users: collection(firestore, `users`).withConverter(userConverter),
  user: (uid: string) => doc(firestore, `users`, uid).withConverter(userConverter),
  collections: (uid: string) => collection(firestore, `users/${uid}/collections`).withConverter(collectionConverter),
  collection: (uid: string, cid: string) =>
    doc(firestore, `users/${uid}/collections`, cid).withConverter(collectionConverter),
};

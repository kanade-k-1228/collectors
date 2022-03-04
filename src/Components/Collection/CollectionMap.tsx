import { LatLngExpression } from "leaflet";
import * as React from "react";
import { MapContainer, Marker, Polygon, Polyline, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { Collection, GeoPoint, Item } from "../../Logic/firestore";

export function CollectionMap(props: { collection: Collection }) {
  return (
    <MapContainer
      style={{ width: "100%", height: "100%" }}
      center={props.collection.mapCenter}
      zoom={props.collection.mapZoom}
    >
      <TileLayer
        attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.collection.items.map((item, i) => (
        <ItemMarker key={i} item={item} mapCenter={props.collection.mapCenter} />
      ))}
    </MapContainer>
  );
}

function ItemMarker(props: { item: Item; mapCenter: GeoPoint }) {
  const map = useMapEvents({});
  const marker = props.item.mapMarker?.type;
  const position = props.item.mapMarker?.center ?? props.mapCenter;
  const points = (props.item.mapMarker?.points?.map((point) => [point.lat, point.lng]) ?? [[]]) as LatLngExpression[];
  return (
    <>
      {marker === "point" && (
        <Marker position={position}>
          <Popup onOpen={() => map.flyTo(position)}>{props.item.title}</Popup>
        </Marker>
      )}
      {marker === "line" && (
        <Polyline positions={points}>
          <Popup>{props.item.title}</Popup>
        </Polyline>
      )}
      {marker === "polygon" && (
        <Polygon positions={points}>
          <Popup>{props.item.title}</Popup>
        </Polygon>
      )}
    </>
  );
}

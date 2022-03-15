import { LatLngExpression } from "leaflet";
import * as React from "react";
import { Circle, MapContainer, Polygon, Polyline, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { Collection, GeoPoint, Item } from "../../Logic/firestore";

export function CollectionMap(props: {
  collection: Collection;
  editCollection?: (newCollectionData: Collection) => Promise<void>;
}) {
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
  const marker = props.item.mapMarker?.type;
  return (
    <>
      {marker === "point" && <PointMarker item={props.item} defaultPoint={props.mapCenter} />}
      {marker === "line" && <LineMarker item={props.item} />}
      {marker === "polygon" && <PolygonMarker item={props.item} />}
    </>
  );
}

function PointMarker(props: { item: Item; defaultPoint: GeoPoint }) {
  const point = props.item.mapMarker?.center ?? props.defaultPoint;
  const markerSize = 400;
  const markerColor = "green";
  const map = useMapEvents({});
  return (
    <Circle center={point} radius={markerSize} color={markerColor}>
      <Popup onOpen={() => map.flyTo(point)}>{props.item.title}</Popup>
    </Circle>
  );
}

function LineMarker(props: { item: Item }) {
  const points = (props.item.mapMarker?.points?.map((point) => [point.lat, point.lng]) ?? [[]]) as LatLngExpression[];
  return (
    <Polyline positions={points}>
      <Popup>{props.item.title}</Popup>
    </Polyline>
  );
}

function PolygonMarker(props: { item: Item }) {
  const points = (props.item.mapMarker?.points?.map((point) => [point.lat, point.lng]) ?? [[]]) as LatLngExpression[];
  return (
    <Polygon positions={points}>
      <Popup>{props.item.title}</Popup>
    </Polygon>
  );
}

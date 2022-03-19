import { Container, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { Collection, Item } from "../../Logic/firestore";
import { AddItem } from "./AddItem";
import { ItemDialog } from "./ItemDialog";

export function CollectionList(props: { collection: Collection; editCollection?: (newCollectionData: Collection) => Promise<void>; editItem?: (itemNo: number) => (newItem: Item) => Promise<void> }) {
  const items = props.collection.items;
  return (
    <>
      <Container component="main" maxWidth="xl">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, i) => (
              <ItemRow key={i} item={item} editItem={props.editItem ? props.editItem(i) : undefined} />
            ))}
          </TableBody>
        </Table>
      </Container>
      <Stack spacing={2} sx={{ position: "fixed", bottom: 56, right: 0, padding: 3 }} direction="column-reverse">
        <AddItem />
      </Stack>
    </>
  );
}

function ItemRow(props: { item: Item; editItem?: (newItem: Item) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow onClick={() => setOpen(true)}>
        <TableCell>{props.item.title}</TableCell>
        <TableCell>{props.item.subtitle}</TableCell>
        <TableCell>{props.item.date}</TableCell>
      </TableRow>
      <ItemDialog isOpen={open} onClose={() => setOpen(false)} item={props.item} editItem={props.editItem} />
    </>
  );
}

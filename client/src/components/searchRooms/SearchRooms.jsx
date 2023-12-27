import { useState, useEffect } from "react";
import RoomItem from "./RoomItem";
import { APIRoomsController } from "../../API/room";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

const SearchRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    APIRoomsController.getRooms(setRooms);
  }, []);

  // setTimeout(() => {
  //   APIRoomsController.getRooms(setRooms);
  // }, 15000);

  return (
    <Container>
      <Table striped bordered hover className="table-info">
        <thead>
          <tr>
            <th>nickname</th>
            <th>time</th>
            <th>rating</th>
            <th>color</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => {
            return <RoomItem room={room} key={index}></RoomItem>;
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default SearchRooms;

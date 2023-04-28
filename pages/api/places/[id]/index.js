// import { places } from '../../../../lib/db.js';

import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;
  // console.log("api-id-id", id);
  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(place);
  }

  if (request.method === "POST") {
    try {
      const newPlace = request.body;
      console.log("PUT:", newPlace);
      await Place.create(newPlace);
      response.status(201).json({ status: "Place created!" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  // const place = places.find((place) => place.id === id);

  // if (!place) {
  //   return response.status(404).json({ status: 'Not found' });
  // }

  // response.status(200).json(place);
}

// import { places } from '../../../../lib/db.js';

import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  console.log("api-id");
  const { id } = request.query;

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

  if (request.method === "PATCH") {
    try {
      const updatedPlace = request.body;
      await Place.findByIdAndUpdate(id, updatedPlace);
      response.status(200).json({ status: "Place updated!" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      console.log(id);
      await Place.findByIdAndDelete(id);
      response.status(200).json({ message: `Product successfully deleted!` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}

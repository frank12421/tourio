// import { places } from '../../../lib/db';

import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  console.log("API-Index");
  if (request.method === "GET") {
    const places = await Place.find();
    console.log(places);
    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    console.log("POST");
    try {
      const newPlace = request.body;
      console.log("POST:", newPlace);
      await Place.create(newPlace);
      response.status(201).json({ status: "Place created!" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}

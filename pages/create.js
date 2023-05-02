import Link from "next/link.js";
import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form.js";
import { StyledLink } from "../components/StyledLink.js";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  // const router = useRouter();
  // const { id } = router.query;
  // // console.log("pages-id:", { id });
  // const { data, isLoading } = useSWRConfig(`/api/products/${id}`);
  const { trigger } = useSWRMutation("/api/places", sendRequest);

  async function sendRequest(url, { arg }) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });
    const { status } = await response.json();
  }

  async function addPlace(place) {
    // console.log("places", place);
    const response = await trigger(place);
    if (response) router.push("/");
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <Link href="/" passHref legacyBehavior>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}

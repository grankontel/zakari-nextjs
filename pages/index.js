import Layout from "../components/Layout";
import Image from "next/image";
import {
  Button,
  Notification,
  Form as BForm,
  Message,
} from "react-bulma-components";
import { useState } from "react";
import useUser from "../lib/useUser";

const _token =
  "tmalo.SGSKDTYxizchyMAnk-Qhm.23TnGO35+WXuiSvUleo9ROfyP8Na8XbEbJya+KerrxM=";

const postZakari = async (endPoint, token, reqMessage) => {
  var qHeaders = new Headers();
  qHeaders.append("User-Agent", "zakari-web");
  qHeaders.append("Content-Type", "application/json");
  qHeaders.append("Authorization", "Bearer " + token);

  var qInit = {
    method: "POST",
    headers: qHeaders,
    mode: "cors",
    cache: "no-cache",
    body: JSON.stringify({
      kreyol: "GP",
      request: reqMessage,
    }),
  };

  var request = new Request(endPoint, qInit);
  return await fetch(request, qInit).then(async (r) => {
    return await r.json();
  });
};

const ZakariForm = ({ ...props }) => {
  const  [isLoading, setIsLoading]  = useState(false);
  const { user, mutateUser } = useUser();

  const [request, setRequest] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [response, setResponse] = useState("");
  const eraseErrorMessage = () => setErrorMessage("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setErrorMessage('')
    setResponse('')
    setIsLoading(true)

    const resp = postZakari(process.env.NEXT_PUBLIC_ZAKARI_ENDPOINT, user.token, request);
    resp.then(data => {
      setIsLoading(false)

      if (data.errors !== undefined) {
        setErrorMessage('Erreur de zakari')
      } else {
        setResponse(data.response.message)
      }
    })
    
  };

  return (
    <div {...props}>
      <form>
        <BForm.Field>
          <BForm.Label>Tèks pou korijé</BForm.Label>
          <BForm.Control>
            <BForm.Textarea
              name="source"
              onChange={(e) => setRequest(e.target.value)}
              value={request}
              required
            />
          </BForm.Control>
        </BForm.Field>
        <Message color="primary">
          <Message.Header>Répons</Message.Header>
          <Message.Body>{response}</Message.Body>
        </Message>
        {errorMessage.length > 0 && (
          <Notification className="error" mt={2} light color="danger">
            <Button remove onClick={eraseErrorMessage} />
            {errorMessage}
          </Notification>
        )}
        <hr />
        <Button.Group align="right">
          <Button
            color="primary"
            onClick={handleSubmit}
            disabled={!user?.isLoggedIn || (!isLoading && request.length < 2)}
            loading={isLoading}
          >
            Korijé
          </Button>
        </Button.Group>
      </form>
    </div>
  );
};
const Home = () => (
  <Layout>
    <div className="zakari">
      <ZakariForm />
    </div>

    <style jsx>{`
      .zakari {
        max-width: 24rem;
        margin: 0 auto;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    `}</style>
  </Layout>
);

export default Home;

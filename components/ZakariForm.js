import Image from "next/image";
import {
  Button,
  Notification,
  Form as BForm,
  Message,
} from "react-bulma-components";
import { useState } from "react";
import useUser from "../lib/useUser";
import postZakari from "../lib/postZakari";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ZakariForm = ({ ...props }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const { user, mutateUser } = useUser();
  
    const [request, setRequest] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [response, setResponse] = useState("");
    const eraseErrorMessage = () => setErrorMessage("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      setErrorMessage("");
      setResponse("");
      setIsLoading(true);
      setCopied(false);
  
      const resp = postZakari(
        process.env.NEXT_PUBLIC_ZAKARI_ENDPOINT,
        user.token,
        request
      );
      resp.then((data) => {
        setIsLoading(false);
  
        if (data.errors !== undefined) {
          setErrorMessage("Erreur de zakari");
        } else {
          setResponse(data.response.message);
        }
      });
    };
  
    return (
      <div {...props}>
        <BForm.Field>
          <BForm.Label>Tèks pou korijé</BForm.Label>
          <BForm.Control>
            <BForm.Textarea
              name="source"
              onChange={(e) => {
                setRequest(e.target.value);
                setCopied(false);
              }}
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
          <CopyToClipboard text={response} onCopy={() => setCopied(true)}>
            <Button
              color={copied ? "info" : "light"}
              disabled={!user?.isLoggedIn || response === ""}
            >
              {copied ? "I adan !" : "Kopyé"}
            </Button>
          </CopyToClipboard>
          <Button
            color="primary"
            onClick={handleSubmit}
            disabled={!user?.isLoggedIn || (!isLoading && request.length < 2)}
            loading={isLoading}
          >
            Korijé
          </Button>
        </Button.Group>
      </div>
    );
  };

  export default ZakariForm;
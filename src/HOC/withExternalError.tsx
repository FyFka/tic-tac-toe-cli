import { useState, FC, SetStateAction, Dispatch } from "react";
import { Box, Text } from "ink";

export interface IWithExternalErrorProps {
  externalError: string;
  setExternalError: Dispatch<SetStateAction<string>>;
}

const withExternalError = (Component: FC<IWithExternalErrorProps>) => {
  return () => {
    const [externalError, setExternalError] = useState("");

    return (
      <Box display="flex" flexDirection="column" width="100%">
        <Component setExternalError={setExternalError} externalError={externalError} />
        {!!externalError && (
          <Box width="100%">
            <Text color="redBright">{externalError}</Text>
          </Box>
        )}
      </Box>
    );
  };
};

export default withExternalError;

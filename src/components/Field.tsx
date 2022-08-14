import { Box, Text } from "ink";
import { useState } from "react";
import TextInput from "ink-text-input";

interface IFieldProps {
  label: string;
  onSubmit: (query: string) => void;
}

const Field = ({ label, onSubmit }: IFieldProps) => {
  const [query, setQuery] = useState("");

  return (
    <Box borderStyle="round" width="100%">
      <Box marginRight={1}>
        <Text>{label}</Text>
      </Box>
      <TextInput value={query} onChange={setQuery} onSubmit={onSubmit} />
    </Box>
  );
};

export default Field;

import { Box } from "ink";
import { useState } from "react";
import Field from "../components/Field";

enum Stage {
  NAME,
  PASSWORD,
  SIZE,
  DONE,
}

const CreateRoom = () => {
  const [stage, setStage] = useState(Stage.NAME);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [size, setSize] = useState("");

  const handleSubmit = (query: string) => {
    if (stage === Stage.NAME) {
      setName(query);
      setStage(Stage.PASSWORD);
    } else if (stage === Stage.PASSWORD) {
      setPassword(query);
      setStage(Stage.SIZE);
    } else if (stage === Stage.SIZE) {
      setSize(query);
      setStage(Stage.DONE);
    }
    console.log(name, password, size);
  };

  return (
    <Box>
      {stage === Stage.NAME && <Field label="Room name" onSubmit={handleSubmit} />}
      {stage === Stage.PASSWORD && <Field label="Password(optional)" onSubmit={handleSubmit} />}
      {stage === Stage.SIZE && <Field label="Board size" onSubmit={handleSubmit} />}
    </Box>
  );
};

export default CreateRoom;

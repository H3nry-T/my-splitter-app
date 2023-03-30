import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./app/store";
import {
  setInputText,
  splitText,
  setSplitOption,
} from "./app/textSplitterSlice";

function App() {
  const dispatch = useDispatch();
  const { inputText, splitTexts, splitOption } = useSelector(
    (state: RootState) => state.textSplitter
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputText(event.target.value));
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSplitOption(parseInt(event.target.value, 10)));
  };

  const handleButtonClick = () => {
    dispatch(splitText());
  };

  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Container maxWidth="md">
      <header>
        <h1 style={{ textAlign: "center" }}>Text splitter application</h1>
      </header>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <TextField
            label="Paste your text here"
            multiline
            fullWidth
            rows={10}
            variant="outlined"
            value={inputText}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Number of parts or size of each part"
            type="number"
            fullWidth
            variant="outlined"
            value={splitOption}
            onChange={handleOptionChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
          >
            Split Text
          </Button>
        </Grid>
        {splitTexts.map((text: string, index: number) => (
          <Grid key={index} item xs={12}>
            <Card>
              <CardContent>
                {text}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleCopyClick(text)}
                  sx={{ ml: 2 }}
                >
                  Copy
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;

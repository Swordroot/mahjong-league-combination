import { TextField, Container, Button, Stack } from "@mui/material";
import { useState } from "react";

import CombinationTable from "./CombinationTable";

function App() {
  const [combinations, setCombinations] = useState([] as string[][]);
  const [inputText, setInputText] = useState("");
  const [csvText, setCsvText] = useState("");
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputText(event.target.value);
  };
  const buttonHandler = async () => {
    const result = await calculateCombinations(inputText);
    setCombinations(result);
    setCsvText(result.map(comb => comb.join(',')).join('\n'));
  }
  const copyCsvToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(csvText);
      alert("コピー完了！エクセルやスプレッドシートに貼り付けてください。")
    } catch (error) {
      alert("コピーに失敗しました。テキストボックスから手動でコピーしてください。")
    }
  }
  return (
    <Container maxWidth="sm">
      <h4>麻雀チーム戦組み合わせ一覧生成</h4>
      <Stack spacing={2}>
        <Container>
          <TextField label="チーム数" variant="outlined" value={inputText} onChange={handleChange}/>
          <Button variant="contained" onClick={buttonHandler}>生成</Button>
          <Button variant="contained" onClick={copyCsvToClipBoard} disabled={(combinations.length <= 0)}>クリップボードにCSVでコピー</Button>
        </Container>
        <Container>
          <TextField label="組み合わせCSV" variant="outlined" value={csvText} rows={4} multiline/>
          {
            (combinations.length > 0) && (<CombinationTable combinations={combinations}/>)
          }
        </Container>
      </Stack>
      
      
    </Container>
  );
}

async function calculateCombinations(teamsNumString: string): Promise<string[][]> {
  const teamsCount = parseInt(teamsNumString, 10);
  console.log(teamsCount);
  if (isNaN(teamsCount)) {
    alert("数値を入力してください！");
    return [];
  }
  if (teamsCount > 26) {
    alert("27チーム以上は未対応です！ごめんね！");
    return [];
  }
  if (teamsCount < 4) {
    alert("最低4チームないと試合を組めません！");
    return [];
  }

  const combinations: string[][] = [];

  function recursiveCombination(combinationIndexes: number[], n: number, k: number) {
    if (k === 0) {
      combinations.push(JSON.parse(JSON.stringify(combinationIndexes.map(index => alphabet[index]))));
      return;
    }
    if (n < 0) return;
    recursiveCombination(combinationIndexes, n-1, k);
    combinationIndexes[k - 1] = n;
    recursiveCombination(combinationIndexes, n-1, k-1);
  }

  recursiveCombination([-1,-1,-1,-1], teamsCount-1, 4);

  return combinations;
}



const alphabet: string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];



export default App;

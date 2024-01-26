import { AssemblyAI } from 'assemblyai'

const client = new AssemblyAI({
  apiKey: ''
})

const audioUrl =
  'audio.wav'

const params = {
  audio: audioUrl,
  speaker_labels: true
}

const run = async () => {
  const transcript = await client.transcripts.transcribe(params)

  let actual = [];
  let line = '';
  let prev = null;
  for (let i = 0; i <= transcript.words.length; i++) {
    if (i === 0)
    {
      line = `${transcript.words[0].text}`;
      prev = transcript.words[0];
    }
    else if (i === transcript.words.length)
    {
      actual.push(line);
    }
    else
    {
      if (transcript.words[i].start - prev.end < 1000)
      {
        line = `${line} ${transcript.words[i].text}`;
      }
      else
      {
        actual.push(line);
        line = transcript.words[i].text;
      }
      prev = transcript.words[i];
    }
  }

  console.log(actual);

  // for (let utterance of !transcript.utterances) {
  //   console.log(`Speaker ${utterance.speaker}: ${utterance.text}`)
  // }
}

run()